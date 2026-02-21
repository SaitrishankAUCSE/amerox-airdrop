import React from "react";

const FeatureTwo = () => {
  const features = [
    {
      title: "Lifetime free and transaction",
      image: "features_two_img01.png",
    },
    {
      title: "Security & Control over money",
      image: "features_two_img02.png",
    },
    {
      title: "Mobile Payment Make Easy",
      image: "features_two_img03.png",
    },
  ];
  return (
    <section
      className="features-area-two features-bg"
      data-background="assets/img/bg/features_bg.png"
    >
      <div className="container">
        <div className="features-inner-wrap">
          <div className="features-item-wrap">
            <div className="row justify-content-center">
              {features.map((feature, index) => (
                <div key={index + 5} className="col-lg-4 col-md-6">
                  <div className="features-item-two">
                    <div className="features-img-two">
                      <img src={`assets/img/images/${feature.image}`} alt="" />
                    </div>
                    <div className="features-content-two">
                      <h2 className="title">{feature.title}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title section-title-two text-center">
                <h2 className="title">
                  The World's 1st AMERO X Platform That Offers Rewards
                  <img src="assets/img/images/title_img01.jpg" alt="" /> is a
                  groundbreaking platform that revolutionizes the way
                  <img src="assets/img/images/title_img02.jpg" alt="" />
                  Initial Coin Offerings are conducted
                </h2>
              </div>
            </div>
          </div>
          <div className="features-line-shape"></div>
        </div>
      </div>
      <div className="features-shape-wrap">
        <img
          src="assets/img/images/features_shape01.png"
          alt=""
          className="alltuchtopdown"
        />
        <img
          src="assets/img/images/features_shape02.png"
          alt=""
          className="leftToRight"
        />
      </div>
    </section>
  );
};

export default FeatureTwo;
