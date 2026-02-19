import React from 'react';
import Head from 'next/head';
import { Header, Footer, Banner } from "../components/index";

const Presentation = () => {
    return (
        <div className="document-page">
            <Head>
                <title>AMERO X - Presentation</title>
                <meta name="description" content="AMERO X Institutional Investor Presentation – Enterprise Alpha, Market Sizing, and Macro Roadmap" />
            </Head>
            <Header />
            <Banner
                title="Presentation"
                type="Home"
                action="Presentation"
                path="/"
            />
            <section className="document-page-area" style={{ padding: '100px 0', minHeight: '80vh', position: 'relative' }}>
                <div className="hero-glow-layer"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="document-content">
                                <h1 style={{ color: '#d4af37', marginBottom: '30px', textAlign: 'center' }}>AMERO X: Institutional Investor Presentation</h1>

                                {/* ── Problem / Market Gap ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>I. Market Analysis: The Capital Fragmentation Gap</h2>
                                <p>Despite the exponential growth of DeFi, professional capital remains sidelined by three systemic failures in the current decentralized architecture:</p>
                                <ul>
                                    <li><strong>Liquidity Fragmentation:</strong> Institutional capital is often stalled in isolated, low-depth pools, leading to prohibitive slippage.</li>
                                    <li><strong>Operational Friction:</strong> Legacy Web3 onboarding is slow and opaque, creating a barrier for 99% of global financial participants.</li>
                                    <li><strong>High-Impact Complexity:</strong> The lack of unified, cross-margined interfaces prevents the execution of sophisticated multi-asset strategies.</li>
                                </ul>

                                {/* ── Market Opportunity ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>II. The AMERO X Opportunity & Sizing</h2>
                                <p>AMERO X targets the intersection of the $2.2T crypto economy and the $6Q global derivatives and P2P settlement markets.</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                                    <div style={{ padding: '25px', border: '1px solid #d4af37', borderRadius: '12px', textAlign: 'center', background: 'rgba(212, 175, 55, 0.03)' }}>
                                        <h3 style={{ color: '#d4af37', margin: '0', fontSize: '28px' }}>$1.2T</h3>
                                        <p style={{ fontSize: '13px', margin: '10px 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Annual DEX Volume TAM</p>
                                    </div>
                                    <div style={{ padding: '25px', border: '1px solid #d4af37', borderRadius: '12px', textAlign: 'center', background: 'rgba(212, 175, 55, 0.03)' }}>
                                        <h3 style={{ color: '#d4af37', margin: '0', fontSize: '28px' }}>$400B+</h3>
                                        <p style={{ fontSize: '13px', margin: '10px 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Addressable P2P Remittance</p>
                                    </div>
                                    <div style={{ padding: '25px', border: '1px solid #d4af37', borderRadius: '12px', textAlign: 'center', background: 'rgba(212, 175, 55, 0.03)' }}>
                                        <h3 style={{ color: '#d4af37', margin: '0', fontSize: '28px' }}>150M+</h3>
                                        <p style={{ fontSize: '13px', margin: '10px 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Institutional Users (2027E)</p>
                                    </div>
                                </div>

                                {/* ── Ecosystem Alpha ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>III. The Enterprise Alpha: Why AMERO X Wins</h2>
                                <p>AMERO X is the first protocol to deliver a unified "Institutional Suite" that functions with the simplicity of modern fintech:</p>
                                <ul>
                                    <li><strong>Unified Liquidity:</strong> Cross-protocol routing for maximum capital efficiency.</li>
                                    <li><strong>Institutional P2P:</strong> Trustless, programmable escrow for secure global settlement.</li>
                                    <li><strong>Capital Sovereignty:</strong> 100% non-custodial MPC wallets (Social Login supported).</li>
                                </ul>

                                {/* ── Architecture ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>IV. High-Frequency Protocol primitives</h2>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '12px', border: '1px solid #333' }}>
                                    <p style={{ margin: '0' }}>1. <strong>Deterministic AMM Pools:</strong> Instant swaps with mathematical pricing.</p>
                                    <p style={{ margin: '10px 0 0' }}>2. <strong>Hybrid Limit Order Engine:</strong> Gas-free signing with on-chain finality.</p>
                                    <p style={{ margin: '10px 0 0' }}>3. <strong>Derivative Perps:</strong> 50x leverage on-chain with low-latency feeds.</p>
                                    <p style={{ margin: '10px 0 0' }}>4. <strong>Vault Copy Trading:</strong> Non-custodial mirroring of elite alpha.</p>
                                </div>

                                {/* ── Tokenomics ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>V. Strategic Tokenomics (AMX)</h2>
                                <p>AMX is engineered as a scarcity-driven engine with integrated Real Yield mechanics.</p>
                                <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', background: '#111' }}>
                                    <p style={{ margin: '0' }}><strong>Ticker:</strong> AMX</p>
                                    <p style={{ margin: '5px 0' }}><strong>Total Supply:</strong> 1,000,000,000 (Fixed)</p>
                                    <p style={{ margin: '5px 0' }}><strong>Utility:</strong> 30% USDC Fee-Share, Governance, 50% Discounts, Buy-Back & Burn.</p>
                                </div>

                                {/* ── Revenue Model ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>VI. Diversified Protocol Revenue Streams</h2>
                                <ul>
                                    <li><strong>Exchange Ops:</strong> 0.25% fee on high-frequency swap activity.</li>
                                    <li><strong>Escrow Ops:</strong> 1.0% recurring fee on institutional P2P volume.</li>
                                    <li><strong>Risk Ops:</strong> Liquidation premiums and dynamic funding from derivatives.</li>
                                    <li><strong>Strategy Ops:</strong> 10% performance fee on replicated vault strategies.</li>
                                </ul>

                                {/* ── Roadmap ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>VII. Strategic Roadmap to Dominance</h2>
                                <div style={{ borderLeft: '3px solid #d4af37', paddingLeft: '20px', marginTop: '20px' }}>
                                    <div style={{ marginBottom: '25px' }}>
                                        <h3 style={{ color: '#d4af37', margin: '0', fontSize: '18px' }}>Q3 2025: Protocol Genesis</h3>
                                        <p style={{ fontSize: '14px', margin: '5px 0 0' }}>Liquidity Pools, Bridge Integration, and AMX Launch.</p>
                                    </div>
                                    <div style={{ marginBottom: '25px' }}>
                                        <h3 style={{ color: '#d4af37', margin: '0', fontSize: '18px' }}>Q1 2026: Expansion Era</h3>
                                        <p style={{ fontSize: '14px', margin: '5px 0 0' }}>Perpetual Futures and Institutional P2P Settlement Engine.</p>
                                    </div>
                                    <div style={{ marginBottom: '25px' }}>
                                        <h3 style={{ color: '#d4af37', margin: '0', fontSize: '18px' }}>Q3 2026: Maturity & DAO</h3>
                                        <p style={{ fontSize: '14px', margin: '5px 0 0' }}>Full Decentralization, Staker Yield Activations, and Copy V1.</p>
                                    </div>
                                </div>

                                {/* ── Team ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>VIII. Leadership & Ecosystem Integrity</h2>
                                <p>Led by veterans of global financial infrastructure and tier-1 silicon valley hubs.</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '20px', marginTop: '25px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ width: '70px', height: '70px', background: '#333', borderRadius: '50%', margin: '0 auto 15px', border: '1px solid #d4af37' }}></div>
                                        <h4 style={{ margin: '0', fontSize: '15px' }}>AX Alpha</h4>
                                        <p style={{ fontSize: '11px', color: '#ccc' }}>CEO / Architecture</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ width: '70px', height: '70px', background: '#333', borderRadius: '50%', margin: '0 auto 15px', border: '1px solid #d4af37' }}></div>
                                        <h4 style={{ margin: '0', fontSize: '15px' }}>AX Beta</h4>
                                        <p style={{ fontSize: '11px', color: '#ccc' }}>CTO / Zero-Knowledge</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ width: '70px', height: '70px', background: '#333', borderRadius: '50%', margin: '0 auto 15px', border: '1px solid #d4af37' }}></div>
                                        <h4 style={{ margin: '0', fontSize: '15px' }}>AX Gamma</h4>
                                        <p style={{ fontSize: '11px', color: '#ccc' }}>Head of Strategy</p>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #333' }}>
                                    <p style={{ color: '#d4af37', fontSize: '19px', fontWeight: 'bold' }}>Pioneering Decentralized Financial Integrity. AMERO X.</p>
                                </div>

                                {/* ── Technical Glossary ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>IX. Technical Glossary</h2>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: '#fff' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid #d4af37' }}>
                                                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#d4af37' }}>Term</th>
                                                <th style={{ padding: '12px 10px', textAlign: 'left', color: '#d4af37' }}>Definition</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td style={{ padding: '12px 10px' }}><strong>AMM</strong></td>
                                                <td style={{ padding: '12px 10px' }}>Automated Market Maker; a protocol using smart contracts to provide liquidity and algorithmic pricing.</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td style={{ padding: '12px 10px' }}><strong>Collateralization</strong></td>
                                                <td style={{ padding: '12px 10px' }}>The pledging of assets (typically USDC) to secure leveraged positions or protocol loans.</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid #333' }}>
                                                <td style={{ padding: '12px 10px' }}><strong>Gas Finality</strong></td>
                                                <td style={{ padding: '12px 10px' }}>The cost of transaction validation on the native blockchain network.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

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

export default Presentation;
