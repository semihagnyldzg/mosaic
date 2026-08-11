import React, { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(7, 3, 15, 0.85)' : 'rgba(7, 3, 15, 0.4)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: scrolled ? '12px 0' : '20px 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span style={{
            fontSize: '1.8rem',
            filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.6))'
          }}>🧪</span>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: '1.35rem',
            letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, #fff 0%, var(--secondary-light) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>DISCOVERY LAB</span>
        </div>

        {/* Learning Hub Header Badge */}
        <div style={{
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          color: 'var(--primary-light)',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          padding: '6px 16px',
          borderRadius: '20px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          STEM Portal
        </div>
      </div>
    </nav>
  );
}