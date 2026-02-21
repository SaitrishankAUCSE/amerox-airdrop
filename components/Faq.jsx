import React from "react";
import { FaArrowDown } from "react-icons/fa";

const Faq = () => {
  return (
    <section id="faq" className="faq-area">
      <div className="container">
        <div className="faq-inner-wrap">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center mb-70">
                <h2 className="title">Ask Quick Question</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="faq-wrap">
                <div className="accordion" id="accordionExample">

                  <div className="accordion-item active">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <span>What cryptocurrencies can I use to purchase?</span>
                        <span className="faq-arrow-icon">
                          <FaArrowDown />
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>
                          AMERO X is 100% web-based, meaning it can be
                          accessed from anywhere and there’s no software to
                          install on your computer.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <span>What is the AMERO X?</span>
                        <span className="faq-arrow-icon">
                          <FaArrowDown />
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>
                          AMERO X is a decentralized blockchain platform
                          designed for the next generation of digital finance and web3 applications.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <span>How can I connect API with my Current Site</span>
                        <span className="faq-arrow-icon">
                          <FaArrowDown />
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>
                          AMERO X provide simple and robust SDKs to integrate our payment
                          gateway and blockchain services into any web application.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        <span>What is the Payment Method</span>
                        <span className="faq-arrow-icon">
                          <FaArrowDown />
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>
                          We support a wide range of cryptocurrencies and traditional Stablecoins,
                          as well as AMX tokens for reduced transaction fees.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        <span>What makes AMERO X better than the rest?</span>
                        <span className="faq-arrow-icon">
                          <FaArrowDown />
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseFive"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>
                          AMERO X offers ultra-low fees, high transaction speeds, and a truly
                          decentralized ecosystem focused on community growth.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
