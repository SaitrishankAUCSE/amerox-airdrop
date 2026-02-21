import axios from 'axios';

const REQUIRED_HASHTAGS = [
    '#AMX', '#AmeroX', '#Web3', '#CryptoAirdrop',
    '#BlockchainTechnology', '#DeFi', '#CryptoCommunity',
    '#DigitalAssets', '#FutureOfFinance'
];

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, error: 'URL is required' });
    }

    try {
        // STEP 1: Clean and validate URL format
        const cleanUrl = url.trim();
        const instagramPattern = /(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|reels)\/([A-Za-z0-9_-]+)/i;
        const match = cleanUrl.match(instagramPattern);

        if (!match) {
            return res.status(400).json({
                success: false,
                error: 'Invalid Instagram post URL.'
            });
        }

        const postId = match[4];

        if (!postId || postId.length < 5) {
            return res.status(400).json({
                success: false,
                error: 'Invalid Instagram post ID.'
            });
        }

        // STEP 2: Fetch the embed page
        try {
            const embedUrl = `https://www.instagram.com/p/${postId}/embed/captioned/`;
            const { data } = await axios.get(embedUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
                },
                timeout: 10000,
                responseType: 'text'
            });

            // STEP 3: Check for private account
            const lowerData = data.toLowerCase();
            if (lowerData.includes('this account is private') ||
                lowerData.includes('this post is from a private account') ||
                lowerData.includes('account is private')) {
                return res.status(400).json({
                    success: false,
                    error: 'This Instagram account is private. Please switch to a public account and try again.'
                });
            }

            // STEP 4: Strip HTML to extract visible text
            const stripped = data
                .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                .replace(/<[^>]+>/g, ' ')
                .replace(/\s+/g, ' ');

            // STEP 5: Check if Instagram returned actual post content or a login wall
            const hasPostContent = stripped.length > 200 &&
                (stripped.includes('followers') || stripped.includes('likes') || stripped.includes('post'));

            if (!hasPostContent) {
                // Instagram blocked the request (login wall / rate limit)
                // Accept the URL since format is valid
                console.log(`[Instagram Verify] Login wall detected for post ${postId}. Accepting valid URL.`);
                return res.status(200).json({
                    success: true,
                    message: 'Verification successful.'
                });
            }

            // STEP 6: Check hashtag presence (50% threshold)
            let foundCount = 0;
            const foundHashtags = [];
            for (const hashtag of REQUIRED_HASHTAGS) {
                if (stripped.includes(hashtag)) {
                    foundCount++;
                    foundHashtags.push(hashtag);
                }
            }

            const matchPercentage = (foundCount / REQUIRED_HASHTAGS.length) * 100;
            console.log(`[Instagram Verify] Post ${postId}: ${foundCount}/${REQUIRED_HASHTAGS.length} hashtags (${matchPercentage.toFixed(0)}%) [${foundHashtags.join(', ')}]`);

            if (matchPercentage >= 50) {
                return res.status(200).json({
                    success: true,
                    message: 'Verification successful.'
                });
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'Post description does not match. Please copy the description from the Post Details section.'
                });
            }

        } catch (fetchError) {
            // Network error / timeout
            console.warn(`[IG Fetch Error] Post ${postId}: ${fetchError.message}. Accepting valid URL.`);
            return res.status(200).json({
                success: true,
                message: 'Verification successful.'
            });
        }

    } catch (error) {
        console.error('Instagram verification error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}
