import React from "react";

const Hero = () => {
  return (
    <section
      className="banner-area banner-bg luxury-hero"
    >
      <div className="hero-glow-layer"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="banner-content text-center reveal">
              <h2 className="title">
                AMERO X: The Institutional Standard <br />
                <span>for Decentralized Capital</span>
              </h2>
              <p>
                A high-performance hybrid liquidity hub engineered for absolute sovereignty,
                <br />
                institutional-grade P2P settlement, and real-yield derivatives.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="banner-scroll-down">
        <a href="#contribution" className="section-link">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div className="banner-shape-wrap">
        {/* AMERO Floating Coins */}
        <img src="assets/img/banner/coin1.png" alt="" className="coin-shape coin-1 animate-float" />
        <img src="assets/img/banner/coin2.png" alt="" className="coin-shape coin-2 animate-float" />
        <img src="assets/img/banner/coin3.png" alt="" className="coin-shape coin-3 animate-float" />
        <img src="assets/img/banner/coin4.png" alt="" className="coin-shape coin-4 animate-float" />
      </div>
    </section>
  );
};

export default Hero;
