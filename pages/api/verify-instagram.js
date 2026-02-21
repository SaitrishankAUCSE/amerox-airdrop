import puppeteer from 'puppeteer';
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

    let browser = null;

    try {
        // STEP 2: Validate URL (Localhost implementation of Prompt Step 2)
        const instagramPattern = /^https:\/\/(www\.)?instagram\.com\/(p|reel|reels)\/[A-Za-z0-9_-]+/;
        if (!instagramPattern.test(url)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid Instagram post URL.'
            });
        }

        // STEP 3: Launch Puppeteer (Localhost "Free" Logic)
        // Note: For local Next.js, we use standard puppeteer, not @sparticuz/chromium
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Step 3: User Agent
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

        // Step 3: Navigation
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

        // STEP 4: Detect Private Account
        const pageContent = await page.content();
        if (pageContent.includes("This Account is Private")) {
            await browser.close();
            return res.status(400).json({
                success: false,
                error: 'Switch to public account.'
            });
        }

        // STEP 5: Extract Caption
        let ogDescription = await page.$eval('meta[property="og:description"]', element => element.content).catch(() => null);

        if (!ogDescription) {
            await browser.close();
            console.error("DEBUG: og:description meta tag NOT FOUND on the page.");
            // Optional: Log page title or partial content to see if we hit a login page
            const title = await page.title();
            console.error(`DEBUG: Page Title: ${title}`);

            return res.status(400).json({
                success: false,
                error: `Unable to read Instagram caption. (Meta tag missing. Page title: ${title})`
            });
        }

        // Parse "username: caption text" (Step 5)
        const firstColonIndex = ogDescription.indexOf(": ");
        if (firstColonIndex === -1) {
            await browser.close();
            console.error(`DEBUG: Format 'Username: Caption' not found in: "${ogDescription}"`);
            return res.status(400).json({
                success: false,
                error: `Unable to read Instagram caption. (Format mismatch. Substring: ${ogDescription.substring(0, 50)}...)`
            });
        }

        const instagramCaption = ogDescription.substring(firstColonIndex + 2).trim();

        // remove standard quotes if present
        let cleanCaption = instagramCaption;
        if (cleanCaption.startsWith('"') && cleanCaption.endsWith('"')) {
            cleanCaption = cleanCaption.slice(1, -1);
        }

        // STEP 6: Strict Description Comparison
        const normCaption = normalizeText(cleanCaption);
        const normRequired = normalizeText(REQUIRED_DESCRIPTION);

        // Strict Match OR Prefix Match (for Truncation)
        // Instagram truncates og:description to ~150-170 chars.
        // If the extracted text matches the BEGINNING of the required text, we accept it.

        let isMatch = false;

        if (normCaption === normRequired) {
            isMatch = true;
        } else if (normCaption.length > 20 && normRequired.startsWith(normCaption)) {
            // Truncation Case: The required text starts with the extracted text.
            // e.g. Required: "Hello World..." Extracted: "Hello W"
            console.log("Matched via start-of-text (Truncation detected).");
            isMatch = true;
        }

        if (isMatch) {
            // CASE 2: Success
            await browser.close();
            return res.status(200).json({
                success: true,
                message: 'Verification successful.'
            });
        } else {
            // CASE 3: Mismatch
            // Debugging for local dev
            console.log("Mismatch Details:");
            console.log("Extracted:", normCaption);
            console.log("Required:", normRequired);

            await browser.close();
            return res.status(400).json({
                success: false,
                error: 'Description has not matched with the website description.'
            });
        }

    } catch (error) {
        if (browser) await browser.close();
        console.error('Verification Error:', error);
        return res.status(500).json({
            success: false,
            error: `Unable to read Instagram caption. (Internal Error: ${error.message})`
        });
    }
}
