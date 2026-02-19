import { getXIdFromUrl } from "../../Utils";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, error: 'URL is required' });
    }

    try {
        // 1. Extract Tweet ID from URL
        const xIdRegex = /\/status\/(\d+)/;
        const match = url.match(xIdRegex);
        if (!match) {
            return res.status(400).json({ success: false, error: 'Invalid X (Twitter) Post URL' });
        }
        const tweetId = match[1];

        // 2. Fetch Tweet Data via oEmbed
        const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`;
        const response = await fetch(oembedUrl);

        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ success: false, error: 'Tweet not found or is private' });
            }
            throw new Error('Failed to fetch tweet data');
        }

        const data = await response.json();
        const htmlContent = data.html;

        // 3. Extract and Normalize Text
        let cleanText = htmlContent.replace(/<[^>]*>/g, ' ');
        cleanText = cleanText.toLowerCase().replace(/\s+/g, ' ').trim();

        // 4. Strict Content Verification — must match the provided X (Twitter) description
        // Expected post: "⚡ The next evolution of DeFi is here. Meet AMX 🪙 Scalable. Powerful. Built for the future. 🔗 Airdrop Live — Don't miss early access. Join the movement. #AMX #AmeroX #Crypto #Airdrop #Web3 #Blockchain"
        // 4. Hashtag-Based Verification (50% threshold)
        const expectedHashtags = ["#amx", "#amerox", "#crypto", "#airdrop", "#web3", "#blockchain"];
        const foundHashtags = expectedHashtags.filter(tag => cleanText.includes(tag));
        const threshold = Math.ceil(expectedHashtags.length / 2);

        if (foundHashtags.length < threshold) {
            const missingHashtags = expectedHashtags.filter(tag => !cleanText.includes(tag)).map(t => t.toUpperCase());
            return res.status(400).json({
                success: false,
                error: `❌ X Post verification failed. Your post is missing required hashtags: ${missingHashtags.join(', ')}. Please copy the description from the Post Details section.`,
            });
        }

        // 5. Success
        return res.status(200).json({
            success: true,
            message: '✅ X (Twitter) Post Verified Successfully'
        });

    } catch (error) {
        console.error('X Verification Error:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error during verification' });
    }
}
