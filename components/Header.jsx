import React, { useState, useContext } from "react";
import Link from "next/link";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import {
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialFacebook,
  TiSocialGithub,
} from "react-icons/ti";
import { FaDiscord } from "react-icons/fa";

//INTERNAL IMPORT
import { CONTEXT } from "../context/index";

const Header = () => {
  const { connect, address, loader } = useContext(CONTEXT);
  const [menuOpen, setMenuOpen] = useState(false);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const menus = [
    { name: "Home", path: "/" },
    { name: "Contribution", path: "#contribution" },
    { name: "Feature", path: "#feature" },
    { name: "AMX Chart", path: "#chart" },
    { name: "FAQ", path: "#faq" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <header id="header">
      <div id="sticky-header" className="menu-area transparent-header luxury-header">
        <div className="container custom-container">
          <div className="row">
            <div className="col-12">
              <div className="menu-wrap">
                <nav className="menu-nav">

                  <div className="logo brand-wrap">
                    <a href="/" className="brand-link">
                      <img src="/amerox-logo.png" alt="AMERO X" className="brand-logo" />
                      <span className="brand-text">AMERO X</span>
                    </a>
                  </div>

                  <div className="navbar-wrap d-none d-lg-flex">
                    <ul className="navigation luxury-nav">
                      {menus.map((menu, index) => (
                        <li
                          className={menu.name == "Home" ? "active" : ""}
                          key={index}
                        >
                          <a href={`${menu.path}`} className="section-link luxury-link">
                            {menu.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="header-action">
                    <ul className="list-wrap">
                      {address ? (
                        <li className="header-login luxury-cta">
                          <a href="/airdrop">
                            {loader ? "loading..." : " Airdrop"}
                            <MdOutlineGeneratingTokens />
                          </a>
                        </li>
                      ) : (
                        <li className="header-login luxury-cta">
                          <button onClick={() => connect()} className="connect-btn">
                            Connect
                            <MdOutlineGeneratingTokens />
                          </button>
                        </li>
                      )}

                      <li className="offcanvas-menu">
                        <a className="menu-tigger luxury-icon" onClick={() => setOffcanvasOpen(!offcanvasOpen)} style={{ cursor: 'pointer' }}>
                          <RiMenu3Line />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="mobile-nav-toggler luxury-icon">
                    <i className="fas ">
                      <RiMenu3Line />
                    </i>
                  </div>
                </nav>
              </div>

              {/* Mobile Menu */}
              <div className="mobile-menu">
                <nav className="menu-box glass-card">
                  <div className="close-btn luxury-icon">
                    <IoMdClose />
                  </div>
                  <div className="nav-logo brand-wrap">
                    <a href="/" className="brand-link">
                      <img src="/airdrop.png" alt="AMERO X" className="brand-logo" />
                      <span className="brand-text">AMERO X</span>
                    </a>
                  </div>

                  <div className="menu-outer">
                    <ul className="navigation">
                      {menus.map((menu, index) => (
                        <li
                          className={menu.name == "Home" ? "active" : ""}
                          key={menu.name}
                        >
                          <a href={`${menu.path}`} className="section-link">
                            {menu.name}
                          </a>
                        </li>
                      ))}

                      {address ? (
                        <li className="header-login">
                          <a href="/airdrop">Airdrop</a>
                        </li>
                      ) : (
                        <li className="header-login">
                          <button onClick={() => connect()}>Connect</button>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="social-links">
                    <ul className="clearfix list-wrap">
                      <li>
                        <a href="https://facebook.com/amerox" target="_blank" rel="noopener noreferrer">
                          <TiSocialFacebook />
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/amerox" target="_blank" rel="noopener noreferrer">
                          <i className="fab">
                            <TiSocialTwitter />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="https://linkedin.com/company/amerox" target="_blank" rel="noopener noreferrer">
                          <i className="fab">
                            <TiSocialLinkedin />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="https://youtube.com/@amerox" target="_blank" rel="noopener noreferrer">
                          <i className="fab">
                            <TiSocialYoutube />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/amerox" target="_blank" rel="noopener noreferrer">
                          <i className="fab">
                            <TiSocialGithub />
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <div className="menu-backdrop"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className={`extra-info glass-card ${offcanvasOpen ? 'active' : ''}`}>
        <div className="close-icon menu-close luxury-icon">
          <button onClick={() => setOffcanvasOpen(false)}>
            <i className="fas ">
              <IoMdClose />
            </i>
          </button>
        </div>

        <div className="logo-side mb-30 brand-wrap">
          <Link href="/" className="brand-link">
            <img src="/airdrop.png" alt="AMERO X" className="brand-logo" />
            <span className="brand-text">AMERO X</span>
          </Link>
        </div>

        <div className="side-info mb-30">
          <div className="contact-list mb-30">
            <h4>Office Address</h4>
            <p>
              71-75 Shelton Street, Convent Garden <br />
              London, United Kingdom
            </p>
          </div>

          <div className="contact-list mb-30">
            <h4>Phone Number</h4>
            <p>+447438677745</p>
          </div>

          <div className="contact-list mb-30">
            <h4>Email Address</h4>
            <p>support@amero.io</p>
            <p>contact@amero.io</p>
          </div>
        </div>

        <div className="social-icon-right mt-30">
          <a href="https://www.facebook.com/profile.php?id=61587374589698" target="_blank" rel="noopener noreferrer">
            <i className="fab">
              <TiSocialFacebook />
            </i>
          </a>

          <a href="https://x.com/AmeroXchain" target="_blank" rel="noopener noreferrer">
            <i className="fab">
              <TiSocialTwitter />
            </i>
          </a>

          <a href="https://discord.gg/AD4kkTMuJw" target="_blank" rel="noopener noreferrer">
            <i className="fab">
              <FaDiscord />
            </i>
          </a>

          <a href="https://youtube.com/example" target="_blank" rel="noopener noreferrer">
            <i className="fab">
              <TiSocialYoutube />
            </i>
          </a>
        </div>
      </div>

      <div className="offcanvas-overly"></div>
    </header>
  );
};

export default Header;
