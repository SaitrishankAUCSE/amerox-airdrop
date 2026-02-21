import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, category, suggestion } = req.body;

        if (!name || !email || !category || !suggestion) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            // 1. Save directly to "suggestions" collection in Firestore
            await addDoc(collection(db, "suggestions"), {
                name,
                email,
                category,
                suggestion,
                createdAt: serverTimestamp(),
                status: 'pending' // Default status for new suggestions
            });

            // 2. Try to Send Email (Only if configured)
            if (process.env.SMTP_USER && process.env.SMTP_PASS) {
                try {
                    const nodemailer = require('nodemailer');
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: process.env.SMTP_USER,
                            pass: process.env.SMTP_PASS,
                        },
                    });

                    const mailOptions = {
                        from: `"Amero X Suggestions" <${process.env.SMTP_USER}>`,
                        to: "ameroxsocials@gmail.com", // Send to admin
                        subject: `New Suggestion [${category.toUpperCase()}] from ${name}`,
                        text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\nSuggestion: ${suggestion}`,
                        html: `
              <h3>New Suggestion Submitted</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Category:</strong> ${category}</p>
              <p><strong>Suggestion:</strong></p>
              <p>${suggestion}</p>
            `,
                    };

                    await transporter.sendMail(mailOptions);
                } catch (emailError) {
                    console.error("Email sending failed (but saved to DB):", emailError);
                }
            }

            return res.status(200).json({ success: true, message: "Suggestion saved successfully" });

        } catch (error) {
            console.error("Error saving suggestion:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
