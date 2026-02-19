import React from 'react';
import Head from 'next/head';
import { Header, Footer, Banner } from "../components/index";

const TokenSaleTerms = () => {
    return (
        <div className="document-page">
            <Head>
                <title>AMERO X - Token Sale Terms</title>
                <meta name="description" content="AMERO X Token Sale Terms – Governance Rights, TGE Disclosures, and Institutional Vesting Schedules" />
            </Head>
            <Header />
            <Banner
                title="Token Sale Terms"
                type="Home"
                action="Terms"
                path="/"
            />
            <section className="document-page-area" style={{ padding: '100px 0', minHeight: '80vh', position: 'relative' }}>
                <div className="hero-glow-layer"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="document-content">
                                <h1 style={{ color: '#d4af37', marginBottom: '30px', textAlign: 'center' }}>AMERO X: Token Sale Terms & Protocol Access Disclosures</h1>

                                {/* ── Preamble ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>I. Strategic Preamble & Disclaimer</h2>
                                <p>These Token Sale Terms ("Terms") govern the acquisition of AMERO X (AMX) tokens. Participation in the AMX token ecosystem involves significant risk. AMX tokens are utility instruments designed for protocol access, governance, and fee compression within the AMERO X decentralized architecture. They do not represent equity, debt, or a claim on the assets of any centralized entity.</p>

                                {/* ── Protocol Access ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>II. Protocol Access & AMX Utility</h2>
                                <p>The AMX token is the fundamental access primitive for the AMERO X ecosystem. Holding and staking AMX grants participants the following protocol rights:</p>
                                <ul>
                                    <li><strong>Governance Rights:</strong> Influence over protocol parameters, including fee structures and asset listings.</li>
                                    <li><strong>Fee Compression:</strong> Dynamic discounts (up to 50%) across all protocol execution modules (Swaps, P2P, Perps).</li>
                                    <li><strong>Revenue Sharing (Real Yield):</strong> Distribution of 30% of protocol fees in USDC for active stakers.</li>
                                </ul>

                                {/* ── Tokenomics ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>III. Token Allocation & Institutional Vesting</h2>
                                <p>AMERO X utilizes a high-integrity vesting engine to ensure long-term alignment between the protocol and its stakeholders. All institutional and team allocations are governed by on-chain smart contracts with programmatic release schedules.</p>

                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: '#fff' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid #d4af37' }}>
                                                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#d4af37' }}>Allocation</th>
                                                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#d4af37' }}>Vesting Schedule</th>
                                                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#d4af37' }}>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td style={{ padding: '12px 10px' }}>Public Sale</td>
                                                <td style={{ padding: '12px 10px' }}>100% unlocked at TGE</td>
                                                <td style={{ padding: '12px 10px' }}>15%</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td style={{ padding: '12px 10px' }}>Ecosystem & Treasury</td>
                                                <td style={{ padding: '12px 10px' }}>48-month linear vesting</td>
                                                <td style={{ padding: '12px 10px' }}>30%</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td style={{ padding: '12px 10px' }}>Core Contributors</td>
                                                <td style={{ padding: '12px 10px' }}>12-month cliff, 36-month vesting</td>
                                                <td style={{ padding: '12px 10px' }}>20%</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td style={{ padding: '12px 10px' }}>Liquidity Provisioning</td>
                                                <td style={{ padding: '12px 10px' }}>Locked for 24 months via Smart Vault</td>
                                                <td style={{ padding: '12px 10px' }}>20%</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td style={{ padding: '12px 10px' }}>Strategic Partners</td>
                                                <td style={{ padding: '12px 10px' }}>6-month cliff, 24-month vesting</td>
                                                <td style={{ padding: '12px 10px' }}>15%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <ul>
                                    <li><strong>Smart Contract Risk:</strong> While audited by tier-1 security firms, the possibility of unforeseen exploits in decentralized logic exists.</li>
                                    <li><strong>Liquidity Risk:</strong> Market conditions may affect the slippage and execution efficiency of large-scale positions.</li>
                                    <li><strong>Regulatory Uncertainty:</strong> Changes in global regulatory frameworks may impact protocol availability in certain regions.</li>
                                    <li><strong>Execution Risk:</strong> Volatility in the underlying assets (WETH/USDC) can lead to liquidation in leveraged positions.</li>
                                </ul>

                                <div style={{ textAlign: 'center', marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #333' }}>
                                    <p style={{ color: '#d4af37', fontSize: '18px' }}>Empowering the future of institutional-grade DeFi. AMERO X.</p>
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

export default TokenSaleTerms;
