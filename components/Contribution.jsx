import React, { useContext } from "react";
import Link from "next/link";

//INTERNAL IMPORT
import { CONTEXT } from "../context/index";

const Contribution = () => {
  const { address, connect } = useContext(CONTEXT);

  return (
    <section id="contribution" className="contribution-area pt-130 pb-130">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="contribution-title">
              <h2 className="title">
                <span>$0</span> Contribution Received
              </h2>
            </div>
            <div className="progress-wrap">
              <ul className="list-wrap">
                <li>Pre-Sale</li>
                <li>Soft Cap</li>
                <li>Bonus</li>
              </ul>
              <div
                className="progress"
                role="progressbar"
                aria-label="Amero X Protocol Contribution Progress"
                aria-valuenow="65"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar" style={{ width: "18%" }}></div>
              </div>
              <h6 className="progress-title">
                18% target raised <span>1 AMX = 1 USDC = 1 USD</span>
              </h6>
            </div>
            <div className="contribution-btn">
              {address ? (
                <Link href="/airdrop" className="btn">
                  Participate in Protocol
                </Link>
              ) : (
                <button onClick={() => connect()} className="btn">
                  Connect to Participate
                </button>
              )}
              <Link href="/whitepaper" className="btn btn-two">
                Institutional Whitepaper
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="contribution-shape-wrap">
        <img
          src="assets/img/images/contribution_shape01.png"
          alt=""
          className="alltuchtopdown"
        />
        <img
          src="assets/img/images/contribution_shape02.png"
          alt=""
          className="leftToRight"
        />
      </div>
    </section>
  );
};

export default Contribution;
