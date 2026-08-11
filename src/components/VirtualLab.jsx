import React, { useState, useEffect, useRef } from 'react';

export default function VirtualLab() {
  const [activeTab, setActiveTab] = useState('chem');
  const [obsLog, setObsLog] = useState('');
  const [logsList, setLogsList] = useState([]);

  // Load observations on mount
  useEffect(() => {
    const saved = localStorage.getItem('discovery_obs_logs');
    if (saved) {
      setLogsList(JSON.parse(saved));
    }
  }, []);

  const saveObservation = () => {
    if (!obsLog.trim()) return;
    const newLog = {
      id: Date.now(),
      text: obsLog,
      timestamp: new Date().toLocaleTimeString(),
      experiment: activeTab === 'chem' ? 'Chemistry' : activeTab === 'pendulum' ? 'Pendulum' : 'Refraction'
    };
    const updated = [newLog, ...logsList];
    setLogsList(updated);
    localStorage.setItem('discovery_obs_logs', JSON.stringify(updated));
    setObsLog('');
  };

  const clearLogs = () => {
    setLogsList([]);
    localStorage.removeItem('discovery_obs_logs');
  };

  /* --- Chemistry Mixer States & Logic --- */
  const [chemA, setChemA] = useState('acid');
  const [chemB, setChemB] = useState('base');
  const [reactionResult, setReactionResult] = useState(null);
  const [isMixing, setIsMixing] = useState(false);

  const mixChemicals = () => {
    setIsMixing(true);
    setReactionResult(null);
    setTimeout(() => {
      setIsMixing(false);
      if (chemA === 'acid' && chemB === 'base' || chemA === 'base' && chemB === 'acid') {
        setReactionResult({
          color: '#8b5cf6', // purple (neutralized)
          ph: '7.0',
          title: 'Neutralization Reaction',
          desc: 'HCl and NaOH reacted to form Water and salt (NaCl). Heat is released!'
        });
      } else if (chemA === 'indicator' && chemB === 'acid' || chemA === 'acid' && chemB === 'indicator') {
        setReactionResult({
          color: '#ec4899', // deep pink (acidic phenolphthalein)
          ph: '3.2',
          title: 'Acidic Indication',
          desc: 'The Phenolphthalein indicator turned bright magenta in the highly acidic solution.'
        });
      } else if (chemA === 'indicator' && chemB === 'base' || chemA === 'base' && chemB === 'indicator') {
        setReactionResult({
          color: '#06b6d4', // cyan-blue (basic indicator change)
          ph: '11.5',
          title: 'Alkaline Indicator Shift',
          desc: 'The basic indicator solution caused a dramatic pH shift to 11.5, turning the beaker cyan.'
        });
      } else {
        // Mixing same or neutral
        setReactionResult({
          color: '#cbd5e1', // greyish clear
          ph: '7.0',
          title: 'Dilution',
          desc: 'No chemical compound reaction occurred. The solution is diluted.'
        });
      }
    }, 1200);
  };

  /* --- Pendulum States & Logic --- */
  const [gravity, setGravity] = useState(9.8); // m/s^2
  const [length, setLength] = useState(1.5); // meters
  const [mass, setMass] = useState(0.5); // kg
  const [angle, setAngle] = useState(0);
  const requestRef = useRef();
  const timeRef = useRef(0);

  // Calculate Period T = 2pi * sqrt(L/g)
  const period = (2 * Math.PI * Math.sqrt(length / gravity)).toFixed(2);

  useEffect(() => {
    if (activeTab !== 'pendulum') {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = (_timestamp) => {
      timeRef.current += 0.016; // Simulate delta time
      const amplitude = 35; // max swing angle in degrees
      // angular frequency omega = sqrt(g / L)
      const omega = Math.sqrt(gravity / length);
      const currentAngle = amplitude * Math.cos(omega * timeRef.current);
      setAngle(currentAngle);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [activeTab, gravity, length]);

  /* --- Prism states --- */
  const [prismColor, setPrismColor] = useState('#ffffff');
  const [prismAngle, setPrismAngle] = useState(45); // degrees

  // Calculate Refraction paths based on color and angle
  const getRefractionPath = () => {
    // Basic math to skew the beam based on prismAngle
    const radians = (prismAngle * Math.PI) / 180;
    const deviation = (radians - 0.7) * 45; // Simulated refractive bending
    
    const beamY1 = 150;
    const prismX = 250;
    const prismY = 150 + Math.tan(radians - 0.78) * 40;
    const exitX = 350;
    const exitY = prismY + Math.tan(radians - 0.78 + 0.2) * 50;

    return {
      entry: `M 50 ${beamY1} L ${prismX} ${prismY}`,
      prism: `M ${prismX} ${prismY} L ${exitX} ${exitY}`,
      exit: `M ${exitX} ${exitY} L 550 ${exitY + deviation}`,
      spectrum: [
        { color: '#ef4444', dev: deviation + 15 },
        { color: '#f59e0b', dev: deviation + 10 },
        { color: '#10b981', dev: deviation + 5 },
        { color: '#06b6d4', dev: deviation },
        { color: '#8b5cf6', dev: deviation - 5 }
      ],
      exitX,
      exitY
    };
  };

  const prismPath = getRefractionPath();

  return (
    <section id="virtual-lab" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ marginBottom: '16px' }}>Interactive Virtual Science Sandbox</h2>
          <p style={{ maxWidth: '650px', margin: '0 auto' }}>
            Run live scientific simulations. Adjust variables in real-time, record observation data, and observe immediate outputs.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          alignItems: 'start'
        }} className="lab-layout-grid">
          
          {/* Sidebar Tabs & Log Book */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', padding: '0 8px 8px' }}>SELECT SIMULATOR</span>
              
              <button
                onClick={() => setActiveTab('chem')}
                className="btn"
                style={{
                  justifyContent: 'flex-start',
                  background: activeTab === 'chem' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  color: activeTab === 'chem' ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: activeTab === 'chem' ? 'var(--primary-light)' : 'transparent',
                  textAlign: 'left'
                }}
              >
                🧪 Chemistry Reaction Mixer
              </button>

              <button
                onClick={() => setActiveTab('pendulum')}
                className="btn"
                style={{
                  justifyContent: 'flex-start',
                  background: activeTab === 'pendulum' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  color: activeTab === 'pendulum' ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: activeTab === 'pendulum' ? 'var(--secondary)' : 'transparent',
                  textAlign: 'left'
                }}
              >
                ⏱️ Gravity Pendulum Sandbox
              </button>

              <button
                onClick={() => setActiveTab('prism')}
                className="btn"
                style={{
                  justifyContent: 'flex-start',
                  background: activeTab === 'prism' ? 'rgba(236, 72, 153, 0.15)' : 'transparent',
                  color: activeTab === 'prism' ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: activeTab === 'prism' ? 'var(--accent)' : 'transparent',
                  textAlign: 'left'
                }}
              >
                🌈 Prism Light Refractor
              </button>
            </div>

            {/* Observation Log Book */}
            <div className="glass-panel" style={{ padding: '24px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>📝 Observation Notepad</h3>
              <textarea
                value={obsLog}
                onChange={(e) => setObsLog(e.target.value)}
                placeholder="Type your experimental findings here..."
                style={{
                  width: '100%',
                  height: '80px',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  color: '#fff',
                  padding: '12px',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  resize: 'none',
                  outline: 'none',
                  marginBottom: '12px'
                }}
              />
              <button 
                onClick={saveObservation}
                className="btn btn-primary"
                style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
              >
                Save Log to Device
              </button>

              {/* Saved logs rendering */}
              {logsList.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Saved Observations ({logsList.length})</span>
                    <button onClick={clearLogs} style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: '0.75rem', cursor: 'pointer' }}>Clear</button>
                  </div>
                  <div className="custom-scroll" style={{ maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {logsList.map((log) => (
                      <div key={log.id} style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.04)',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        fontSize: '0.8rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--secondary-light)' }}>{log.experiment}</span>
                          <span>{log.timestamp}</span>
                        </div>
                        <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', margin: 0 }}>{log.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Viewport Screen */}
          <div className="glass-panel" style={{ padding: '32px', minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            {/* 1. CHEMISTRY TAB */}
            {activeTab === 'chem' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '220px', position: 'relative' }}>
                  
                  {/* Beaker A */}
                  <div style={{ position: 'relative', textAlign: 'center' }}>
                    <div style={{
                      width: '80px',
                      height: '110px',
                      border: '3px solid rgba(255,255,255,0.4)',
                      borderTop: 'none',
                      borderRadius: '0 0 12px 12px',
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: '60px',
                        background: chemA === 'acid' ? '#ef4444aa' : chemA === 'base' ? '#3b82f6aa' : '#ffffff22',
                        transition: 'all 0.3s ease'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '8px' }}>Beaker A</span>
                  </div>

                  {/* Pouring path stream */}
                  {isMixing && (
                    <div style={{
                      position: 'absolute',
                      bottom: '90px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '6px',
                      height: '80px',
                      background: 'linear-gradient(to bottom, #a78bfa, #8b5cf6)',
                      animation: 'pulse 0.2s infinite'
                    }}></div>
                  )}

                  {/* Beaker B */}
                  <div style={{ position: 'relative', textAlign: 'center' }}>
                    <div style={{
                      width: '80px',
                      height: '110px',
                      border: '3px solid rgba(255,255,255,0.4)',
                      borderTop: 'none',
                      borderRadius: '0 0 12px 12px',
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: '60px',
                        background: chemB === 'acid' ? '#ef4444aa' : chemB === 'base' ? '#3b82f6aa' : chemB === 'indicator' ? '#e2e8f0aa' : '#ffffff22',
                        transition: 'all 0.3s ease'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '8px' }}>Beaker B</span>
                  </div>

                  {/* Mixed Chamber */}
                  <div style={{ position: 'relative', textAlign: 'center' }}>
                    <div style={{
                      width: '120px',
                      height: '130px',
                      border: '4px solid rgba(255,255,255,0.6)',
                      borderTop: 'none',
                      borderRadius: '0 0 20px 20px',
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.03)',
                      boxShadow: reactionResult ? `0 0 30px ${reactionResult.color}22` : 'none'
                    }}>
                      {/* Mixed Liquid */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: isMixing ? '75px' : reactionResult ? '70px' : '0px',
                        background: isMixing ? '#a78bfa99' : reactionResult ? `${reactionResult.color}88` : 'transparent',
                        transition: 'height 1s ease, background 0.5s ease'
                      }}>
                        {/* Bubbles */}
                        {reactionResult && reactionResult.ph !== '7.0' && (
                          <div className="bubbles" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}></div>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', display: 'block', marginTop: '8px' }}>Reaction Vessel</span>
                  </div>

                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', textAlign: 'left' }}>Fill Beaker A</label>
                      <select value={chemA} onChange={(e) => setChemA(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px', borderRadius: '6px', outline: 'none' }}>
                        <option value="acid">Hydrochloric Acid (Acid)</option>
                        <option value="base">Sodium Hydroxide (Base)</option>
                        <option value="water">Distilled Water (Neutral)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px', textAlign: 'left' }}>Fill Beaker B</label>
                      <select value={chemB} onChange={(e) => setChemB(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px', borderRadius: '6px', outline: 'none' }}>
                        <option value="base">Sodium Hydroxide (Base)</option>
                        <option value="acid">Hydrochloric Acid (Acid)</option>
                        <option value="indicator">Phenolphthalein (Indicator)</option>
                      </select>
                    </div>
                  </div>

                  <button onClick={mixChemicals} className="btn btn-primary" style={{ width: '100%' }} disabled={isMixing}>
                    {isMixing ? 'Mixing Solutions...' : 'Pour & Mix Fluids 🧪'}
                  </button>

                  {/* Reaction Output Log */}
                  {reactionResult && (
                    <div style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderLeft: `4px solid ${reactionResult.color}`,
                      padding: '16px',
                      borderRadius: '4px',
                      textAlign: 'left'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <h4 style={{ color: '#fff', fontSize: '1rem', margin: 0 }}>{reactionResult.title}</h4>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: `${reactionResult.color}22`, color: reactionResult.color }}>pH: {reactionResult.ph}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{reactionResult.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. PENDULUM TAB */}
            {activeTab === 'pendulum' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flexGrow: 1 }}>
                
                {/* Pendulum simulation screen */}
                <div style={{
                  height: '240px',
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(0,0,0,0.15)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  {/* Stand */}
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '8px', background: '#475569', borderRadius: '4px' }}></div>
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '2px', height: '10px', background: '#64748b' }}></div>

                  {/* Swinging Arm */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transformOrigin: 'top center',
                    transform: `rotate(${angle}deg)`,
                    height: `${length * 90}px`, // Map L to pixels
                    width: '2px',
                    background: '#94a3b8',
                    transition: 'height 0.3s ease'
                  }}>
                    {/* Bob */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: `${20 + mass * 15}px`, // Map mass to bob width
                      height: `${20 + mass * 15}px`,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, var(--secondary-light), var(--secondary))',
                      boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
                    }}></div>
                  </div>
                </div>

                {/* Controls Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  
                  {/* Sliders */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        <span>String Length</span>
                        <span style={{ color: '#fff', fontWeight: 600 }}>{length} m</span>
                      </div>
                      <input type="range" min="0.8" max="2.2" step="0.1" value={length} onChange={(e) => setLength(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--secondary)' }} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        <span>Bob Mass</span>
                        <span style={{ color: '#fff', fontWeight: 600 }}>{mass} kg</span>
                      </div>
                      <input type="range" min="0.1" max="1.5" step="0.1" value={mass} onChange={(e) => setMass(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--secondary)' }} />
                    </div>
                  </div>

                  {/* Dropdown & Calculated Stats */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Gravity Field</label>
                      <select
                        value={gravity}
                        onChange={(e) => setGravity(parseFloat(e.target.value))}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px', borderRadius: '6px', outline: 'none' }}
                      >
                        <option value="9.8">Earth (9.8 m/s²)</option>
                        <option value="1.6">Moon (1.6 m/s²)</option>
                        <option value="24.8">Jupiter (24.8 m/s²)</option>
                      </select>
                    </div>

                    <div style={{
                      background: 'rgba(6, 182, 212, 0.05)',
                      border: '1px solid rgba(6, 182, 212, 0.15)',
                      padding: '12px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <span>Pendulum Period (T)</span>
                        <span style={{ color: 'var(--secondary-light)', fontWeight: 700 }}>{period} seconds</span>
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Formula: T = 2π√(L/g)</span>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* 3. PRISM TAB */}
            {activeTab === 'prism' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flexGrow: 1 }}>
                
                {/* SVG Prism Arena */}
                <div style={{
                  height: '240px',
                  background: 'rgba(0,0,0,0.25)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <svg width="100%" height="100%" viewBox="0 0 600 240">
                    {/* Triangular Prism */}
                    <polygon points="250,60 350,150 250,220" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    
                    {/* Beam Entry */}
                    <path d={prismPath.entry} stroke={prismColor} strokeWidth="3" fill="none" style={{ filter: `drop-shadow(0 0 8px ${prismColor})` }} />
                    
                    {/* Beam Inside Prism */}
                    <path d={prismPath.prism} stroke={prismColor} strokeWidth="2" fill="none" opacity="0.6" />

                    {/* Beam Exit / Refraction */}
                    {prismColor === '#ffffff' ? (
                      // White light splits into spectrum
                      prismPath.spectrum.map((spec, sIdx) => (
                        <path
                          key={sIdx}
                          d={`M ${prismPath.exitX} ${prismPath.exitY} L 550 ${prismPath.exitY + spec.dev}`}
                          stroke={spec.color}
                          strokeWidth="2"
                          fill="none"
                          style={{ filter: `drop-shadow(0 0 3px ${spec.color})` }}
                        />
                      ))
                    ) : (
                      // Monochromatic beam bends
                      <path d={prismPath.exit} stroke={prismColor} strokeWidth="3" fill="none" style={{ filter: `drop-shadow(0 0 8px ${prismColor})` }} />
                    )}

                    {/* Labels */}
                    <text x="70" y="130" fill="var(--text-muted)" fontSize="10" fontWeight="bold">LIGHT INLET</text>
                    <text x="440" y="110" fill="var(--text-muted)" fontSize="10" fontWeight="bold">REFRACTED OUTLET</text>
                  </svg>
                </div>

                {/* Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', textAlign: 'left' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Select Inlet Wave Color</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[
                        { hex: '#ffffff', label: 'White' },
                        { hex: '#ef4444', label: 'Red' },
                        { hex: '#10b981', label: 'Green' },
                        { hex: '#3b82f6', label: 'Blue' }
                      ].map((col) => (
                        <button
                          key={col.hex}
                          onClick={() => setPrismColor(col.hex)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: col.hex,
                            border: prismColor === col.hex ? '3px solid var(--accent)' : '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            outline: 'none',
                            transition: 'all 0.2s'
                          }}
                          title={col.label}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      <span>Prism Refraction Angle</span>
                      <span style={{ color: '#fff', fontWeight: 600 }}>{prismAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="60"
                      value={prismAngle}
                      onChange={(e) => setPrismAngle(parseInt(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent)' }}
                    />
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        .lab-layout-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 992px) {
          .lab-layout-grid {
            grid-template-columns: 0.8fr 1.2fr !important;
          }
        }
        @keyframes pulse {
          0% { opacity: 0.8; }
          50% { opacity: 0.4; }
          100% { opacity: 0.8; }
        }
        .bubbles {
          background-image: radial-gradient(circle, #fff 10%, transparent 11%);
          background-size: 15px 15px;
          animation: bubbleUp 2s linear infinite;
        }
        @keyframes bubbleUp {
          0% { background-position: 0 100px; opacity: 0; }
          50% { opacity: 0.6; }
          100% { background-position: 10px 0px; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
