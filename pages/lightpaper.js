import React from 'react';
import Head from 'next/head';
import { Header, Footer, Banner } from "../components/index";

const Lightpaper = () => {
    return (
        <div className="document-page">
            <Head>
                <title>AMERO X - Lightpaper</title>
                <meta name="description" content="AMERO X Lightpaper – Ecosystem Brief, High-Performance Yield, and Hybrid Architecture" />
            </Head>
            <Header />
            <Banner
                title="Lightpaper"
                type="Home"
                action="Lightpaper"
                path="/"
            />
            <section className="document-page-area" style={{ padding: '100px 0', minHeight: '80vh', position: 'relative' }}>
                <div className="hero-glow-layer"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="document-content">
                                <h1 style={{ color: '#d4af37', marginBottom: '30px', textAlign: 'center' }}>AMERO X: Strategic Lightpaper & Ecosystem Brief</h1>

                                {/* ── Overview ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>I. Strategic Overview: Solving for Decentralized Sovereignty</h2>
                                <p>AMERO X is a high-performance decentralized financial architecture engineered to facilitate sophisticated operations with the agility of a consumer application. By integrating deep liquidity pools, cross-border P2P settlement, and leveraged derivatives into a single unified stack, AMERO X provides the critical infrastructure required for the institutional-grade on-chain economy.</p>

                                {/* ── Supported Assets ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>II. Asset Infrastructure & Liquidity Integrity</h2>
                                <ul>
                                    <li><strong>Wrapped Ethereum (WETH):</strong> The primary programmable vehicle for Ethereum-based value, optimized for cross-chain liquidity and professional trading within the AMERO X ecosystem.</li>
                                    <li><strong>USDC (Binance-Pegged):</strong> A high-integrity stablecoin providing 1:1 settlement exposure, serving as the protocol's primary collateral base and unit of account.</li>
                                </ul>

                                {/* ── Protocol Access Infrastructure ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>III. Protocol Access & Account Abstraction</h2>

                                <h3 style={{ color: '#d4af37', marginTop: '25px' }}>Seamless Onboarding via Secure MPC</h3>
                                <p>AMERO X eliminates the friction of traditional private key management through secure social authentication. Underpinned by Multi-Party Computation (MPC), the protocol ensuring full user self-custody with institutional-grade security and zero-click onboarding accessibility.</p>

                                <h3 style={{ color: '#d4af37', marginTop: '25px' }}>Deterministic Finality Layer</h3>
                                <p>All protocol interactions are settled on-chain with decentralized finality. The architecture is optimized for extreme gas efficiency, ensuring that complex state changes remain cost-effective even during periods of network congestion.</p>

                                {/* ── Core Ecosystem ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>IV. Protocol Ecosystem Primitives</h2>

                                <h3 style={{ color: '#d4af37', marginTop: '25px' }}>4.1 AMM Liquidity (Instant Finality)</h3>
                                <p>Facilitate instantaneous, 24/7 asset swaps via Automated Market Maker (AMM) technology. AMERO X ensures continuous liquidity and deterministic pricing through math-driven reserves.</p>

                                <h3 style={{ color: '#d4af37', marginTop: '25px' }}>4.2 Trustless P2P Settlement</h3>
                                <p>Programmable escrow logic secures the direct exchange of fiat and digital assets, effectively removing counterparty risk and enabling global institutional on/off-ramp capabilities.</p>

                                <h3 style={{ color: '#d4af37', marginTop: '25px' }}>4.3 Hybrid Order Matching</h3>
                                <p>AMERO X optimizes capital efficiency with a hybrid matching engine—intents are signed off-chain and settled on-chain only when execution targets are met.</p>

                                <h3 style={{ color: '#d4af37', marginTop: '25px' }}>4.4 Leveraged Derivatives (50x)</h3>
                                <p>Access sophisticated perps with up to 50x leverage, backed by high-fidelity price feeds and a robust liquidation engine to maintain systemic protocol solvency.</p>

                                {/* ── Why AMERO X Wins ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>V. Institutional Advantage: The AMERO X Alpha</h2>
                                <p>AMERO X is the first decentralized financial ecosystem to address the "Institutional Adoption Gap":</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                                    <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.02)' }}>
                                        <h4 style={{ color: '#d4af37', margin: '0 0 10px' }}>Absolute Sovereignty</h4>
                                        <p style={{ fontSize: '13px', color: '#ccc', margin: '0' }}>100% non-custodial logic ensuring market participants maintain cryptographic control of capital at all times.</p>
                                    </div>
                                    <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.02)' }}>
                                        <h4 style={{ color: '#d4af37', margin: '0 0 10px' }}>Zero-Friction Ops</h4>
                                        <p style={{ fontSize: '13px', color: '#ccc', margin: '0' }}>Proprietary Social Auth layer allowing institutional-grade security without the technical barriers of legacy Web3.</p>
                                    </div>
                                    <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.02)' }}>
                                        <h4 style={{ color: '#d4af37', margin: '0 0 10px' }}>Unified Liquidity Stack</h4>
                                        <p style={{ fontSize: '13px', color: '#ccc', margin: '0' }}>Instant access to Spot, Perps, P2P, and AI strategies with cross-margined capital efficiency.</p>
                                    </div>
                                </div>

                                {/* ── Token Utility ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>VI. AMX Token Ecosystem: The Real Yield Standard</h2>
                                <p>The AMX token is the fundamental engine of the AMERO X ecosystem, designed for systemic value accrual:</p>
                                <ul style={{ columnCount: 2, columnGap: '40px' }}>
                                    <li style={{ marginBottom: '10px' }}><strong>Governance:</strong> Institutional influence over protocol parameters and logic updates.</li>
                                    <li style={{ marginBottom: '10px' }}><strong>Real Yield:</strong> Direct distribution of 30% of protocol revenue in USDC for stakers.</li>
                                    <li style={{ marginBottom: '10px' }}><strong>Fee Compression:</strong> Dynamic discounts (up to 50%) across all protocol modules.</li>
                                    <li style={{ marginBottom: '10px' }}><strong>Buy-Back & Burn:</strong> Constant demand pressure via automated revenue-driven buy-backs.</li>
                                </ul>

                                {/* ── Roadmap Snapshot ── */}
                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>VII. Strategic Roadmap Snapshot</h2>
                                <div style={{ display: 'flex', gap: '20px', marginTop: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
                                    <div style={{ minWidth: '200px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
                                        <h4 style={{ color: '#d4af37', margin: '0' }}>Phase 1: Genesis</h4>
                                        <p style={{ fontSize: '12px', color: '#ccc' }}>AMM Genesis, Liquidity Provisioning, and AMX TGE.</p>
                                    </div>
                                    <div style={{ minWidth: '200px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
                                        <h4 style={{ color: '#d4af37', margin: '0' }}>Phase 2: Alpha Scale</h4>
                                        <p style={{ fontSize: '12px', color: '#ccc' }}>Perpetuals, Institutional P2P, and Global On-Ramp Launch.</p>
                                    </div>
                                    <div style={{ minWidth: '200px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
                                        <h4 style={{ color: '#d4af37', margin: '0' }}>Phase 3: Mature</h4>
                                        <p style={{ fontSize: '12px', color: '#ccc' }}>AMERO X DAO Transition and High-Performance Copy Engine.</p>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #333' }}>
                                    <p style={{ color: '#d4af37', fontSize: '18px' }}>Securing the Future of Global Decentralized Finance. AMERO X.</p>
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

export default Lightpaper;
