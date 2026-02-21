import React from "react";

const Download = () => {
  return (
    <section className="download-area pt-130 pb-130">
      <div className="container">
        <div className="download-inner-wrap">
          <div className="row align-items-end">
            <div className="col-lg-6">
              <div className="download-content">
                <div className="section-title mb-40">
                  <h2 className="title">Control Application From Your Mobile</h2>
                </div>
                <div className="download-list">
                  <ul className="list-wrap">
                    <li>
                      <span>1</span>White Paper
                    </li>
                    <li>
                      <span>2</span>Privacy & Policy
                    </li>
                  </ul>
                </div>
                <div className="download-btn-wrap">
                  <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="download-btn">
                    <img src="assets/img/images/download_btn01.png" alt="Download on App Store" />
                  </a>
                  <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="download-btn">
                    <img src="assets/img/images/download_btn02.png" alt="Get it on Google Play" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="download-img">
                <img src="assets/img/images/download_img01.png" alt="" />
                <img src="assets/img/images/download_shape01.png" alt="" />
              </div>
            </div>
          </div>
          <div className="download-shape-wrap">
            <img src="assets/img/images/download_shape01.png" alt="" />
            <img src="assets/img/images/download_shape01.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
