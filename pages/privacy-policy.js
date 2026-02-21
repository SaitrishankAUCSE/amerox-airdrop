import React from 'react';
import Head from 'next/head';
import { Header, Footer, Banner } from "../components/index";

const PrivacyPolicy = () => {
    return (
        <div>
            <Head>
                <title>AMERO X - Privacy Policy</title>
                <meta name="description" content="AMERO X Privacy Policy — How we collect, use, and protect your data." />
            </Head>
            <Header />
            <Banner title="Privacy Policy" type="Home" action="Privacy Policy" path="/" />

            <section style={{ padding: '100px 0', minHeight: '80vh', position: 'relative' }}>
                <div className="hero-glow-layer"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="document-content">
                                <h1 style={{ color: '#d4af37', marginBottom: '30px', textAlign: 'center' }}>Privacy & Data Protection Policy</h1>
                                <p style={{ textAlign: 'center', color: '#888', marginBottom: '50px' }}>Last Updated: February 2026</p>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>1. Introduction</h2>
                                <p>AMERO X (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you interact with the AMERO X platform, website, and services.</p>
                                <p>By accessing or using our services, you consent to the practices described in this policy.</p>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>2. Information We Collect</h2>
                                <p>We collect the following categories of information:</p>
                                <ul>
                                    <li><strong>Wallet Address:</strong> Your public blockchain wallet address when you connect to the platform.</li>
                                    <li><strong>Contact Information:</strong> Name, email address, and messages submitted through the &ldquo;Get In Touch&rdquo; form.</li>
                                    <li><strong>Social Media Handles:</strong> Twitter, Instagram, and LinkedIn URLs submitted during airdrop verification.</li>
                                    <li><strong>Transaction Data:</strong> On-chain transaction records related to airdrop claims and token transfers.</li>
                                    <li><strong>Usage Data:</strong> Browser type, device information, IP address, and page interaction data collected automatically.</li>
                                </ul>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>3. How We Use Your Information</h2>
                                <p>Your information is used exclusively for the following purposes:</p>
                                <ul>
                                    <li>Processing airdrop claims and verifying social media participation</li>
                                    <li>Responding to contact form submissions and customer inquiries</li>
                                    <li>Improving platform performance, security, and user experience</li>
                                    <li>Ensuring compliance with applicable laws and regulations</li>
                                    <li>Preventing fraud, abuse, and unauthorized access</li>
                                </ul>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>4. Data Storage & Security</h2>
                                <p>All data collected through the platform is securely stored using industry-standard encryption and access controls. Contact form submissions are stored in our secured Firebase database. We implement technical and organizational measures to protect your data from unauthorized access, alteration, disclosure, or destruction.</p>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>5. Data Sharing & Disclosure</h2>
                                <p>AMERO X does <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:</p>
                                <ul>
                                    <li>When required by law, regulation, or legal process</li>
                                    <li>To protect the rights, property, or safety of AMERO X, our users, or the public</li>
                                    <li>With third-party service providers who assist in platform operations (e.g., email delivery), bound by strict confidentiality agreements</li>
                                </ul>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>6. Blockchain Data</h2>
                                <p>Please note that blockchain transactions are inherently public and immutable. Any transactions you initiate through the AMERO X protocol will be recorded on the public blockchain and cannot be deleted or modified by AMERO X.</p>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>7. Cookies & Tracking</h2>
                                <p>Our website may use essential cookies to maintain session state and improve functionality. We do not use third-party advertising trackers. You may configure your browser to reject cookies, though this may affect certain features of the platform.</p>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>8. Your Rights</h2>
                                <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
                                <ul>
                                    <li>Right to access the personal data we hold about you</li>
                                    <li>Right to request correction of inaccurate data</li>
                                    <li>Right to request deletion of your data (where technically feasible and legally permissible)</li>
                                    <li>Right to withdraw consent at any time</li>
                                </ul>
                                <p>To exercise any of these rights, please contact us at <strong>support@amero.io</strong>.</p>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>9. Children&apos;s Privacy</h2>
                                <p>AMERO X services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors.</p>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>10. Changes to This Policy</h2>
                                <p>We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>

                                <h2 style={{ color: '#d4af37', marginTop: '40px' }}>11. Contact Us</h2>
                                <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
                                <ul>
                                    <li><strong>Email:</strong> support@amero.io</li>
                                    <li><strong>Address:</strong> 71-75 Shelton Street, Covent Garden, London, United Kingdom</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
