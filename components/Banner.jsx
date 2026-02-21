import React from "react";

const Banner = ({ title, type, action, path, transparent }) => {
  return (
    <section
      className={`breadcrumb-area breadcrumb-bg ${transparent ? 'transparent-banner' : ''}`}
      style={{
        position: 'relative',
        padding: '120px 0 80px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,1) 100%)',
        borderBottom: '1px solid rgba(212,175,55,0.1)'
      }}
    >
      {/* Decorative Glow Elements */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-content" style={{ textAlign: 'center' }}>
              <h2 className="title animate-fade-in-up" style={{
                fontSize: '48px',
                color: '#d4af37',
                marginBottom: '10px',
                textShadow: '0 0 20px rgba(212,175,55,0.3)'
              }}>
                {title}
              </h2>
              <nav aria-label="breadcrumb">
                <div className="animate-fade-in-up delay-200" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'rgba(212,175,55,0.05)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '30px',
                  padding: '6px 16px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}>
                  <a href={path || "/"} style={{
                    color: '#aaa',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '12px',
                    fontWeight: '500',
                    transition: 'color 0.3s'
                  }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#aaa'}>
                    {type}
                  </a>

                  {/* Decorative Separator */}
                  <span style={{
                    margin: '0 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(212,175,55,0.4)' }}></span>
                    <span style={{ width: '16px', height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0) 100%)' }}></span>
                  </span>

                  <span style={{
                    color: '#d4af37',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textShadow: '0 0 10px rgba(212,175,55,0.4)'
                  }}>
                    {action}
                  </span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="breadcrumb-shape-wrap" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <img
          src="assets/img/images/breadcrumb_shape01.png"
          alt=""
          className="alltuchtopdown"
          style={{ position: 'absolute', top: '20%', left: '10%', opacity: 0.5 }}
        />
        <img
          src="assets/img/images/breadcrumb_shape02.png"
          alt=""
          className="rotateme"
          style={{ position: 'absolute', bottom: '10%', right: '15%', opacity: 0.5 }}
        />
      </div>
    </section>
  );
};

export default Banner;
