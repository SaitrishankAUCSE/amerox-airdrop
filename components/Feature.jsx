import React from "react";

const Feature = () => {
  const features = [
    {
      title: "Hybrid Order Matching Engine",
      description: "Low-latency off-chain signing with deterministic on-chain settlement for maximum capital efficiency.",
      image: "feature_coin_black.png",
    },
    {
      title: "Institutional P2P Escrow",
      description: "Programmable, multi-sig escrow logic for secure, 24/7 cross-border asset settlement.",
      image: "features_img02.png",
    },
    {
      title: (<>Sovereign <br /> Account Abstraction</>),
      description: "Institutional-grade security via Social MPC, ensuring absolute user self-custody with zero onboarding friction.",
      image: "features_img03.png",
    },
    {
      title: "Real Yield Implementation",
      description: "A systemic revenue-sharing pipeline distributing 30% of protocol fees in USDC directly to AMX stakers.",
      image: "features_img04.png",
    },
  ];
  return (
    <section id="feature" className="features-area pt-140 pb-110">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-title text-center mb-70">
              <h2 className="title">
                High-Performance Financial Architecture Designed for Global Scale
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {features.map((feature, index) => (
            <div key={index + 1} className="col-lg-6">
              <div className="features-item">
                <div className="features-content">
                  <h2 className="title">{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
                <div className="features-img">
                  <img src={`assets/img/images/${feature.image}`} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
