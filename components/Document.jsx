import React from "react";
import { saveAs } from "file-saver";

import toast from "react-hot-toast";
import Link from "next/link";

const Document = () => {
  //NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 4000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 4000 });



  const generatePDF = async (title, content, filename) => {
    // Dynamically import html2pdf.js to avoid server-side issues
    const html2pdf = (await import("html2pdf.js")).default;

    // Create a temporary container for PDF content
    const element = document.createElement("div");
    element.style.padding = "40px";
    element.style.background = "#000000";
    element.style.color = "#ffffff";
    element.style.fontFamily = "'Helvetica', 'Arial', sans-serif";
    element.style.lineHeight = "1.6";

    // Build the HTML content
    let htmlContent = `
      <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #d4af37; padding-bottom: 20px;">
        <h1 style="color: #d4af37; font-size: 28px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">${title}</h1>
      </div>
    `;

    content.forEach((section) => {
      if (section.heading) {
        htmlContent += `<h2 style="color: #d4af37; margin-top: 30px; margin-bottom: 15px; font-size: 20px; border-bottom: 1px solid #333; padding-bottom: 5px;">${section.heading}</h2>`;
      }
      if (section.text) {
        htmlContent += `<p style="margin-bottom: 15px; font-size: 13px; color: #ffffff; text-align: justify;">${section.text}</p>`;
      }
      if (section.list) {
        htmlContent += `<ul style="margin-bottom: 20px; padding-left: 20px; list-style-type: disc; color: #ffffff;">`;
        section.list.forEach((item) => {
          htmlContent += `<li style="margin-bottom: 8px; font-size: 13px;">${item}</li>`;
        });
        htmlContent += `</ul>`;
      }
      if (section.html) {
        htmlContent += `<div style="margin: 25px 0;">${section.html}</div>`;
      }
    });

    htmlContent += `
      <div style="text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #333; color: #d4af37; font-size: 12px; font-style: italic;">
        Amero DEX - Peer-to-Peer & Hybrid Exchange Documentation
      </div>
    `;

    element.innerHTML = htmlContent;
    document.body.appendChild(element); // Temporarily append to body for rendering

    const opt = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#000000' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
      notifyError("Failed to generate PDF");
    } finally {
      document.body.removeChild(element); // Clean up
    }
  };

  const whitepaperContent = [
    { heading: "I. Executive Overview: The Capital Fragmentation Gap", text: "AMERO X is a high-performance decentralized financial architecture engineered to facilitate sophisticated capital operations with the agility of a consumer application. By integrating deep liquidity pools, cross-border P2P settlement, and leveraged derivatives into a single unified stack, AMERO X provides the critical infrastructure required for the institutional-grade on-chain economy." },
    { heading: "II. Mission & Macro Narrative", text: "To establish the world's most accessible, transparent, and resilient decentralized financial hub. We empower users with absolute sovereignty over their assets, eliminating intermediary risk through trustless, smart-contract-driven infrastructure." },
    { heading: "III. Asset Infrastructure & Liquidity Integrity", text: "Amero prioritizes the highest-integrity assets to ensure stability and institutional-grade depth:", list: ["Wrapped Ethereum (WETH): The primary programmable vehicle for Ethereum-based value, optimized for cross-chain liquidity.", "USDC (Binance-Pegged): A high-integrity stablecoin providing 1:1 settlement exposure, serving as the protocol's primary collateral base."] },
    {
      heading: "IV. Protocol Architecture & Execution Engine", text: "Amerox employs a modular architecture designed for high throughput and horizontal scalability. The stack is partitioned into three functional layers:", html: `
      <div style="background: rgba(212, 175, 55, 0.05); padding: 20px; border-radius: 12px; border: 1px solid #333; text-align: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <div style="padding: 10px 20px; border: 1px solid #d4af37; border-radius: 8px; width: 220px; color: #fff;"><strong>User Interface Layer</strong><br/><span style="font-size: 10px; color: #ccc;">Social Auth / Secure MPC</span></div>
          <div style="font-size: 18px; color: #d4af37;">↓</div>
          <div style="padding: 10px 20px; border: 1px solid #d4af37; border-radius: 8px; width: 220px; color: #fff;"><strong>AMERO X Execution Engine</strong><br/><span style="font-size: 10px; color: #ccc;">Trustless Settlement / Escrow Logic</span></div>
          <div style="font-size: 18px; color: #d4af37;">↓</div>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <div style="padding: 8px 15px; border: 1px solid #d4af37; border-radius: 8px; font-size: 11px; color: #fff;">AMM Labs</div>
            <div style="padding: 8px 15px; border: 1px solid #d4af37; border-radius: 8px; font-size: 11px; color: #fff;">P2P Vault</div>
            <div style="padding: 8px 15px; border: 1px solid #d4af37; border-radius: 8px; font-size: 11px; color: #fff;">Perp Index</div>
          </div>
          <div style="font-size: 18px; color: #d4af37;">↓</div>
          <div style="padding: 10px 20px; border: 1px solid #d4af37; border-radius: 8px; width: 220px; background: rgba(212, 175, 55, 0.1); color: #fff;"><strong>On-Chain High Finality</strong><br/><span style="font-size: 10px; color: #ccc;">EVM Compatible Layer</span></div>
        </div>
      </div>` },
    {
      heading: "V. Advanced Token Economics (AMX): The Real Yield Standard", text: "The AMX token is the fundamental utility unit of the AMERO X ecosystem, featuring a fixed-supply model with integrated Real Yield mechanics.", html: `
      <div style="display: flex; gap: 20px; margin-top: 10px;">
        <div style="flex: 1; padding: 15px; border: 1px solid #333; border-radius: 8px; text-align: center;">
          <h4 style="color: #d4af37; margin: 0; font-size: 16px;">1,000,000,000</h4>
          <p style="font-size: 10px; color: #ccc; margin: 5px 0 0;">Total Fixed Supply</p>
        </div>
        <div style="flex: 1; padding: 15px; border: 1px solid #333; border-radius: 8px; text-align: center;">
          <h4 style="color: #d4af37; margin: 0; font-size: 16px;">30% USDC</h4>
          <p style="font-size: 10px; color: #ccc; margin: 5px 0 0;">Protocol Fee Share</p>
        </div>
      </div>` },
    { heading: "VI. Security & Trust Architecture", text: "Security is a continuous protocol imperative. We implement a transparency-first methodology where all reserves and liquidation health are queryable on-chain 24/7.", list: ["Audited Smart Contracts by Tier-1 Firms.", "Social Auth via Secure MPC for absolute sovereignty.", "Real-time On-Chain Proof-of-Execution."] },
    {
      heading: "VII. Competitive Landscape", html: `
      <table style="width: 100%; border-collapse: collapse; color: #fff; font-size: 12px;">
        <thead>
          <tr style="border-bottom: 2px solid #d4af37;">
            <th style="padding: 10px; text-align: left; color: #d4af37;">Feature</th>
            <th style="padding: 10px; text-align: left; color: #d4af37;">AMERO X Elite</th>
            <th style="padding: 10px; text-align: left; color: #d4af37;">Legacy CEX</th>
            <th style="padding: 10px; text-align: left; color: #d4af37;">Standard DEX</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px;">Custody Model</td><td style="color: #d4af37;">Non-Custodial</td><td>Internal</td><td>Non-Custodial</td></tr>
          <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px;">P2P Escrow</td><td style="color: #d4af37;">On-Chain</td><td>Centralized</td><td>N/A</td></tr>
          <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px;">Yield Source</td><td style="color: #d4af37;">Real Revenue (USDC)</td><td>Internal</td><td>Inflationary Ops</td></tr>
        </tbody>
      </table>` },
    { heading: "VIII. Security Rigor & Audit Framework", text: "Security is the cornerstone of institutional adoption. AMERO X employs a multi-layered audit framework, real-time monitoring, and a professional bug bounty program." }
  ];

  const lightpaperContent = [
    { heading: "I. Strategic Overview: Solving for Decentralized Sovereignty", text: "AMERO X is a high-performance decentralized financial architecture engineered to facilitate sophisticated operations with the agility of a consumer application. By integrating deep liquidity pools, cross-border P2P settlement, and leveraged derivatives into a single unified stack, AMERO X provides the critical infrastructure required for the institutional-grade on-chain economy." },
    {
      heading: "II. Asset Infrastructure & Liquidity Integrity", text: "AMERO X ensures stability through high-integrity assets:", list: [
        "Wrapped Ethereum (WETH): The primary programmable vehicle for Ethereum-based value.",
        "USDC (Binance-Pegged): A high-integrity stablecoin providing 1:1 settlement exposure."
      ]
    },
    { heading: "III. Protocol Access & Account Abstraction", text: "AMERO X eliminates the friction of traditional private key management through secure social authentication. Underpinned by Multi-Party Computation (MPC), the protocol ensuring full user self-custody with institutional-grade security." },
    {
      heading: "IV. Protocol Ecosystem Primitives", text: "Core modules include:", list: [
        "4.1 AMM Liquidity: Instant finality via math-driven pools.",
        "4.2 Trustless P2P Settlement: Programmable escrow for fiat-crypto exchange.",
        "4.4 Leveraged Derivatives: 50x leverage backed by high-fidelity feeds."
      ]
    },
    {
      heading: "V. Institutional Advantage: The AMERO X Alpha", text: "Strategic advantages for institutional participants:", html: `
      <div style="display: flex; gap: 15px; margin-top: 10px;">
        <div style="flex: 1; padding: 15px; border: 1px solid #333; border-radius: 8px; background: rgba(212, 175, 55, 0.05); text-align: center;">
          <strong style="color: #d4af37; font-size: 11px;">Absolute Sovereignty</strong><br/><span style="font-size: 9px; color: #ccc;">100% Non-Custodial</span>
        </div>
        <div style="flex: 1; padding: 15px; border: 1px solid #333; border-radius: 8px; background: rgba(212, 175, 55, 0.05); text-align: center;">
          <strong style="color: #d4af37; font-size: 11px;">Zero-Friction</strong><br/><span style="font-size: 9px; color: #ccc;">Social Onboarding</span>
        </div>
        <div style="flex: 1; padding: 15px; border: 1px solid #333; border-radius: 8px; background: rgba(212, 175, 55, 0.05); text-align: center;">
          <strong style="color: #d4af37; font-size: 11px;">Unified Stack</strong><br/><span style="font-size: 9px; color: #ccc;">Spot, Perps, P2P</span>
        </div>
      </div>`
    },
    { heading: "VI. AMX Token Ecosystem: The Real Yield Standard", text: "AMX token utility includes Governance, 30% USDC Real Yield, and 50% Fee Compression." },
    { heading: "VII. Strategic Roadmap Snapshot", text: "Phase 1: Genesis (TGE) | Phase 2: Scale (Perps/P2P) | Phase 3: Mature (DAO)." }
  ];

  const presentationContent = [
    { heading: "I. Market Analysis: The Capital Fragmentation Gap", text: "Despite the exponential growth of DeFi, professional capital remains sidelined by failures in liquidity depth, operational friction, and high-impact complexity." },
    {
      heading: "II. The Amero Opportunity & Sizing", text: "AMERO X targets the intersection of the $1.2B crypto economy and the global derivatives/P2P markets.", html: `
      <div style="display: flex; gap: 10px; margin-top: 10px; text-align: center;">
        <div style="flex: 1; padding: 15px; border: 1px solid #d4af37; border-radius: 8px; background: rgba(212, 175, 55, 0.03);">
          <h4 style="color: #d4af37; margin: 0; font-size: 18px;">$1.2T</h4>
          <p style="font-size: 8px; color: #ccc; margin: 5px 0 0;">ANNUAL DEX TAM</p>
        </div>
        <div style="flex: 1; padding: 15px; border: 1px solid #d4af37; border-radius: 8px; background: rgba(212, 175, 55, 0.03);">
          <h4 style="color: #d4af37; margin: 0; font-size: 18px;">150M+</h4>
          <p style="font-size: 8px; color: #ccc; margin: 5px 0 0;">INSTITUTIONAL USERS</p>
        </div>
      </div>`
    },
    { heading: "III. The Enterprise Alpha: Why AMERO X Wins", text: "AMERO X delivers a unified 'Institutional Suite' with absolute sovereignty, zero-friction ops, and a unified liquidity stack." },
    { heading: "IV. High-Frequency Protocol Primitives", list: ["Deterministic AMM Pools", "Hybrid Limit Order Engine", "50x Derivative Perps", "Vault Copy Trading"] },
    { heading: "V. Strategic Tokenomics (AMX)", text: "Ticker: AMX | Total Supply: 1,000,000,000 | 30% USDC Fee-Share | Governance | 50% Discounts | Buy-Back & Burn." },
    { heading: "VI. Diversified Protocol Revenue Streams", list: ["Exchange Fees (0.25%)", "Settlement Fees (1.0%)", "Risk Premiums & Funding", "Success Fees (10%)"] },
    { heading: "VII. Strategic Roadmap to Dominance", text: "Q3 2025: Genesis | Q1 2026: Expansion | Q3 2026: Maturity & DAO." }
  ];

  const termsContent = [
    { heading: "I. Strategic Preamble & Disclaimer", text: "These Terms govern the acquisition of AMERO X (AMX) tokens. AMX tokens are utility instruments for protocol access, governance, and fee compression. They do not represent equity or debt." },
    { heading: "II. Protocol Access & AMX Utility", list: ["Governance Rights", "Fee Compression (up to 50%)", "Real Yield (30% USDC share)"] },
    {
      heading: "III. Token Allocation & Institutional Vesting", text: "Governed by on-chain smart contracts with programmatic release schedules.", html: `
      <table style="width: 100%; border-collapse: collapse; color: #fff; font-size: 10px;">
        <tr style="border-bottom: 2px solid #d4af37;"><th style="padding: 8px; text-align: left;">Segment</th><th style="padding: 8px; text-align: left;">Schedule</th><th style="padding: 8px; text-align: left;">%</th></tr>
        <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px;">Public Sale</td><td>100% TGE</td><td>15%</td></tr>
        <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px;">Core/Partners</td><td>Cliff + Vesting</td><td>35%</td></tr>
        <tr style="border-bottom: 1px solid #333;"><td style="padding: 8px;">Liquidity/Treasury</td><td>Locked/Linear</td><td>50%</td></tr>
      </table>`
    },
    { heading: "IV. Global Compliance & Eligibility", text: "Restricted in US, China, and OFAC-sanctioned regions." },
    { heading: "V. Protocol Integrity & Security", text: "Subject to audits by tier-1 firms. Real-time on-chain transparency." }
  ];

  const handlePDF = () => {
    generatePDF("AMERO X: Institutional Protocol & Technical Whitepaper", whitepaperContent, "Amero_X_Whitepaper.pdf");
    setTimeout(() => generatePDF("AMERO X: Strategic Lightpaper & Ecosystem Brief", lightpaperContent, "Amero_X_Lightpaper.pdf"), 500);
    setTimeout(() => generatePDF("AMERO X: Institutional Investor Presentation", presentationContent, "Amero_X_Presentation.pdf"), 1000);
    setTimeout(() => generatePDF("AMERO X: Token Sale Terms & Protocol Access Disclosures", termsContent, "Amero_X_TokenSaleTerms.pdf"), 1500);
  };


  return (
    <section id="contact" className="document-area">
      <div className="container">
        <div className="document-inner-wrap">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center mb-60">
                <h2 className="title">Have Any Questions?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="document-form-wrap">
                <h4 className="title">Get In Touch Now</h4>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const formData = new FormData(form);
                  const data = {
                    name: formData.get("name"),
                    email: formData.get("email"),
                    message: formData.get("message"),
                  };

                  if (!data.name || !data.email || !data.message) {
                    return notifyError("Please fill in all fields");
                  }

                  const loadingToast = toast.loading("Sending message...");

                  try {
                    // Use Next.js API Route (Free & Local)
                    const API_URL = "/api/contact";

                    const response = await fetch(API_URL, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    });

                    const result = await response.json();

                    if (response.ok) {
                      toast.dismiss(loadingToast);
                      notifySuccess("Message sent successfully!");
                      form.reset();
                    } else {
                      toast.dismiss(loadingToast);
                      console.error("Submission Error:", result);
                      notifyError("Something went wrong. Please try again.");
                    }
                  } catch (error) {
                    toast.dismiss(loadingToast);
                    console.error("Submission Error:", error);
                    notifyError("Something went wrong. Please try again.");
                  }
                }}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-grp">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-grp">
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Enter you message....."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="document-wrap">
                <h4 className="title">Read Documents</h4>
                <ul className="list-wrap">
                  <li>
                    <Link href="/whitepaper" target="_blank" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="icon">
                        <img src="assets/img/documents/doc_whitepaper.png" alt="Whitepaper" style={{ width: '120px', height: 'auto' }} />
                      </span>
                      Whitepaper
                    </Link>
                  </li>
                  <li>
                    <Link href="/token-sale-terms" target="_blank" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="icon">
                        <img src="assets/img/documents/doc_terms.png" alt="Terms" style={{ width: '120px', height: 'auto' }} />
                      </span>
                      Token Sale Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/presentation" target="_blank" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="icon">
                        <img src="assets/img/documents/doc_presentation.png" alt="Presentation" style={{ width: '120px', height: 'auto' }} />
                      </span>
                      Presentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/lightpaper" target="_blank" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="icon">
                        <img src="assets/img/documents/doc_lightpaper.png" alt="Lightpaper" style={{ width: '120px', height: 'auto' }} />
                      </span>
                      Lightpaper
                    </Link>
                  </li>
                </ul>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                  <button onClick={() => handlePDF()} className="btn">
                    Download All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="document-shape">
        <img
          src="assets/img/images/document_shape.png"
          alt=""
          className="alltuchtopdown"
        />
      </div>
    </section>
  );
};
export default Document;
