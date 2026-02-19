const puppeteer = require('puppeteer');

const REQUIRED_DESCRIPTION = `🚀 The future of decentralized finance starts now.
Introducing AMX (Amero X) — a next-generation blockchain ecosystem built for speed, security, and real-world impact.

This isn't just another token.
This is infrastructure.
This is utility.
This is the evolution of Web3.

Be early. Be part of something bigger.

🔗 Airdrop is now live — complete the verification and claim your allocation.

#AMX #AmeroX #Web3 #CryptoAirdrop #BlockchainTechnology #DeFi #CryptoCommunity #DigitalAssets #FutureOfFinance`;

const normalizeText = (text) => {
    if (!text) return "";
    return text
        .replace(/\r\n/g, "\n")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .normalize("NFC");
};

async function verify(url) {
    console.log(`\n🔍 Checking URL: ${url}`);

    if (!url) {
        console.error("❌ Please provide a URL: node debug-instagram.js <YOUR_POST_URL>");
        process.exit(1);
    }

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    try {
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

        // Check Private
        const content = await page.content();
        if (content.includes("This Account is Private")) {
            console.error("❌ Detected 'This Account is Private'.");
            return;
        }

        // Get OG Description
        let ogDescription = await page.$eval('meta[property="og:description"]', el => el.content).catch(() => null);
        console.log(`\n📄 Raw OG Description: "${ogDescription}"`);

        if (!ogDescription) {
            console.error("❌ Could not find og:description meta tag.");
            return;
        }

        // Parse
        const firstColon = ogDescription.indexOf(": ");
        if (firstColon === -1) {
            console.error("❌ Format 'Username: Caption' not found in og:description.");
            return;
        }

        const caption = ogDescription.substring(firstColon + 2).trim();
        console.log(`\n📝 Extracted Caption (Raw): "${caption}"`);

        // Normalize
        const normCaption = normalizeText(caption);
        const normRequired = normalizeText(REQUIRED_DESCRIPTION);

        console.log(`\n🔄 Normalized Extracted:\n"${normCaption}"`);
        console.log(`\n🎯 Normalized Required:\n"${normRequired}"`);

        if (normCaption === normRequired) {
            console.log("\n✅ MATCH! Verification would SUCCEED.");
        } else {
            console.log("\n❌ MISMATCH! Verification would FAIL.");
            console.log(`Length: Extracted(${normCaption.length}) vs Required(${normRequired.length})`);

            // Find difference
            for (let i = 0; i < Math.max(normCaption.length, normRequired.length); i++) {
                if (normCaption[i] !== normRequired[i]) {
                    console.log(`First difference at index ${i}:`);
                    console.log(`   Extracted: ...${normCaption.substring(i, i + 10)}...`);
                    console.log(`   Required:  ...${normRequired.substring(i, i + 10)}...`);
                    break;
                }
            }
        }

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
}

const url = process.argv[2];
verify(url);
