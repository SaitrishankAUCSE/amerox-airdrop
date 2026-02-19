import React from "react";
import { BsFillSendFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div
        class="footer-area footer-bg"
      >
        <div class="container">
          <div class="footer-top">
            <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                <div class="footer-widget">
                  <h4 class="fw-title">Useful Links</h4>
                  <div class="footer-link">
                    <ul class="list-wrap">
                      <li><a href="#contact">Contact us</a></li>
                      <li><a href="#features">How it Works</a></li>
                      <li><a href="/airdrop">Create</a></li>
                      <li><a href="#contribution">Explore</a></li>
                      <li><a href="/token-sale-terms">Terms & Services</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                <div class="footer-widget">
                  <h4 class="fw-title">SOLUTIONS</h4>
                  <div class="footer-link">
                    <ul class="list-wrap">
                      <li><a href="#contribution">Token Suit</a></li>
                      <li><a href="#features">Eco-system</a></li>
                      <li><a href="#chart">Investment</a></li>
                      <li><a href="/airdrop">Portal</a></li>
                      <li><a href="#roadmap">Tokenization</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                <div class="footer-widget">
                  <h4 class="fw-title">Useful Links</h4>
                  <div class="footer-link">
                    <ul class="list-wrap">
                      <li><a href="#faq">Help Center</a></li>
                      <li><a href="#features">Partners</a></li>
                      <li><a href="#contact">Suggestions</a></li>
                      <li><a href="#roadmap">Blog</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="row">
              <div class="col-lg-12">
                <div class="copyright-text">
                  <p>Copyright © 2026 AMERO X. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-shape-wrap">
          <img
            src="assets/img/images/footer_shape01.png"
            alt=""
            class="alltuchtopdown"
          />
          <img
            src="assets/img/images/footer_shape02.png"
            alt=""
            class="leftToRight"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
