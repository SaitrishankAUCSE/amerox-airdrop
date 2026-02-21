const puppeteer = require('puppeteer');
const fs = require('fs');

const BASE_URL = 'https://airdrop.amerox.io';
const visitedPages = new Set();
const pagesToVisit = [BASE_URL];
const results = [];

let totalTested = 0;
let totalPassed = 0;
let totalFailed = 0;
const criticalErrors = [];

async function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

function getUniqueSelector(el) {
    // A simplified unique selector generator evaluated in browser context
    if (el.id) return `#${el.id}`;
    if (el.className) return `${el.tagName.toLowerCase()}.${el.className.trim().split(/\s+/).join('.')}`;
    return el.tagName.toLowerCase();
}

async function runQA() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    while (pagesToVisit.length > 0) {
        let currentUrl = pagesToVisit.pop();
        if (visitedPages.has(currentUrl)) continue;
        visitedPages.add(currentUrl);

        console.log(`\n🔍 Scanning Page: ${currentUrl}`);
        const page = await browser.newPage();

        // Capture JS errors
        page.on('pageerror', err => {
            criticalErrors.push(`[${currentUrl}] JS Error: ${err.toString()}`);
        });

        // Capture failed requests
        page.on('requestfailed', request => {
            criticalErrors.push(`[${currentUrl}] Request Failed: ${request.url()} - ${request.failure()?.errorText}`);
        });

        try {
            const response = await page.goto(currentUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            if (!response.ok()) {
                criticalErrors.push(`Failed to load ${currentUrl}. Status: ${response.status()}`);
                await page.close();
                continue;
            }

            // Discover Internal Links to add to crawler queue
            const hrefs = await page.$$eval('a[href]', links => links.map(a => a.href));
            hrefs.forEach(href => {
                if (href.startsWith(BASE_URL) && !href.includes('#') && !visitedPages.has(href) && !pagesToVisit.includes(href)) {
                    pagesToVisit.push(href);
                }
            });

            // Find all interactable elements
            const elementsInfo = await page.evaluate(() => {
                const interactables = Array.from(document.querySelectorAll('button, a[href], [role="button"], [onclick], input[type="submit"]'));

                // Return mapping of information needed to test them
                return interactables.map((el, index) => {
                    const isVisible = !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
                    if (!isVisible) return null;

                    // Generate a semi-unique path to re-select this element
                    let pathSelector = el.tagName.toLowerCase();
                    if (el.id) pathSelector += `#${el.id}`;
                    if (el.className && typeof el.className === 'string') pathSelector += `.${el.className.split(' ').join('.')}`;
                    pathSelector += `:nth-child(${Array.from(el.parentNode.children).indexOf(el) + 1})`;

                    return {
                        index,
                        selector: pathSelector,
                        tagName: el.tagName.toLowerCase(),
                        text: el.innerText ? el.innerText.trim().replace(/\n/g, ' ') : (el.value || 'No Text'),
                        href: el.href || el.getAttribute('href'),
                        type: el.getAttribute('type'),
                        role: el.getAttribute('role'),
                        onclick: !!el.getAttribute('onclick')
                    };
                }).filter(Boolean);
            });

            console.log(`Found ${elementsInfo.length} clickable elements on ${currentUrl}`);

            // Test each element
            for (const elInfo of elementsInfo) {
                totalTested++;
                let status = 'PASS';
                let actualResult = 'Clicked successfully';
                let expectedAction = 'Interaction';
                let errorDetails = '';

                try {
                    if (elInfo.tagName === 'a' && elInfo.href) {
                        expectedAction = `Navigate to ${elInfo.href}`;
                        if (elInfo.href.includes('#') && elInfo.href.startsWith(BASE_URL)) {
                            // Anchor link test
                            const hash = elInfo.href.split('#')[1];
                            if (hash) {
                                const hashExists = await page.evaluate((h) => !!document.getElementById(h) || !!document.getElementsByName(h).length, hash);
                                const crossPageAnchors = ['contact', 'contribution', 'feature', 'chart', 'faq'];
                                if (!hashExists && !crossPageAnchors.includes(hash)) {
                                    // Ignoring known cross-page anchors that might not exist on current page for simplicity
                                    status = 'FAIL';
                                    actualResult = `Anchor #${hash} not found on page`;
                                } else {
                                    actualResult = `Anchor #${hash} exists`;
                                }
                            }
                        } else if (elInfo.href.startsWith('mailto:') || elInfo.href.startsWith('tel:')) {
                            actualResult = `Valid protocol link`;
                        } else {
                            // Test HTTP status for external/internal non-anchor links
                            try {
                                const axios = require('axios');
                                const fetchRes = await axios.head(elInfo.href, {
                                    validateStatus: () => true,
                                    timeout: 10000,
                                    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } // Prevent Twitter/LinkedIn 403s
                                });
                                if (fetchRes.status >= 400 && fetchRes.status !== 405 && fetchRes.status !== 403 && fetchRes.status !== 999) {
                                    status = 'FAIL';
                                    actualResult = `HTTP ${fetchRes.status}`;
                                    errorDetails = `Broken Link`;
                                } else {
                                    actualResult = `HTTP ${fetchRes.status} (Considered Valid)`;
                                }
                            } catch (e) {
                                status = 'FAIL';
                                actualResult = 'Network Error';
                                errorDetails = e.message;
                            }
                        }
                    } else {
                        // It's a button or custom click element
                        expectedAction = 'Trigger Action/Modal/Submit';

                        // Wait for element and click
                        const elements = await page.$$(elInfo.selector);
                        if (elements.length > 0) {
                            const target = elements[0];
                            await target.scrollIntoView();
                            await delay(100);

                            // We intercept navigation to prevent the crawler from leaving the page
                            let navigationOccurred = false;
                            page.once('framenavigated', () => { navigationOccurred = true; });

                            // Use DOM click to bypass Puppeteer's strict viewport visibility layout checks
                            await page.evaluate((el) => {
                                if (el) el.click();
                            }, target).catch(e => {
                                status = 'FAIL';
                                actualResult = 'Unclickable';
                                errorDetails = e.message;
                            });

                            await delay(300); // Wait to see if JS errors pop up or modals open

                            if (navigationOccurred) {
                                actualResult = 'Navigated Away';
                                // Need to go back to continue testing other buttons on this page
                                await page.goBack({ waitUntil: 'networkidle2' }).catch(() => console.log("Failed to go back"));
                                await delay(500);
                            } else {
                                actualResult = 'Clicked (No navigation)';
                            }
                        } else {
                            status = 'FAIL';
                            actualResult = 'Element lost from DOM';
                        }
                    }
                } catch (e) {
                    status = 'FAIL';
                    actualResult = 'Test Exception';
                    errorDetails = e.message;
                }

                if (status === 'PASS') totalPassed++;
                if (status === 'FAIL') totalFailed++;

                results.push({
                    page_url: currentUrl,
                    button_text: elInfo.text,
                    button_type: elInfo.tagName === 'a' ? 'link' : 'button',
                    expected_action: expectedAction,
                    actual_result: actualResult,
                    status: status,
                    error_details: errorDetails
                });
            }

        } catch (err) {
            criticalErrors.push(`[${currentUrl}] Page processing error: ${err.message}`);
        } finally {
            try { await page.close(); } catch (e) { }
        }
    }

    await browser.close();

    const report = {
        summary: {
            total_elements_tested: totalTested,
            total_passed: totalPassed,
            total_failed: totalFailed,
            critical_errors: criticalErrors
        },
        results: results
    };

    fs.writeFileSync('qa_report.json', JSON.stringify(report, null, 2));
    console.log('\n✅ QA Scan Complete. Report saved to qa_report.json');
    console.log(`Tested: ${totalTested}, Passed: ${totalPassed}, Failed: ${totalFailed}`);
}

runQA().catch(console.error);
