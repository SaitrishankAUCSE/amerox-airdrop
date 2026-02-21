import axios from 'axios';
import { normalizeText } from '../../Utils/normalizeText';

const REQUIRED_DESCRIPTION = `🚀 The future of decentralized finance starts now.
Introducing AMX (Amero X) — a next-generation blockchain ecosystem built for speed, security, and real-world impact.

This isn't just another token.
This is infrastructure.
This is utility.
This is the evolution of Web3.

Be early. Be part of something bigger.

🔗 Airdrop is now live — complete the verification and claim your allocation.

#AMX #AmeroX #Web3 #CryptoAirdrop #BlockchainTechnology #DeFi #CryptoCommunity #DigitalAssets #FutureOfFinance`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, error: 'URL is required' });
    }

    try {
        // STEP 1: Validate URL Format
        const cleanUrl = url.trim();
        const instagramPattern = /(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|reels)\/[A-Za-z0-9_-]+/i;
        if (!instagramPattern.test(cleanUrl)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid Instagram post URL.'
            });
        }

        // STEP 2: Verify using Instagram oEmbed API
        const appId = process.env.APP_ID;
        const appSecret = process.env.APP_SECRET;

        if (!appId || !appSecret) {
            console.error("Missing Facebook/Instagram APP_ID or APP_SECRET in environment variables");
            return res.status(500).json({
                success: false,
                error: 'Server configuration error (Missing required API credentials).'
            });
        }

        const response = await axios.get(
            `https://graph.facebook.com/v18.0/instagram_oembed`,
            {
                params: {
                    url: cleanUrl,
                    access_token: `${appId}|${appSecret}`
                }
            }
        );

        const caption = response.data.title || "";

        if (!caption) {
            return res.status(400).json({
                success: false,
                error: 'Unable to read Instagram caption.'
            });
        }

        // STEP 3: Strict Description Comparison
        const normCaption = normalizeText(caption);
        const normRequired = normalizeText(REQUIRED_DESCRIPTION);

        let isMatch = false;

        if (normCaption === normRequired) {
            isMatch = true;
        } else if (normCaption.length > 20 && normRequired.startsWith(normCaption)) {
            // Truncation Case: The required text starts with the extracted text.
            console.log("Matched via start-of-text (Truncation detected).");
            isMatch = true;
        }

        if (isMatch) {
            // Success
            return res.status(200).json({
                success: true,
                message: 'Verification successful.'
            });
        } else {
            // Mismatch
            console.log("Mismatch Details:");
            console.log("Extracted:", normCaption);
            console.log("Required:", normRequired);

            return res.status(400).json({
                success: false,
                error: 'Description has not matched with the website description.'
            });
        }

    } catch (error) {
        console.error('Instagram oEmbed API Error:', error?.response?.data || error.message);

        let errorMessage = 'Verification API failed.';
        if (error?.response?.data?.error?.message) {
            errorMessage = error.response.data.error.message;
        }

        return res.status(500).json({
            success: false,
            error: `Unable to verify Instagram post. (${errorMessage})`
        });
    }
}
