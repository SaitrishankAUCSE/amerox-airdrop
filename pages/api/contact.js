import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            // 1. Save to Firestore (Database)
            // This works even without email config
            await addDoc(collection(db, "contacts"), {
                name,
                email,
                message,
                createdAt: serverTimestamp(),
            });

            // 2. Try to Send Email (Only if configured)
            if (process.env.SMTP_USER && process.env.SMTP_PASS) {
                try {
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: process.env.SMTP_USER,
                            pass: process.env.SMTP_PASS,
                        },
                    });

                    const mailOptions = {
                        from: `"Amero X Contact" <${process.env.SMTP_USER}>`,
                        to: "ameroxsocials@gmail.com", // Send to admin
                        subject: `New Message from ${name}`,
                        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                        html: `
              <h3>New Contact Form Submission</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `,
                    };

                    await transporter.sendMail(mailOptions);
                } catch (emailError) {
                    console.error("Email sending failed (but saved to DB):", emailError);
                    // Don't fail the request if email fails, since DB save worked
                }
            } else {
                console.log("Email configuration missing - skipping email (saved to DB only)");
            }

            return res.status(200).json({ success: true, message: "Message sent successfully" });

        } catch (error) {
            console.error("Error processing contact form:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
