const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const { normalizeText } = require("../utils/normalizeText");

class InstagramVerifier {
    constructor() {
        this.browser = null;
    }

    async init() {
        // STEP 3 Requirements
        chromium.setHeadlessMode = true;
        chromium.setGraphicsMode = false;

        this.browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async verifyPost(postUrl, requiredDescription) {
        let page = null;
        try {
            if (!this.browser) await this.init();

            page = await this.browser.newPage();

            // STEP 3: User Agent
            await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

            // STEP 3: Navigation with Timeout
            await page.goto(postUrl, { waitUntil: "networkidle2", timeout: 30000 });

            // STEP 4: Detect Private Account
            const pageContent = await page.content();
            if (pageContent.includes("This Account is Private")) {
                return {
                    success: false,
                    error: "Switch to public account."
                };
            }

            // STEP 5: Extract Caption
            let ogDescription = await page.$eval('meta[property="og:description"]', element => element.content).catch(() => null);

            if (!ogDescription) {
                return {
                    success: false,
                    error: "Unable to read Instagram caption."
                };
            }

            // Split at first ": "
            const firstColonIndex = ogDescription.indexOf(": ");
            if (firstColonIndex === -1) {
                return {
                    success: false,
                    error: "Unable to read Instagram caption."
                };
            }

            const extractedUsername = ogDescription.substring(0, firstColonIndex).trim();
            const instagramCaption = ogDescription.substring(firstColonIndex + 2).trim();

            // STEP 6: Strict Description Comparison
            const normCaption = normalizeText(instagramCaption);
            const normRequired = normalizeText(requiredDescription);

            if (normCaption === normRequired) {
                // CASE 2: Account is Public AND Caption Matches Exactly
                return {
                    success: true,
                    message: "Verification successful.",
                    postUrl: postUrl // To be returned/used by caller
                };
            } else {
                // CASE 3: Account is Public BUT Caption Does NOT Match
                // Debug log for troubleshooting (not required by prompt but helpful)
                console.log("Mismatch Details:");
                console.log("Extracted:", normCaption);
                console.log("Required:", normRequired);

                return {
                    success: false,
                    error: "Description has not matched with the website description."
                };
            }

        } catch (error) {
            console.error("Verification logic error:", error);
            return {
                success: false,
                error: "Unable to read Instagram caption."
            };
        } finally {
            if (page) await page.close();
            // Browser remains open for reuse or closed by caller using .close()
        }
    }
}

module.exports = InstagramVerifier;
