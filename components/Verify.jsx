import React, { useState, useContext } from "react";
import { saveAs } from "file-saver";
import { BsLinkedin, BsTwitterX, BsInstagram, BsGlobe } from "react-icons/bs";
import { FaUser, FaCoins } from "react-icons/fa6";

import { MdMarkEmailRead } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { TwitterMomentShare } from "react-social-media-embed";

//INTERNAL IMPORT
import { Linkedin, Twitter, Instagram, Follow } from "./index";
import { CONTEXT } from "../context/index";
import { getXIdFromUrl, isValidLinkedInUrl } from "../Utils/index";

const Verify = () => {
  const handleImage = () => {
    let url = `airdrop-download.jpg`;
    saveAs(url, `AmeroX-Promotional-Image.jpg`);
  };

  const { claimAirdrop, notifyError, notifySuccess, address, connect, loader, claimStatus, allUers } =
    useContext(CONTEXT);

  const [user, setUser] = useState({
    name: "",
    twitterId: "",
    linkedInUrl: "",
    instagramUrl: "",
    email: "",
  });

  const [verifying, setVerifying] = useState(false);

  const handleFormFieldChange = (fieldName, e) => {
    let value = e.target.value;
    if (fieldName === "twitterId") {
      const id = getXIdFromUrl(value);
      if (id) value = id;
    }
    setUser({ ...user, [fieldName]: value });
  };

  const [verificationStatus, setVerificationStatus] = useState({
    twitter: null,
    linkedin: null,
    instagram: null,
  });

  const CALLING_AIRDROP = async () => {
    const { name, twitterId, linkedInUrl, instagramUrl, email } = user;

    console.log(user);

    if (!name || !linkedInUrl || !instagramUrl || !twitterId || !email) {
      return notifyError("Provide all details to claim airdrop");
    }

    // Basic format validation
    if (!/^\d+$/.test(twitterId)) {
      return notifyError("Invalid X Link (Must be a Post URL)");
    }

    const linkedInPattern = /linkedin\.com\/(feed\/update\/|posts\/|activity\/)/;
    if (!linkedInPattern.test(linkedInUrl)) {
      return notifyError("Invalid LinkedIn Post Link (Must be a specific post)");
    }

    const instagramPattern = /instagram\.com\/(p|reel|reels)\//;
    if (!instagramPattern.test(instagramUrl)) {
      return notifyError("Invalid Instagram Post Link (Must be a specific post)");
    }

    if (!email.includes("@") || !email.includes(".")) {
      return notifyError("Invalid Email Address");
    }

    if (email.toLowerCase() === "saitrishankb9@gmail.com") {
      return notifyError("Email already used for airdrop claim");
    }

    const emailExists = allUers.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return notifyError("Email already used for airdrop claim");
    }

    // New: Check for duplicate Post URLs (Anti-Fraud)
    const instagramExists = allUers.some(u =>
      u.instagramUrl &&
      u.instagramUrl.toLowerCase().trim() === instagramUrl.toLowerCase().trim()
    );
    if (instagramExists) {
      return notifyError("❌ Verification failed: This Instagram URL has already been used to claim an airdrop.");
    }

    const linkedinExists = allUers.some(u =>
      u.linkedInUrl &&
      u.linkedInUrl.toLowerCase().trim() === linkedInUrl.toLowerCase().trim()
    );
    if (linkedinExists) {
      return notifyError("❌ Verification failed: This LinkedIn URL has already been used to claim an airdrop.");
    }
    setVerifying(true);
    setVerificationStatus({ twitter: 'pending', linkedin: 'pending', instagram: 'pending' });
    notifySuccess("Verifying all posts... This may take a moment.");

    try {
      // Helper function for verification requests
      const verifyPost = async (url, endpoint) => {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
          });
          const data = await response.json();
          return data;
        } catch (err) {
          return { success: false, error: "Network/Server Error" };
        }
      };

      setVerificationStatus({ twitter: 'checking', linkedin: 'checking', instagram: 'checking' });

      // Run all verifications in parallel
      const [twitterData, linkedinData, instagramData] = await Promise.all([
        verifyPost(`https://twitter.com/i/status/${twitterId}`, '/api/verify-tweet'),
        verifyPost(linkedInUrl, '/api/verify-linkedin'),
        verifyPost(instagramUrl, '/api/verify-instagram')
      ]);

      const errors = [];

      // Check Twitter
      if (!twitterData.success) {
        setVerificationStatus(prev => ({ ...prev, twitter: 'failed' }));
        errors.push(`X Post: ${twitterData.error}`);
      } else {
        setVerificationStatus(prev => ({ ...prev, twitter: 'verified' }));
      }

      // Check LinkedIn
      if (!linkedinData.success) {
        setVerificationStatus(prev => ({ ...prev, linkedin: 'failed' }));
        errors.push(`LinkedIn Post: ${linkedinData.error}`);
      } else {
        setVerificationStatus(prev => ({ ...prev, linkedin: 'verified' }));
      }

      // Check Instagram
      if (!instagramData.success) {
        setVerificationStatus(prev => ({ ...prev, instagram: 'failed' }));
        errors.push(`Instagram Post: ${instagramData.error}`);
      } else {
        setVerificationStatus(prev => ({ ...prev, instagram: 'verified' }));
      }

      // Handle Errors
      console.log("Verification Errors:", errors);
      if (errors.length > 0) {
        setVerifying(false);
        // Display all errors in a single notification to ensure visibility
        const errorMsg = errors.join("\n\n");
        console.log("Notifying Error:", errorMsg);
        notifyError(errorMsg);
        return; // Stop here if any failed
      }

      // All verifications passed!
      setVerifying(false);
      notifySuccess("All Posts Verified Successfully! 🎉");

      await claimAirdrop(user);
    } catch (error) {
      setVerifying(false);
      console.error(error);
      notifyError(error.message || "Verification Failed");
    }
  };

  console.log(claimStatus);

  return (
    <section class="contact-area pt-140 pb-140">
      <div class="container">
        <div class="contact-info-wrap">
          <div class="row justify-content-center">
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <BsTwitterX />
                </div>
                <div class="content">
                  <h6 class="title">X </h6>
                  <Twitter
                    user={user}
                    handleClick={(e) => handleFormFieldChange("twitterId", e)}
                  />
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <BsLinkedin />
                </div>

                <div class="content">
                  <h6 class="title">Linkedin</h6>

                  <Linkedin
                    user={user}
                    handleClick={(e) => handleFormFieldChange("linkedInUrl", e)}
                  />
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <BsInstagram />
                </div>
                <div class="content">
                  <h6 class="title">Instagram</h6>

                  <Instagram
                    user={user}
                    handleClick={(e) =>
                      handleFormFieldChange("instagramUrl", e)
                    }
                  />
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <FaUser />
                </div>
                <div class="content">
                  <h6 class="title">Claim Airdrop Info</h6>
                  <Follow
                    name={"Name"}
                    handleClick={(e) => handleFormFieldChange("name", e)}
                  />
                  <Follow
                    name={"Email"}
                    handleClick={(e) => handleFormFieldChange("email", e)}
                  />

                  {address != "" && claimStatus == true ? (
                    <button class="btn margin-btn-new">
                      {loader ? "loading..." : "Already Claimed"}
                    </button>
                  ) : address != "" && claimStatus == false ? (
                    <button
                      onClick={() => CALLING_AIRDROP()}
                      class="btn margin-btn-new"
                    >
                      {loader || verifying ? "loading..." : "Claim  Airdrop"}
                    </button>
                  ) : (
                    <button
                      onClick={() => connect()}
                      class="btn margin-btn-new"
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === SCROLL DOWN INDICATOR === */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px 0 20px",
          gap: "8px",
          cursor: "pointer",
          opacity: 0.8,
        }}
          onClick={() => {
            document.querySelector('.contact-form-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <span style={{ color: "#d4af37", fontSize: "13px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>
            Scroll down for Post Details
          </span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", animation: "scrollBounce 2s ease-in-out infinite" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
              <path d="M7 10L12 15L17 10" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginTop: "-10px" }}>
              <path d="M7 10L12 15L17 10" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <style jsx>{`
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
        `}</style>

        <div class="contact-form-wrap">
          <div class="row g-0">
            <div class="col-57 order-0 order-lg-2">
              <div class="contact-form" style={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 215, 0, 0.2)" }}>
                <h4 class="title">Post Details</h4>
                <div id="contact-form">
                  {/* Step-by-step instructions */}
                  <div style={{ marginBottom: "15px", padding: "12px 15px", background: "rgba(212, 175, 55, 0.1)", borderRadius: "10px", border: "1px solid rgba(212, 175, 55, 0.3)" }}>
                    <h5 style={{ color: "#d4af37", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>📋 How to Complete Verification:</h5>
                    <ol style={{ color: "#fff", fontSize: "13px", paddingLeft: "18px", lineHeight: "1.7", marginBottom: "0" }}>
                      <li><strong>Download</strong> the promotional image below</li>
                      <li><strong>Copy</strong> the post description for each platform</li>
                      <li><strong>Post</strong> on Instagram, LinkedIn & X (Twitter)</li>
                      <li><strong>Paste</strong> your post URLs in the verification form</li>
                      <li><strong>Claim</strong> your airdrop!</li>
                    </ol>
                  </div>

                  {/* === SOCIAL MEDIA DESCRIPTIONS ROW === */}
                  <div className="social-media-grid">

                    {/* === INSTAGRAM === */}
                    <div style={{ padding: "12px", background: "rgba(131, 58, 180, 0.08)", borderRadius: "8px", border: "1px solid rgba(131, 58, 180, 0.25)", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <BsInstagram style={{ color: "#E1306C", fontSize: "14px" }} />
                          <span style={{ color: "#E1306C", fontWeight: "700", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Instagram</span>
                        </div>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText("🚀 The future of decentralized finance starts now.\nIntroducing AMX (Amero X) — a next-generation blockchain ecosystem built for speed, security, and real-world impact.\n\nThis isn't just another token.\nThis is infrastructure.\nThis is utility.\nThis is the evolution of Web3.\n\nBe early. Be part of something bigger.\n\n🔗 Airdrop is now live — complete the verification and claim your allocation.\n\n#AMX #AmeroX #Web3 #CryptoAirdrop #BlockchainTechnology #DeFi #CryptoCommunity #DigitalAssets #FutureOfFinance");
                              notifySuccess("Instagram description copied!");
                            }}
                            style={{ background: "linear-gradient(45deg, #833AB4, #FD1D1D, #F77737)", color: "#fff", border: "none", borderRadius: "4px", padding: "3px 8px", cursor: "pointer", fontSize: "10px", fontWeight: "bold" }}
                          >
                            Copy
                          </button>
                          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                            style={{ background: "linear-gradient(45deg, #833AB4, #FD1D1D, #F77737)", color: "#fff", border: "none", borderRadius: "4px", padding: "3px 8px", cursor: "pointer", fontSize: "10px", fontWeight: "bold", textDecoration: "none", display: "flex", alignItems: "center" }}
                          >
                            Open
                          </a>
                        </div>
                      </div>
                      <textarea
                        disabled
                        value={`🚀 The future of decentralized finance starts now.\nIntroducing AMX (Amero X) — a next-generation blockchain ecosystem built for speed, security, and real-world impact.\n\nThis isn't just another token.\nThis is infrastructure.\nThis is utility.\nThis is the evolution of Web3.\n\nBe early. Be part of something bigger.\n\n🔗 Airdrop is now live — complete the verification and claim your allocation.\n\n#AMX #AmeroX #Web3 #CryptoAirdrop #BlockchainTechnology #DeFi #CryptoCommunity #DigitalAssets #FutureOfFinance`}
                        style={{ flex: 1, minHeight: "120px", width: "100%", background: "rgba(0,0,0,0.25)", color: "#ccc", border: "1px solid rgba(131, 58, 180, 0.15)", borderRadius: "6px", padding: "8px", fontSize: "11px", lineHeight: "1.5", resize: "none" }}
                      />
                    </div>
                    {/* === LINKEDIN === */}
                    <div style={{ padding: "12px", background: "rgba(10, 102, 194, 0.08)", borderRadius: "8px", border: "1px solid rgba(10, 102, 194, 0.25)", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <BsLinkedin style={{ color: "#0A66C2", fontSize: "14px" }} />
                          <span style={{ color: "#0A66C2", fontWeight: "700", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>LinkedIn</span>
                        </div>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText("🚀 Excited to introduce AMX (Amero X) — a powerful step forward in decentralized finance.\n\nAMX is designed to deliver:\n• Scalable blockchain infrastructure\n• Real utility-driven tokenomics\n• Long-term ecosystem growth\n• Sustainable value creation\n\nWe're building more than a token — we're building an ecosystem.\n\n🔗 Early supporters can now participate in the official airdrop campaign.\n\n#AMX #AmeroX #BlockchainInnovation #DeFi #Web3 #CryptoStartup #FinTech");
                              notifySuccess("LinkedIn description copied!");
                            }}
                            style={{ background: "#0A66C2", color: "#fff", border: "none", borderRadius: "4px", padding: "3px 8px", cursor: "pointer", fontSize: "10px", fontWeight: "bold" }}
                          >
                            Copy
                          </button>
                          <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer"
                            style={{ background: "#0A66C2", color: "#fff", border: "none", borderRadius: "4px", padding: "3px 8px", cursor: "pointer", fontSize: "10px", fontWeight: "bold", textDecoration: "none", display: "flex", alignItems: "center" }}
                          >
                            Open
                          </a>
                        </div>
                      </div>
                      <textarea
                        disabled
                        value={`🚀 Excited to introduce AMX (Amero X) — a powerful step forward in decentralized finance.\n\nAMX is designed to deliver:\n• Scalable blockchain infrastructure\n• Real utility-driven tokenomics\n• Long-term ecosystem growth\n• Sustainable value creation\n\nWe're building more than a token — we're building an ecosystem.\n\n🔗 Early supporters can now participate in the official airdrop campaign.\n\n#AMX #AmeroX #BlockchainInnovation #DeFi #Web3 #CryptoStartup #FinTech`}
                        style={{ flex: 1, minHeight: "120px", width: "100%", background: "rgba(0,0,0,0.25)", color: "#ccc", border: "1px solid rgba(10, 102, 194, 0.15)", borderRadius: "6px", padding: "8px", fontSize: "11px", lineHeight: "1.5", resize: "none" }}
                      />
                    </div>
                    {/* === X (TWITTER) === */}
                    <div style={{ padding: "12px", background: "rgba(255, 255, 255, 0.04)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.12)", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <BsTwitterX style={{ color: "#fff", fontSize: "14px" }} />
                          <span style={{ color: "#fff", fontWeight: "700", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>X (Twitter)</span>
                        </div>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText("⚡ The next evolution of DeFi is here.\n\nMeet AMX 🪙\nScalable. Powerful. Built for the future.\n\n🔗 Airdrop Live — Don't miss early access.\nJoin the movement.\n\n#AMX #AmeroX #Crypto #Airdrop #Web3 #Blockchain");
                              notifySuccess("X (Twitter) description copied!");
                            }}
                            style={{ background: "#1a1a1a", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", padding: "3px 8px", cursor: "pointer", fontSize: "10px", fontWeight: "bold" }}
                          >
                            Copy
                          </button>
                          <a href="https://twitter.com/compose/tweet" target="_blank" rel="noopener noreferrer"
                            style={{ background: "#1a1a1a", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", padding: "3px 8px", cursor: "pointer", fontSize: "10px", fontWeight: "bold", textDecoration: "none", display: "flex", alignItems: "center" }}
                          >
                            Open
                          </a>
                        </div>
                      </div>
                      <textarea
                        disabled
                        value={`⚡ The next evolution of DeFi is here.\n\nMeet AMX 🪙\nScalable. Powerful. Built for the future.\n\n🔗 Airdrop Live — Don't miss early access.\nJoin the movement.\n\n#AMX #AmeroX #Crypto #Airdrop #Web3 #Blockchain`}
                        style={{ flex: 1, minHeight: "120px", width: "100%", background: "rgba(0,0,0,0.25)", color: "#ccc", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", padding: "8px", fontSize: "11px", lineHeight: "1.5", resize: "none" }}
                      />
                    </div>

                  </div>{/* end grid row */}
                  <button onClick={() => handleImage()} class="btn">
                    Download Image
                  </button>
                </div>
                <p class="ajax-response mb-0"></p>
              </div>
            </div>
            <div class="col-43">
              <div class="contact-map verify-logo-wrapper">
                <img src="airdrop.png" alt="AMERO X Airdrop" className="verify-big-logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verify;
