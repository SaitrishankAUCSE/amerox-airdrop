import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Header, Footer, Banner } from "../components/index";

const Partners = () => {
    const partnerCategories = [
        {
            title: "Technology & Infrastructure",
            description: "The foundational technology partners powering the AMERO X protocol",
            partners: [
                {
                    name: "BNB Smart Chain (BSC)",
                    role: "Core Settlement Layer",
                    description: "AMERO X is natively deployed on BNB Smart Chain, leveraging its high-throughput, low-cost infrastructure for institutional-grade settlement finality. BSC's EVM compatibility enables seamless interoperability with the broader Ethereum ecosystem while delivering 3-second block times and sub-cent transaction fees.",
                    highlight: true,
                },
                {
                    name: "Web3Modal & WalletConnect",
                    role: "Wallet Infrastructure",
                    description: "Seamless multi-wallet connectivity enabling users to interact with AMERO X through MetaMask, Trust Wallet, Coinbase Wallet, and 300+ compatible providers. Web3Modal ensures a unified connection experience across desktop and mobile platforms.",
                },
                {
                    name: "Ethers.js",
                    role: "Blockchain SDK",
                    description: "The industry-standard JavaScript library for Ethereum blockchain interaction. AMERO X leverages ethers.js v6 for all smart contract interactions, transaction signing, and on-chain data retrieval, ensuring robust and well-tested blockchain connectivity.",
                },
                {
                    name: "IPFS & Decentralized Storage",
                    role: "Data Integrity",
                    description: "Protocol documentation, governance records, and verification proofs are stored immutably across distributed networks. IPFS ensures that critical protocol data remains censorship-resistant and permanently accessible.",
                },
            ],
        },
        {
            title: "Security & Compliance",
            description: "Ensuring institutional-grade protection and regulatory alignment for all protocol participants",
            partners: [
                {
                    name: "Smart Contract Audit Partners",
                    role: "Protocol Security",
                    description: "AMERO X smart contracts undergo rigorous security audits by top-tier blockchain security firms including static analysis, formal verification, and manual code review. Our audit-first development philosophy ensures zero-vulnerability deployment across all protocol upgrades.",
                    highlight: true,
                },
                {
                    name: "On-Chain Monitoring Systems",
                    role: "Real-Time Surveillance",
                    description: "24/7 on-chain monitoring systems detect and flag anomalous transactions, unusual fund movements, and potential exploit attempts. Automated circuit breakers provide additional protection layers for protocol assets.",
                },
                {
                    name: "Firebase & Cloud Security",
                    role: "Off-Chain Data Protection",
                    description: "User contact information and form submissions are secured using Google Cloud's enterprise-grade Firebase infrastructure with encryption at rest and in transit, role-based access controls, and automated backup systems.",
                },
            ],
        },
        {
            title: "Ecosystem & Community",
            description: "Building the AMERO X ecosystem through strategic collaboration across global markets",
            partners: [
                {
                    name: "DEX Aggregator Networks",
                    role: "Liquidity Provision",
                    description: "Strategic partnerships with leading decentralized exchange aggregators to ensure deep liquidity, optimal price discovery, and minimal slippage for AMX traders. Multi-pool routing technology ensures the best execution prices across all connected venues.",
                    highlight: true,
                },
                {
                    name: "Community DAOs",
                    role: "Governance & Growth",
                    description: "Collaborating with decentralized autonomous organizations to drive community-led governance, facilitate proposal discussions, and coordinate ecosystem expansion initiatives. DAO partnerships ensure that protocol development aligns with community interests.",
                },
                {
                    name: "Institutional Advisory Network",
                    role: "Strategic Direction",
                    description: "Working with financial technology advisors, regulatory consultants, and institutional market makers to bridge traditional finance with the AMERO X protocol. Our advisory network provides strategic guidance on compliance, market structure, and institutional adoption.",
                },
                {
                    name: "Content & Education Partners",
                    role: "Knowledge Distribution",
                    description: "Partnering with blockchain education platforms, crypto media outlets, and research institutions to produce high-quality educational content about DeFi, tokenomics, and the AMERO X ecosystem. Knowledge is the foundation of adoption.",
                },
            ],
        },
    ];

    const stats = [
        { label: "Technology Partners", value: "10+" },
        { label: "Security Audits", value: "Tier-1" },
        { label: "Supported Wallets", value: "300+" },
        { label: "Global Reach", value: "50+ Countries" },
    ];

    return (
        <div>
            <Head>
                <title>AMERO X - Partners</title>
                <meta name="description" content="Explore the strategic partnerships powering the AMERO X ecosystem — technology, security, and community collaborators building the future of decentralized finance." />
            </Head>
            <Header />
            <Banner title="Partners" type="Home" action="Partners" path="/" />

            <section style={{ padding: '100px 0', minHeight: '80vh', position: 'relative' }}>
                <div className="hero-glow-layer"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                                <h2 style={{ color: '#d4af37', marginBottom: '15px' }}>Strategic Partnerships</h2>
                                <p style={{ color: '#aaa', fontSize: '16px', maxWidth: '650px', margin: '0 auto', lineHeight: '1.7' }}>
                                    AMERO X is built on a foundation of world-class partnerships spanning technology infrastructure, security auditing, and ecosystem development. Together, we are building the institutional standard for decentralized capital.
                                </p>
                            </div>

                            {/* Stats Bar */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '30px',
                                flexWrap: 'wrap',
                                marginBottom: '60px',
                                padding: '25px 0',
                                borderTop: '1px solid rgba(212,175,55,0.1)',
                                borderBottom: '1px solid rgba(212,175,55,0.1)',
                            }}>
                                {stats.map((stat, i) => (
                                    <div key={i} style={{ textAlign: 'center', minWidth: '120px' }}>
                                        <div style={{ color: '#d4af37', fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{stat.value}</div>
                                        <div style={{ color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {partnerCategories.map((category, cIdx) => (
                                <div key={cIdx} style={{ marginBottom: '60px' }}>
                                    <div style={{ marginBottom: '30px' }}>
                                        <h3 style={{ color: '#d4af37', fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>{category.title}</h3>
                                        <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.6' }}>{category.description}</p>
                                    </div>

                                    <div className="row" style={{ rowGap: '20px' }}>
                                        {category.partners.map((partner, pIdx) => (
                                            <div key={pIdx} className={partner.highlight ? "col-lg-12" : "col-lg-4 col-md-6"}>
                                                <div style={{
                                                    background: partner.highlight ? 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(255,255,255,0.02) 100%)' : 'rgba(255,255,255,0.03)',
                                                    border: `1px solid rgba(212,175,55,${partner.highlight ? '0.2' : '0.1'})`,
                                                    borderRadius: '16px',
                                                    padding: partner.highlight ? '32px 30px' : '28px 22px',
                                                    height: '100%',
                                                    transition: 'border-color 0.3s, transform 0.3s',
                                                }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = `rgba(212,175,55,${partner.highlight ? '0.2' : '0.1'})`; e.currentTarget.style.transform = 'translateY(0)'; }}
                                                >
                                                    <span style={{
                                                        display: 'inline-block',
                                                        background: 'rgba(212,175,55,0.12)',
                                                        color: '#d4af37',
                                                        padding: '4px 12px',
                                                        borderRadius: '20px',
                                                        fontSize: '11px',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        marginBottom: '14px',
                                                    }}>{partner.role}</span>
                                                    <h4 style={{ color: '#fff', fontSize: partner.highlight ? '19px' : '16px', fontWeight: '700', marginBottom: '10px' }}>{partner.name}</h4>
                                                    <p style={{ color: '#999', fontSize: '13px', lineHeight: '1.7', margin: 0 }}>{partner.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Become a Partner CTA */}
                            <div style={{
                                background: 'rgba(212,175,55,0.06)',
                                border: '1px solid rgba(212,175,55,0.2)',
                                borderRadius: '16px',
                                padding: '45px 40px',
                                textAlign: 'center',
                                marginTop: '20px',
                                position: 'relative',
                                zIndex: 10
                            }}>
                                <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>Become a Partner</h3>
                                <p style={{ color: '#aaa', marginBottom: '10px', maxWidth: '550px', margin: '0 auto 10px' }}>
                                    Interested in partnering with AMERO X? We&apos;re always looking for visionary collaborators who share our mission of building the institutional standard for decentralized finance.
                                </p>
                                <p style={{ color: '#888', marginBottom: '25px', fontSize: '14px' }}>
                                    Whether you&apos;re a technology provider, security auditor, liquidity partner, or ecosystem builder — we&apos;d love to hear from you.
                                </p>
                                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <a href="/#contact" className="btn" style={{ fontSize: '14px' }}>Get In Touch</a>
                                    <a href="/whitepaper" className="btn btn-two" style={{ fontSize: '14px' }}>Read Whitepaper</a>
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

export default Partners;
