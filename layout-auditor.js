const puppeteer = require('puppeteer');
const fs = require('fs');

const BASE_URL = 'https://airdrop.amerox.io';
const pages = [
    '/',
    '/contribution',
    '/airdrop',
    '/blog',
    '/help-center',
    '/partners',
    '/suggestions',
    '/lightpaper',
    '/whitepaper',
    '/token-sale-terms',
    '/presentation',
    '/privacy-policy'
];

const viewports = {
    desktop: { width: 1440, height: 900, isMobile: false },
    mobile: { width: 375, height: 812, isMobile: true, hasTouch: true }
};

async function auditLayouts() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const report = {};

    for (const path of pages) {
        const url = BASE_URL + path;
        console.log(`\n🔍 Auditing: ${url}`);
        report[path] = { desktop: {}, mobile: {} };

        for (const [device, viewport] of Object.entries(viewports)) {
            const page = await browser.newPage();
            await page.setViewport(viewport);

            const errors = [];
            const consoleErrors = [];

            page.on('pageerror', err => consoleErrors.push(err.toString()));

            try {
                const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

                // 1. Check for horizontal overflow
                const hasHorizontalOverflow = await page.evaluate(() => {
                    return document.documentElement.scrollWidth > window.innerWidth;
                });

                if (hasHorizontalOverflow) {
                    errors.push('Horizontal overflow detected (page is wider than viewport)');
                }

                // 2. Specific Mobile Checks
                if (device === 'mobile') {
                    // Check if Connect button is visible
                    const isConnectVisible = await page.evaluate(() => {
                        const el = document.querySelector('.header-action');
                        if (!el) return false;
                        const style = window.getComputedStyle(el);
                        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
                    });
                    if (!isConnectVisible) errors.push('Mobile Connect button is hidden or missing');
                }

                report[path][device] = {
                    status: response.status(),
                    overflow: hasHorizontalOverflow,
                    jsErrors: consoleErrors,
                    layoutErrors: errors,
                    success: errors.length === 0 && consoleErrors.length === 0
                };
            } catch (err) {
                report[path][device] = { error: err.message, success: false };
            } finally {
                await page.close();
            }
        }
    }

    await browser.close();
    fs.writeFileSync('layout_audit_report.json', JSON.stringify(report, null, 2));
    console.log('\n✅ Audit complete. Saved to layout_audit_report.json');
}

auditLayouts().catch(console.error);
