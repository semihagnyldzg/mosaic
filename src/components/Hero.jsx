import React from 'react';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '120px',
      paddingBottom: '80px',
      overflow: 'hidden'
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: -1
      }}></div>
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: -1
      }}></div>

      <div className="container hero-grid" style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '48px',
        alignItems: 'center'
      }}>
        
        {/* Left Side: Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left' }}>
          <div style={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
            <span style={{
              background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15))',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '9999px',
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--secondary-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)'
            }}>
              ⚡ Welcome to the Future of Science
            </span>
          </div>

          <h1 style={{ lineHeight: '1.05', margin: 0 }}>
            Curiosity <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Redefined.</span>
          </h1>

          <p style={{ fontSize: '1.15rem', maxWidth: '580px', margin: 0 }}>
            Enter a hands-on digital sandbox of scientific wonder. Conduct virtual experiments, book live STEAM camps, and explore physical exhibits designed to spark lifelong questions.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <button 
              onClick={() => scrollToSection('virtual-lab')} 
              className="btn btn-primary"
              style={{ padding: '14px 32px', fontSize: '1.05rem' }}
            >
              Launch Virtual Lab 🧪
            </button>
            <button 
              onClick={() => scrollToSection('exhibits')} 
              className="btn btn-secondary"
              style={{ padding: '14px 32px', fontSize: '1.05rem' }}
            >
              Explore Exhibits 🌌
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px'
          }}>
            {[
              { val: '12+', lbl: 'Active Exhibits' },
              { val: '3', lbl: 'Virtual Sandboxes' },
              { val: '15K+', lbl: 'Curious Minds' }
            ].map((stat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: idx === 1 ? 'var(--secondary)' : 'var(--text-primary)'
                }}>{stat.val}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{stat.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Animated Atom Graphic */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          height: '400px'
        }}>
          {/* Orbital rings */}
          <div className="atom-container animate-float" style={{
            width: '320px',
            height: '320px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Nucleus */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent) 20%, var(--primary) 100%)',
              boxShadow: '0 0 35px var(--primary), 0 0 15px var(--accent)',
              zIndex: 5,
              position: 'relative'
            }}>
              {/* Pulsing glow */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                right: '-10px',
                bottom: '-10px',
                borderRadius: '50%',
                border: '2px dashed var(--secondary-light)',
                opacity: 0.4,
                animation: 'spin 15s linear infinite'
              }}></div>
            </div>

            {/* Orbit 1 */}
            <div className="orbit" style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: '50%',
              transform: 'rotateX(75deg) rotateY(15deg)',
              animation: 'spin 8s linear infinite'
            }}>
              <div className="electron" style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '12px',
                height: '12px',
                background: 'var(--secondary)',
                borderRadius: '50%',
                boxShadow: '0 0 15px var(--secondary)'
              }}></div>
            </div>

            {/* Orbit 2 */}
            <div className="orbit" style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '50%',
              transform: 'rotateX(75deg) rotateY(-15deg)',
              animation: 'spin 12s linear infinite'
            }}>
              <div className="electron" style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '12px',
                height: '12px',
                background: 'var(--accent)',
                borderRadius: '50%',
                boxShadow: '0 0 15px var(--accent)'
              }}></div>
            </div>

            {/* Orbit 3 */}
            <div className="orbit" style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '1px solid rgba(236, 72, 153, 0.2)',
              borderRadius: '50%',
              transform: 'rotateX(25deg) rotateY(75deg)',
              animation: 'spin 10s linear infinite'
            }}>
              <div className="electron" style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '12px',
                height: '12px',
                background: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 15px #fff'
              }}></div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .orbit {
          transform-style: preserve-3d;
        }
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
      `}</style>
    </section>
  );
}
