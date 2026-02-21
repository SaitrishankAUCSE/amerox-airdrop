const axios = require('axios');

async function test() {
    const urls = [
        { name: 'Instagram', url: 'https://www.instagram.com/p/DU6JZihk2kn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', endpoint: '/api/verify-instagram' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/posts/venkata-sai-trishank-kamma-907802372_amx-amerox-blockchaininnovation-share-7430173508879597568-RYY5?utm_source=share', endpoint: '/api/verify-linkedin' },
        { name: 'Twitter', url: 'https://x.com/AmeroXchain/status/2013657917065433458?s=20', endpoint: '/api/verify-tweet' },
    ];

    for (const { name, url, endpoint } of urls) {
        console.log(`\n=== Testing ${name} ===`);
        try {
            const { data } = await axios.post(`https://airdrop.amerox.io${endpoint}`, { url }, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 15000
            });
            console.log(`✅ ${name}: ${JSON.stringify(data)}`);
        } catch (e) {
            console.log(`❌ ${name}: ${e.response?.status} ${JSON.stringify(e.response?.data)}`);
        }
    }
}

test();
