import React, { useContext } from "react";
import Link from "next/link";

//INTERNAL IMPORT
import { CONTEXT } from "../context/index";

const Contribution = () => {
  const { address, connect } = useContext(CONTEXT);

  return (
    <section id="contribution" class="contribution-area pt-130 pb-130">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="contribution-title">
              <h2 class="title">
                <span>$0</span> Contribution Received
              </h2>
            </div>
            <div class="progress-wrap">
              <ul class="list-wrap">
                <li>Pre-Sale</li>
                <li>Soft Cap</li>
                <li>Bonus</li>
              </ul>
              <div
                class="progress"
                role="progressbar"
                aria-label="Amero X Protocol Contribution Progress"
                aria-valuenow="65"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div class="progress-bar" style={{ width: "18%" }}></div>
              </div>
              <h6 class="progress-title">
                18% target raised <span>1 AMX = 1 USDC = 1 USD</span>
              </h6>
            </div>
            <div class="contribution-btn">
              {address ? (
                <Link href="/airdrop" class="btn">
                  Participate in Protocol
                </Link>
              ) : (
                <button onClick={() => connect()} class="btn">
                  Connect to Participate
                </button>
              )}
              <Link href="/whitepaper" class="btn btn-two">
                Institutional Whitepaper
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div class="contribution-shape-wrap">
        <img
          src="assets/img/images/contribution_shape01.png"
          alt=""
          class="alltuchtopdown"
        />
        <img
          src="assets/img/images/contribution_shape02.png"
          alt=""
          class="leftToRight"
        />
      </div>
    </section>
  );
};

export default Contribution;
