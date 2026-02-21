import React from "react";

const Chart = () => {
  return (
    <div id="chart" className="chart-area pt-140">
      <div className="container">
        <div className="chart-inner-wrap">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="chart-wrap">
                <div className="chart">
                  <canvas id="doughnutChart"></canvas>
                </div>
                <div className="chart-tab">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="token-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#token-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="token-tab-pane"
                        aria-selected="true"
                      >
                        Token Distribution
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="token-tab-pane"
                      role="tabpanel"
                      aria-labelledby="token-tab"
                      tabindex="0"
                    >
                      <div className="chart-list">
                        <ul className="list-wrap">
                          <li>Liquidity & Ecosystem Growth: 30%</li>
                          <li>Treasury / Strategic Reserve: 20%</li>
                          <li>Validators / Node Incentives: 10%</li>
                          <li>Community & Airdrops: 10%</li>
                          <li>Team & Founders (Vested): 15%</li>
                          <li>Investors (Private / Public): 15%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-side-content">
                <img src="assets/img/images/amerox_dark_coins.png" alt="" />
                <p>
                  AMERO X is a decentralized, open-source <br />
                  blockchain with smart contract capability.
                </p>
                <ul className="list-wrap">
                  <li>
                    <span>1</span>Symbol: AMX
                  </li>
                  <li>
                    <span>2</span>Initial Value : 1 USDC = 1 USD = 1 AMX
                  </li>
                  <li>
                    <span>3</span>Type : BEP 20 and AMX 20
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
