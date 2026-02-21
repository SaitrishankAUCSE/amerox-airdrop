import React from "react";
import { BsFillSendFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div
        className="footer-area footer-bg"
      >
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                <div className="footer-widget">
                  <h4 className="fw-title">Useful Links</h4>
                  <div className="footer-link">
                    <ul className="list-wrap">
                      <li><a href="/#contact">Contact us</a></li>
                      <li><a href="/#feature">How it Works</a></li>
                      <li><a href="/airdrop">Create</a></li>
                      <li><a href="/#contribution">Explore</a></li>
                      <li><a href="/token-sale-terms">Terms & Services</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                <div className="footer-widget">
                  <h4 className="fw-title">SOLUTIONS</h4>
                  <div className="footer-link">
                    <ul className="list-wrap">
                      <li><a href="/whitepaper">Token Suit</a></li>
                      <li><a href="/lightpaper">Eco-system</a></li>
                      <li><a href="/#chart">Investment</a></li>
                      <li><a href="/airdrop">Portal</a></li>
                      <li><a href="/whitepaper">Tokenization</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                <div className="footer-widget">
                  <h4 className="fw-title">Useful Links</h4>
                  <div className="footer-link">
                    <ul className="list-wrap">
                      <li><a href="/help-center">Help Center</a></li>
                      <li><a href="/partners">Partners</a></li>
                      <li><a href="/suggestions">Suggestions</a></li>
                      <li><a href="/blog">Blog</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright-text">
                  <p>Copyright © 2026 AMERO X. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-shape-wrap">
          <img
            src="assets/img/images/footer_shape01.png"
            alt=""
            className="alltuchtopdown"
          />
          <img
            src="assets/img/images/footer_shape02.png"
            alt=""
            className="leftToRight"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
