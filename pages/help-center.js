import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Header, Footer, Banner } from "../components/index";

const HelpCenter = () => {
    const faqs = [
        {
            category: "Getting Started",
            items: [
                {
                    q: "How do I connect my wallet to AMERO X?",
                    a: "Click the 'Connect' button in the top navigation bar. A Web3Modal prompt will appear where you can select your preferred wallet (MetaMask, Trust Wallet, Coinbase Wallet, etc.). Approve the connection request in your wallet, and you'll be connected to the AMERO X platform. Make sure you have the BNB Smart Chain (Chain ID: 56) network added to your wallet."
                },
                {
                    q: "What is AMERO X (AMX)?",
                    a: "AMERO X is a high-performance hybrid liquidity hub built on the BNB Smart Chain. It is engineered for institutional-grade peer-to-peer (P2P) settlement, real-yield derivatives, and sovereign account abstraction. The AMX token is the native utility and governance token of the protocol, used for staking, fee discounts, governance voting, and ecosystem participation."
                },
                {
                    q: "How do I switch to the BNB Smart Chain network?",
                    a: "When you connect your wallet, AMERO X will automatically prompt you to switch to BSC if you're on a different network. If the auto-switch doesn't work, you can manually add BSC by going to your wallet settings and adding a custom network with these details: Network Name: BNB Smart Chain, RPC URL: https://bsc-dataseed.binance.org, Chain ID: 56, Symbol: BNB, Explorer: https://bscscan.com."
                },
                {
                    q: "What wallets are supported?",
                    a: "AMERO X supports any EVM-compatible wallet through Web3Modal. The most popular options include MetaMask (browser extension or mobile app), Trust Wallet, Coinbase Wallet, WalletConnect-compatible wallets, and Binance Chain Wallet. For the best experience, we recommend MetaMask on desktop or Trust Wallet on mobile."
                },
            ],
        },
        {
            category: "Airdrop & Token Claims",
            items: [
                {
                    q: "How do I claim the free AMX airdrop?",
                    a: "Step 1: Connect your Web3 wallet. Step 2: Navigate to the Airdrop page via the header button. Step 3: Fill in your name and email. Step 4: Complete three social media verification tasks — post on X (Twitter), Instagram, and LinkedIn using the exact description provided in the 'Post Details' section. Step 5: Paste your post URLs into the verification fields. Step 6: Click 'Claim Airdrop' to receive your free AMX tokens instantly."
                },
                {
                    q: "Why is my social media verification failing?",
                    a: "The most common reasons are: (1) Your social media account is set to private — it must be public for our system to verify your post. (2) You didn't copy the exact description from the 'Post Details' section — our system checks for specific hashtags. (3) The URL you pasted is incorrect or points to a different post. (4) You're using a shortened URL — always use the full post URL."
                },
                {
                    q: "I already claimed the airdrop. Can I claim again?",
                    a: "No. Each wallet address can only claim the airdrop once. If you've already claimed, your wallet address is recorded on the blockchain and the smart contract will reject any subsequent claim attempts. This ensures fair distribution to the maximum number of community members."
                },
                {
                    q: "How long does it take to receive airdrop tokens?",
                    a: "AMX tokens are credited to your wallet immediately after your claim transaction is confirmed on the BNB Smart Chain. This typically takes 10-30 seconds. You can verify receipt by checking your wallet's token balance or viewing the transaction on BscScan."
                },
                {
                    q: "I don't see AMX tokens in my wallet after claiming.",
                    a: "You may need to manually add the AMX token contract address to your wallet. Go to your wallet's 'Add Token' or 'Import Token' feature and paste the AMERO X token contract address. The tokens are on-chain and belong to your wallet — they just may not be visible until the token is imported."
                },
            ],
        },
        {
            category: "Token Economics & Staking",
            items: [
                {
                    q: "What is the total supply of AMX tokens?",
                    a: "The complete tokenomics — including total supply, allocation breakdown (team, community, treasury, liquidity, ecosystem development), vesting schedules, and burn mechanisms — are detailed in our Whitepaper and Lightpaper. Both documents are available for download from the Documents section on the homepage."
                },
                {
                    q: "What is Real Yield and how does it work?",
                    a: "Real Yield is AMERO X's revenue-sharing model. Instead of minting new tokens as staking rewards (which causes inflation and dilution), AMERO X distributes 30% of actual protocol revenue — collected from trading fees, escrow fees, and settlement charges — directly to AMX stakers in USDC. This means every reward represents real economic value generated by the protocol."
                },
                {
                    q: "Where can I trade AMX tokens?",
                    a: "AMX tokens will be listed on major decentralized exchanges upon mainnet launch. Listings, liquidity pair information, and launch dates will be announced through our official channels (X/Twitter, Discord, Instagram). We recommend following our socials and turning on notifications to be among the first to know."
                },
                {
                    q: "What is the AMX token used for?",
                    a: "AMX serves multiple functions within the AMERO X ecosystem: (1) Staking — earn real yield from protocol revenue. (2) Governance — vote on protocol decisions, fee structures, and strategic direction. (3) Fee discounts — AMX holders enjoy reduced trading and settlement fees. (4) Ecosystem access — certain premium features and early access programs require AMX holdings."
                },
            ],
        },
        {
            category: "Security & Privacy",
            items: [
                {
                    q: "Is AMERO X safe to use?",
                    a: "Yes. AMERO X follows strict security best practices: smart contracts are audited by tier-1 security firms, all user assets remain under full self-custody (we never hold your private keys), all transactions are transparent and verifiable on-chain, and our platform uses standard Web3 wallet connection protocols. We never ask for your seed phrase or private keys."
                },
                {
                    q: "Has the AMERO X smart contract been audited?",
                    a: "AMERO X smart contracts undergo rigorous security audits by professional blockchain security firms. Audit reports will be published publicly as they are completed. We also maintain real-time on-chain monitoring for anomalous activity and have bug bounty programs for responsible disclosure."
                },
                {
                    q: "How is my personal data protected?",
                    a: "We collect minimal personal data (name, email, social URLs) only for airdrop verification purposes. All data is encrypted and stored securely in our database. We never sell, trade, or share your personal information with third parties. For full details, please review our Privacy Policy page."
                },
            ],
        },
        {
            category: "Technical Support",
            items: [
                {
                    q: "The website is stuck on a loading screen. What should I do?",
                    a: "Try refreshing the page. If the issue persists, it may be related to your wallet connection. Try disconnecting and reconnecting your wallet, or use a different browser. On mobile, ensure your DApp browser (MetaMask, Trust Wallet) is up to date. If the problem continues, clear your browser cache and try again."
                },
                {
                    q: "My transaction failed. What happened?",
                    a: "Transaction failures are usually caused by: (1) Insufficient BNB for gas fees — make sure you have at least 0.01 BNB in your wallet. (2) The airdrop contract balance is depleted. (3) Your wallet address has already claimed. (4) Network congestion — try again after a few minutes with a slightly higher gas price."
                },
                {
                    q: "How do I report a bug or issue?",
                    a: "Please use our Suggestions page to report bugs, or reach out directly via the 'Get In Touch' contact form on the homepage. You can also join our Discord server for real-time support from our team and community moderators."
                },
            ],
        },
    ];

    return (
        <div>
            <Head>
                <title>AMERO X - Help Center</title>
                <meta name="description" content="Find answers to commonly asked questions about AMERO X, airdrop claims, wallet connections, token economics, and more." />
            </Head>
            <Header />
            <Banner title="Help Center" type="Home" action="Help Center" path="/" />

            <section style={{ padding: '100px 0', minHeight: '80vh', position: 'relative' }}>
                <div className="hero-glow-layer"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                                <h2 style={{ color: '#d4af37', marginBottom: '15px' }}>How Can We Help?</h2>
                                <p style={{ color: '#aaa', fontSize: '16px', maxWidth: '550px', margin: '0 auto' }}>
                                    Browse through our comprehensive FAQ to find answers to your questions about the AMERO X protocol, airdrop claims, token economics, and security.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px' }}>
                                {faqs.map((section, i) => (
                                    <a key={i} href={`#section-${i}`} style={{
                                        background: 'rgba(212,175,55,0.1)',
                                        border: '1px solid rgba(212,175,55,0.2)',
                                        borderRadius: '25px',
                                        padding: '8px 18px',
                                        color: '#d4af37',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s',
                                    }}>{section.category}</a>
                                ))}
                            </div>

                            {faqs.map((section, sIdx) => (
                                <div key={sIdx} id={`section-${sIdx}`} style={{ marginBottom: '50px' }}>
                                    <h3 style={{
                                        color: '#d4af37',
                                        fontSize: '22px',
                                        fontWeight: '700',
                                        marginBottom: '25px',
                                        paddingBottom: '12px',
                                        borderBottom: '1px solid rgba(212,175,55,0.2)',
                                    }}>{section.category}</h3>

                                    {section.items.map((item, iIdx) => (
                                        <div key={iIdx} style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(212,175,55,0.08)',
                                            borderRadius: '12px',
                                            padding: '25px 28px',
                                            marginBottom: '12px',
                                            transition: 'border-color 0.3s',
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'}
                                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.08)'}
                                        >
                                            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: '600', marginBottom: '12px', lineHeight: '1.4' }}>
                                                <span style={{ color: '#d4af37', marginRight: '8px' }}>Q.</span>{item.q}
                                            </h4>
                                            <p style={{ color: '#999', fontSize: '14px', lineHeight: '1.7', margin: 0, paddingLeft: '24px' }}>{item.a}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* Community CTA */}
                            <div style={{
                                background: 'rgba(212,175,55,0.06)',
                                border: '1px solid rgba(212,175,55,0.2)',
                                borderRadius: '16px',
                                padding: '40px',
                                textAlign: 'center',
                                marginTop: '20px',
                                position: 'relative',
                                zIndex: 10
                            }}>
                                <h3 style={{ color: '#d4af37', marginBottom: '12px' }}>Join the AMERO X Community</h3>
                                <p style={{ color: '#aaa', marginBottom: '25px', maxWidth: '480px', margin: '0 auto 25px' }}>
                                    Connect with early adopters, share your ideas, and stay updated on the latest protocol developments.
                                </p>
                                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <a href="https://discord.gg/AD4kkTMuJw" target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '14px' }}>Join Discord</a>
                                    <a href="https://x.com/AmeroXchain" target="_blank" rel="noopener noreferrer" className="btn btn-two" style={{ fontSize: '14px' }}>Follow on X</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HelpCenter;
