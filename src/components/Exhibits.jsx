import React, { useState } from 'react';

const EXHIBITS_DATA = [
  {
    id: 1,
    title: 'Cosmic Orbit Simulator',
    category: 'Space',
    badge: 'Virtual Lab',
    desc: 'Control planetary masses, adjust gravity fields, and run star system collapse simulations.',
    icon: '🪐',
    color: 'var(--primary)'
  },
  {
    id: 2,
    title: 'Subatomic Particle Accelerator',
    category: 'Physics',
    badge: 'Interactive',
    desc: 'Manipulate magnetic coils to accelerate protons, smashing them in a high-energy cloud chamber.',
    icon: '⚛️',
    color: 'var(--secondary)'
  },
  {
    id: 3,
    title: 'Bio-Dome Cellular Roster',
    category: 'Biology',
    badge: 'Hands-on',
    desc: 'Navigate microscopic networks. Zoom in on active cell divisions and map plant DNA structures.',
    icon: '🌱',
    color: '#10b981'
  },
  {
    id: 4,
    title: 'Molecular Synthesis Chamber',
    category: 'Chemistry',
    badge: 'Virtual Lab',
    desc: 'Drop chemical elements together, test pH values, and witness exothermic heat expansion curves.',
    icon: '🧪',
    color: 'var(--accent)'
  },
  {
    id: 5,
    title: 'Resonance Sound Plates',
    category: 'Physics',
    badge: 'Interactive',
    desc: 'Control sound frequency variables to create symmetrical Chladni sand shapes on vibrating sheets.',
    icon: '🔊',
    color: '#eab308'
  },
  {
    id: 6,
    title: 'Nebula Gas Cloud Creator',
    category: 'Space',
    badge: 'Creative',
    desc: 'Mix hydrogen, helium, and cosmic dust elements to paint custom neon stellar nurseries.',
    icon: '🌌',
    color: '#ec4899'
  }
];

export default function Exhibits() {
  const [filter, setFilter] = useState('All');

  const filteredExhibits = filter === 'All' 
    ? EXHIBITS_DATA 
    : EXHIBITS_DATA.filter(e => e.category === filter);

  return (
    <section id="exhibits" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ marginBottom: '16px' }}>Scientific Laboratories & Exhibits</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Browse our catalog of advanced laboratory spaces and physical exhibits. Filter by science vertical to map your journey.
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {['All', 'Physics', 'Chemistry', 'Space', 'Biology'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="btn"
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                background: filter === cat ? 'linear-gradient(135deg, var(--primary) 0%, #6366f1 100%)' : 'rgba(255, 255, 255, 0.04)',
                color: filter === cat ? '#fff' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: filter === cat ? 'transparent' : 'rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Exhibits Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredExhibits.map((exhibit) => (
            <div
              key={exhibit.id}
              className="glass-panel"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px'
              }}
            >
              {/* Corner accent glow */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '60px',
                height: '60px',
                background: `radial-gradient(circle at top right, ${exhibit.color}33 0%, transparent 70%)`,
                borderRadius: '0 20px 0 0'
              }}></div>

              {/* Icon / Emblem */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.8rem',
                marginBottom: '24px',
                boxShadow: `0 0 15px ${exhibit.color}15`
              }}>
                {exhibit.icon}
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: exhibit.color
                }}>{exhibit.category}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>•</span>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>{exhibit.badge}</span>
              </div>

              <h3 style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                marginBottom: '12px',
                color: '#fff'
              }}>{exhibit.title}</h3>

              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                marginBottom: '24px',
                flexGrow: 1
              }}>{exhibit.desc}</p>

              <button
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '0.85rem',
                  borderRadius: '8px',
                  fontWeight: 600
                }}
                onClick={() => {
                  const labSection = document.getElementById('virtual-lab');
                  if (labSection) {
                    labSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Access Simulation →
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
