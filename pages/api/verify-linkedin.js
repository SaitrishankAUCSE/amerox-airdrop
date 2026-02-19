export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, error: 'URL is required' });
    }

    try {
        // 1. Validate LinkedIn URL Format
        const linkedInPattern = /linkedin\.com\/(feed\/update\/|posts\/|activity\/)/;
        if (!linkedInPattern.test(url)) {
            return res.status(400).json({
                success: false,
                error: '❌ Invalid LinkedIn URL. Please provide a valid LinkedIn post URL.'
            });
        }

        // 2. Attempt to fetch post content for verification
        let cleanText = '';
        let contentFetched = false;

        try {
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                },
                redirect: 'follow',
            });

            const html = await response.text();

            // Try to extract content from Open Graph / meta description tags
            // LinkedIn renders some content in meta tags even for server-side requests
            const ogDescMatch = html.match(/<meta\s+(?:property="og:description"|name="description")\s+content="([^"]*?)"/i);
            const ogDesc2Match = html.match(/content="([^"]*?)"\s+(?:property="og:description"|name="description")/i);
            const metaContent = ogDescMatch ? ogDescMatch[1] : (ogDesc2Match ? ogDesc2Match[1] : '');

            if (metaContent && metaContent.length > 20) {
                // Decode HTML entities
                cleanText = metaContent
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'")
                    .replace(/&#x27;/g, "'")
                    .toLowerCase()
                    .replace(/\s+/g, ' ')
                    .trim();
                contentFetched = true;
            }

            // Also try extracting from JSON-LD structured data
            if (!contentFetched) {
                const jsonLdMatch = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
                if (jsonLdMatch) {
                    try {
                        const jsonData = JSON.parse(jsonLdMatch[1]);
                        const articleBody = jsonData.articleBody || jsonData.description || jsonData.text || '';
                        if (articleBody && articleBody.length > 20) {
                            cleanText = articleBody.toLowerCase().replace(/\s+/g, ' ').trim();
                            contentFetched = true;
                        }
                    } catch (e) { /* JSON parse failed, continue */ }
                }
            }
        } catch (fetchErr) {
            // Network error — will fall through to content check below
            console.error('LinkedIn fetch error:', fetchErr.message);
        }

        // 3. Hashtag-Based Verification (50% threshold)
        const expectedHashtags = ["#amx", "#amerox", "#blockchaininnovation", "#defi", "#web3", "#cryptostartup", "#fintech"];

        if (contentFetched && cleanText) {
            const foundHashtags = expectedHashtags.filter(tag => cleanText.includes(tag));
            const threshold = Math.ceil(expectedHashtags.length / 2);

            if (foundHashtags.length < threshold) {
                const missingHashtags = expectedHashtags.filter(tag => !cleanText.includes(tag)).map(t => t.toUpperCase());
                return res.status(400).json({
                    success: false,
                    error: `❌ LinkedIn post verification failed. Your post is missing required hashtags: ${missingHashtags.join(', ')}. Please copy the description from the Post Details section.`
                });
            }

            return res.status(200).json({
                success: true,
                message: '✅ LinkedIn Post Verified Successfully'
            });
        }

        // 4. If content could not be fetched (LinkedIn blocks scraping),
        // use strict URL format validation as fallback
        // We validate the URL format is correct and trust the duplicate-URL check
        // in the frontend to prevent reuse
        return res.status(200).json({
            success: true,
            message: '✅ LinkedIn post URL verified. (Content check unavailable due to LinkedIn restrictions)',
            verified: true,
            contentChecked: false
        });

    } catch (error) {
        console.error('LinkedIn Verification Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error during LinkedIn verification'
        });
    }
}
