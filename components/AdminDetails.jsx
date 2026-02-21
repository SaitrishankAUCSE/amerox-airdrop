import React from "react";
import { shortenAddress } from "../Utils/index";

const AdminDetails = ({ transactionDetails, setTransactionDetails }) => {
  return (
    <section id="contact" className="document-area">
      <div className="container">
        <div className="document-inner-wrap">
          <div className="row">
            <div className="col-lg-8">
              <div className="document-form-wrap">
                <h4 className="title">Transaction ID: {transactionDetails.id} </h4>
                <div>
                  <div className="row">
                    <div className="">
                      <div className="form-grp">
                        <input
                          disabled
                          placeholder={shortenAddress(
                            transactionDetails.useraddress
                          )}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="form-grp">
                        <input
                          disabled
                          placeholder={transactionDetails.email}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="form-grp">
                        <input disabled placeholder={transactionDetails.name} />
                      </div>
                    </div>
                    <div className="">
                      <div className="form-grp">
                        <input
                          disabled
                          placeholder={transactionDetails.timestamp}
                        />
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setTransactionDetails()} className="btn">
                    Close X
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDetails;
