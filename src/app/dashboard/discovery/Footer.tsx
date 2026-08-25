'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(3, 1, 7, 0.9)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '60px 0 40px',
      color: 'var(--text-secondary)',
      textAlign: 'left'
    }}>
      <div className="container">
        
        {/* Footer Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          
          {/* Column 1: School District Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.4))' }}>🏫</span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '1rem',
                  color: '#fff',
                  letterSpacing: '0.05em',
                  lineHeight: '1.2'
                }}>
                  MOSAIC EDUCATION PLATFORM
                </strong>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--primary-light)',
                  fontStyle: 'italic',
                  marginTop: '2px'
                }}>
                  School Intelligence & STEM Hub
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', lineHeight: '1.5', maxWidth: '300px', color: 'var(--text-secondary)' }}>
              Providing quality education through active student agency, inquiry-led exploration, and intelligent curriculum alignment.
            </p>
          </div>

          {/* Column 2: Coordinator Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{
              color: '#fff',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              paddingBottom: '6px'
            }}>
              Platform Coordinator
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
              <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Semiha G Yildiz</strong>
              <span style={{ color: 'var(--secondary-light)', fontWeight: 600, fontSize: '0.8rem' }}>
                PhD Candidate - STEM Education
              </span>
            </div>
          </div>

          {/* Column 3: Contact & Address details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{
              color: '#fff',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              paddingBottom: '6px'
            }}>
              Contact Info
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', padding: 0, margin: 0 }}>
              <li>📞 <strong>Phone:</strong> (919) 650 2270</li>
              <li>✉️ <strong>Email:</strong> info@mosaicedu.app</li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span>&copy; {new Date().getFullYear()} Mosaic Education. All Rights Reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Learning Intelligence</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
