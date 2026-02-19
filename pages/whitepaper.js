import React from 'react';
import Head from 'next/head';
import { Header, Footer, Banner } from "../components/index";

const Whitepaper = () => {
    return (
        <div className="whitepaper-page">
            <Head>
                <title>AMERO X - Whitepaper</title>
                <meta name="description" content="AMERO X Complete Whitepaper – High-Performance Institutional Architecture & Real Yield Protocol" />
            </Head>
            <Header />
            <Banner
                title="Whitepaper"
                type="Home"
                action="Whitepaper"
                path="/"
            />
            <section className="document-page-area" style={{ padding: '100px 0', minHeight: '80vh', position: 'relative' }}>
                <div className="hero-glow-layer"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="document-content">
                                <h1 style={{ color: '#d4af37', marginBottom: '30px', textAlign: 'center' }}>AMERO X: Institutional Protocol & Technical Whitepaper</h1>

                                {/* ── Executive Overview ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>I. Executive Overview: Solving the Capital Fragmentation Gap</h2>
                                <p>AMERO X represents a paradigm shift in decentralized liquidity provision. The current DeFi landscape is plagued by <strong>fragmentation</strong>—capital is stalled in isolated pools, hindered by high slippage and inefficient routing. AMERO X bridges the gap between these complex protocols and global institutional markets by integrating professional trading primitives with a frictionless, high-fidelity UI.</p>
                                <p>By leveraging Account Abstraction and multi-chain settlement logic, AMERO X provides the world's first unified, non-custodial financial stack—facilitating everything from automated market making (AMM) to deep-liquidity P2P settlement and leveraged derivatives.</p>

                                {/* ── Mission ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>II. Mission & Vision</h2>
                                <p>AMERO X is committed to establishing the world's most accessible, transparent, and resilient decentralized financial hub. Our vision is to empower global market participants with absolute sovereignty over their assets, eliminating intermediary risk through trustless, smart-contract-driven infrastructure that performs at institutional scale.</p>

                                {/* ── Supported Assets ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>III. Asset Infrastructure & Liquidity Integrity</h2>
                                <p>AMERO X prioritizes the highest-integrity assets to ensure professional-grade depth and stability:</p>
                                <ul>
                                    <li><strong>Wrapped Ethereum (WETH):</strong> The protocol's primary ERC-20 utility asset for Ethereum-equivalent exposure, optimized for multi-chain high-frequency trading.</li>
                                    <li><strong>USDC (Binance-Pegged):</strong> A high-fidelity stable asset serving as the protocol's primary unit of account and collateral base, ensuring capital preservation during volatile market cycles.</li>
                                </ul>

                                {/* ── Architecture Core ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>IV. Protocol Architecture & Execution Engine</h2>
                                <p>AMERO X stack is partitioned into three modular layers designed for high-throughput execution and horizontal scalability:</p>

                                <div style={{ background: 'rgba(212, 175, 55, 0.05)', padding: '30px', borderRadius: '12px', border: '1px solid #333', marginTop: '20px', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ padding: '15px 30px', border: '1px solid #d4af37', borderRadius: '8px', width: '250px' }}><strong>Access Layer</strong><br /><span style={{ fontSize: '12px', color: '#ccc' }}>MPC Auth / Social Account Abstraction</span></div>
                                        <div style={{ fontSize: '20px', color: '#d4af37' }}>↓</div>
                                        <div style={{ padding: '15px 30px', border: '1px solid #d4af37', borderRadius: '8px', width: '250px' }}><strong>AMERO Execution Engine</strong><br /><span style={{ fontSize: '12px', color: '#ccc' }}>Hybrid Order Matching / Escrow Logic</span></div>
                                        <div style={{ fontSize: '20px', color: '#d4af37' }}>↓</div>
                                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                            <div style={{ padding: '10px 20px', border: '1px solid #d4af37', borderRadius: '8px', fontSize: '13px' }}>AMM Pools</div>
                                            <div style={{ padding: '10px 20px', border: '1px solid #d4af37', borderRadius: '8px', fontSize: '13px' }}>P2P Settlement</div>
                                            <div style={{ padding: '10px 20px', border: '1px solid #d4af37', borderRadius: '8px', fontSize: '13px' }}>Futures Vault</div>
                                        </div>
                                        <div style={{ fontSize: '20px', color: '#d4af37' }}>↓</div>
                                        <div style={{ padding: '15px 30px', border: '1px solid #d4af37', borderRadius: '8px', width: '250px', background: 'rgba(212, 175, 55, 0.1)' }}><strong>On-Chain Integrity Layer</strong><br /><span style={{ fontSize: '12px', color: '#ccc' }}>EVM Settlement & Finality</span></div>
                                    </div>
                                </div>

                                {/* ── Tokenomics ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>V. Advanced Token Economics (AMX)</h2>
                                <p>The AMX token is the fundamental utility unit of AMERO X, engineered for long-term scarcity and real-value accrual through its <strong>"Real Yield"</strong> pipeline.</p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                                    <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
                                        <h4 style={{ color: '#d4af37', margin: '0' }}>1,000,000,000</h4>
                                        <p style={{ fontSize: '12px', color: '#ccc', margin: '5px 0 0' }}>Fixed Total Supply</p>
                                    </div>
                                    <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
                                        <h4 style={{ color: '#d4af37', margin: '0' }}>150,000,000</h4>
                                        <p style={{ fontSize: '12px', color: '#ccc', margin: '5px 0 0' }}>Circulating Supply (TGE)</p>
                                    </div>
                                </div>

                                <h3 style={{ color: '#d4af37', marginTop: '25px' }}>5.1 Multi-Dimensional Utility</h3>
                                <ul>
                                    <li><strong>Governance:</strong> Direct authority over protocol fee parameters, AIPs, and asset tiering.</li>
                                    <li><strong>Real Yield Staking:</strong> 30% of all protocol fees (Swap/P2P/Futures) are streamed directly to AMX stakers in USDC.</li>
                                    <li><strong>Fee Compression:</strong> Tiered holding requirements unlock up to 50% discount on protocol-level fees.</li>
                                    <li><strong>Deflationary Engine:</strong> Protocol revenue is periodically used to buy back and burn AMX from the open market.</li>
                                </ul>

                                {/* ── Liquidity & Vesting ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>VI. Liquidity Assurance & Transparency</h2>
                                <p>AMERO X utilizes programmable liquidity locks and transparent vesting schedules to ensure ecosystem stability and mitigate sell-side pressure during the growth phase.</p>
                                <ul>
                                    <li><strong>Liquidity Locks:</strong> 80% of initial pool liquidity is locked via smart contract for a minimum of 24 months.</li>
                                    <li><strong>Institutional Vesting:</strong> Strategic partners and core contributors are subject to multi-year linear vesting with strict cliff parameters.</li>
                                </ul>

                                {/* ── On-Chain Transparency ── */}
                                <h3 style={{ color: '#d4af37', marginTop: '25px' }}>6.1 On-Chain Transparency Framework</h3>
                                <p>In line with our commitment to integrity, all core contracts are verifiable on-chain:</p>
                                <div style={{ padding: '15px', background: '#111', borderRadius: '8px', fontSize: '13px', border: '1px solid #333' }}>
                                    <code>AMX Token: <span style={{ color: '#d4af37' }}>0xAMX...CASH</span></code><br />
                                    <code>AMM Router: <span style={{ color: '#d4af37' }}>0xSWAP...FLOW</span></code><br />
                                    <code>P2P Escrow: <span style={{ color: '#d4af37' }}>0xSAFE...KEEP</span></code>
                                </div>

                                {/* ── Competitive Analysis ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>VII. Competitive Landscape: The AMERO X Advantage</h2>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: '#fff' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid #d4af37' }}>
                                                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#d4af37' }}>Institutional Primitive</th>
                                                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#d4af37' }}>AMERO X</th>
                                                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#d4af37' }}>Legacy DEX</th>
                                                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#d4af37' }}>Centralized P2P</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td>Account Abstraction</td>
                                                <td style={{ color: '#d4af37' }}>Social MPC (Non-Custodial)</td>
                                                <td>Private Key Only</td>
                                                <td>KYC Required</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td>On-Chain P2P Escrow</td>
                                                <td style={{ color: '#d4af37' }}>Yes (Trustless)</td>
                                                <td>No</td>
                                                <td>Centralized Control</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td>Hybrid Execution (50x)</td>
                                                <td style={{ color: '#d4af37' }}>Yes (Low-Latency)</td>
                                                <td>N/A</td>
                                                <td>Custodial</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* ── Security ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>VIII. Security Rigor & Audit Framework</h2>
                                <p>Security is the cornerstone of institutional adoption. AMERO X employs a rigorous, multi-layered audit framework:</p>
                                <ul>
                                    <li><strong>Tier-1 Audits:</strong> Biannual logic verification by globally recognized security firms.</li>
                                    <li><strong>Real-time Monitoring:</strong> 24/7 on-chain surveillance to mitigate anomalous activity.</li>
                                    <li><strong>Community Bug Bounty:</strong> A $500,000 tactical bounty program for continuous optimization.</li>
                                </ul>

                                <div style={{ textAlign: 'center', marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #333' }}>
                                    <p style={{ color: '#d4af37', fontSize: '18px' }}>Securing the Future of Decentralized Global Capital. AMERO X.</p>
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

export default Whitepaper;
