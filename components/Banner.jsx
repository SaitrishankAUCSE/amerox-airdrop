import React from "react";

const Banner = ({ title, type, action, path, transparent }) => {
  return (
    <section
      className="breadcrumb-area breadcrumb-bg transparent-banner"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-content">
              <h2 className="title">{title}</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href={path || "/"}>{type}</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {action}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-shape-wrap">
        <img
          src="assets/img/images/breadcrumb_shape01.png"
          alt=""
          className="alltuchtopdown"
        />
        <img
          src="assets/img/images/breadcrumb_shape02.png"
          alt=""
          className="rotateme"
        />
      </div>
    </section>
  );
};

export default Banner;
