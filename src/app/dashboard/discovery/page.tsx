'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';

export default function DiscoveryLabPage() {
  const { user, profile, signOut } = useAuth();
  const [platformOpen, setPlatformOpen] = useState(false);

  // Lab Sim Variables
  const [mass, setMass] = useState(50);
  const [friction, setFriction] = useState(30);
  const [angle, setAngle] = useState(15);

  // Journal Inputs
  const [hypothesis, setHypothesis] = useState('');
  const [observations, setObservations] = useState('');
  const [conclusion, setConclusion] = useState('');

  // Integration states
  const [portfolioSaved, setPortfolioSaved] = useState(false);
  const [plcShared, setPlcShared] = useState(false);

  // Compute mock velocity & acceleration based on mass, friction, angle
  const acceleration = Math.max(0, (9.8 * Math.sin((angle * Math.PI) / 180) - (friction / 100) * 9.8 * Math.cos((angle * Math.PI) / 180))).toFixed(2);
  const finalVelocity = Math.sqrt(2 * Number(acceleration) * 5).toFixed(2); // over 5 meters

  const handleSavePortfolio = () => {
    setPortfolioSaved(true);
    setTimeout(() => setPortfolioSaved(false), 3000);
  };

  const handleSharePlc = () => {
    setPlcShared(true);
    setTimeout(() => setPlcShared(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between font-sans selection:bg-[#5C2483] selection:text-white relative">
      
      {/* 1. OTUS STYLE TOP ANNOUNCEMENT BAR (#F3EEFF) */}
      <div className="bg-[#F3EEFF] text-[#5C2483] py-2.5 px-6 border-b border-[#E6DBFF] shadow-xs">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="text-sm font-bold flex items-center gap-2">
            <span>✨</span>
            <span>Welcome to mosaicedu.netlify.app | Discovery Lab Module</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href={
                    profile?.role === 'district_admin'
                      ? '/dashboard/district'
                      : profile?.role === 'principal'
                      ? '/dashboard/school'
                      : '/dashboard/teacher'
                  }
                  className="border-2 border-[#5C2483] hover:bg-[#5C2483] hover:text-white text-[#5C2483] font-black px-4 py-1 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer bg-transparent"
                >
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="border-2 border-[#5C2483] hover:bg-[#5C2483] hover:text-white text-[#5C2483] font-black px-4 py-1 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer bg-transparent"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="border-2 border-[#5C2483] hover:bg-[#5C2483] hover:text-white text-[#5C2483] font-black px-4 py-1 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer bg-transparent"
              >
                ➔ Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. OTUS MAIN HEADER NAVBAR */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#5C2483] flex items-center justify-center font-black text-white text-xl shadow-md">
              m
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#2D183B]">mosaic edu</span>
          </Link>

          <nav className="flex items-center gap-8 text-sm font-bold text-[#2D183B]">
            
            <div className="relative">
              <button
                onClick={() => setPlatformOpen(!platformOpen)}
                onMouseEnter={() => setPlatformOpen(true)}
                className="flex items-center gap-1.5 hover:text-[#5C2483] transition-colors cursor-pointer py-2"
              >
                <span>Platform</span>
                <span className="text-xs">▾</span>
              </button>

              {platformOpen && (
                <div 
                  onMouseLeave={() => setPlatformOpen(false)}
                  className="absolute top-full left-0 mt-1 w-80 bg-white border border-zinc-200 rounded-xl shadow-2xl p-3 grid grid-cols-1 gap-2 z-50 animate-in fade-in duration-150"
                >
                  <div className="text-[10px] font-bold text-[#5C2483] uppercase tracking-wider px-3 pt-2">
                    Mosaic Platform Modules
                  </div>

                  <Link
                    href="/dashboard/responsive"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50 transition-colors group"
                  >
                    <span className="text-xl">⚡</span>
                    <div>
                      <div className="font-bold text-[#2D183B] text-xs group-hover:text-[#5C2483]">Responsive Instruction</div>
                      <div className="text-[10px] text-zinc-500">5-step guided cycle, flexible groups & student paths</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/plc"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50 transition-colors group"
                  >
                    <span className="text-xl">📋</span>
                    <div>
                      <div className="font-bold text-[#2D183B] text-xs group-hover:text-[#5C2483]">PLC Meeting Tool</div>
                      <div className="text-[10px] text-zinc-500">NC standard alignment, evidence & report export</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/school"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50 transition-colors group"
                  >
                    <span className="text-xl">📊</span>
                    <div>
                      <div className="font-bold text-[#2D183B] text-xs group-hover:text-[#5C2483]">Student Skill Matrix</div>
                      <div className="text-[10px] text-zinc-500">Competency matrix & principal analytics</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/district"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50 transition-colors group"
                  >
                    <span className="text-xl">🏛️</span>
                    <div>
                      <div className="font-bold text-[#2D183B] text-xs group-hover:text-[#5C2483]">District Analytics</div>
                      <div className="text-[10px] text-zinc-500">District trends with privacy safeguards</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/discovery"
                    className="flex items-start gap-3 p-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors group"
                  >
                    <span className="text-xl">🧪</span>
                    <div>
                      <div className="font-bold text-[#5C2483] text-xs">Discovery Lab</div>
                      <div className="text-[10px] text-zinc-500">Interactive standard simulations & lab journals</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/dashboard/teacher" className="hover:text-[#5C2483] transition-colors">Solutions</Link>
            <Link href="/dashboard/responsive" className="hover:text-[#5C2483] transition-colors">Community</Link>
            <Link href="/dashboard/school" className="hover:text-[#5C2483] transition-colors">Resources</Link>
            <Link href="/dashboard/plc" className="hover:text-[#5C2483] transition-colors">About</Link>
          </nav>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Side: Simulation Controls & Visuals */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-purple-50/40 border border-purple-100 rounded-3xl p-6.5 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-black text-[#5C2483] uppercase tracking-wider">🔬 INQUIRY SIMULATION</span>
              <h2 className="text-2xl font-black text-[#2D183B] mt-1">Grade 3 Physical Science Sandbox</h2>
              <p className="text-xs text-zinc-500">Standard: <strong>NC.3.P.1.1</strong> - Infer changes in speed or direction when forces act on an object.</p>
            </div>

            {/* Simulated Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-zinc-700">
                  <span>Block Mass (kg)</span>
                  <span className="text-[#5C2483]">{mass} kg</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full h-1.5 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-zinc-700">
                  <span>Ramp Friction (%)</span>
                  <span className="text-[#5C2483]">{friction}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={friction}
                  onChange={(e) => setFriction(Number(e.target.value))}
                  className="w-full h-1.5 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-zinc-700">
                  <span>Ramp Angle (°)</span>
                  <span className="text-[#5C2483]">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-1.5 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Sim Visual Render Area */}
            <div className="h-48 bg-zinc-950 rounded-2xl relative overflow-hidden flex items-end justify-between p-6">
              {/* Sky and Slope */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-950 to-zinc-900"></div>

              {/* Ramped Surface */}
              <div 
                className="absolute left-0 bottom-0 bg-purple-900 origin-bottom-left transition-transform duration-300"
                style={{ 
                  width: '100%', 
                  height: '10px', 
                  transform: `rotate(${angle}deg)` 
                }}
              ></div>

              {/* Sliding Object */}
              <div 
                className="w-12 h-12 bg-[#5C2483] rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg absolute transition-all duration-500 ease-out"
                style={{
                  left: '10%',
                  bottom: '12px',
                  transform: `translate(${Math.min(100, Math.max(0, Number(finalVelocity) * 8))}px, -${Math.min(50, Math.max(0, Number(finalVelocity) * 4))}px) rotate(${angle}deg)`
                }}
              >
                {mass}kg
              </div>

              {/* Readouts overlay */}
              <div className="absolute top-4 right-4 bg-zinc-900/90 border border-white/10 rounded-xl p-3 text-[11px] font-mono text-zinc-300 space-y-1 z-10">
                <div>📐 Angle: {angle}°</div>
                <div>⚖️ Friction Coeff: {(friction/100).toFixed(2)}</div>
                <div>📈 Acceleration: {acceleration} m/s²</div>
                <div>🏁 Final Velocity: {finalVelocity} m/s</div>
              </div>
            </div>
          </div>

          {/* Student Inquiry Lab Report Journal */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6.5 space-y-5">
            <h3 className="text-lg font-black text-[#2D183B]">Student Lab Journal (CER Framework)</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Hypothesis Statement</label>
                <textarea
                  value={hypothesis}
                  onChange={(e) => setHypothesis(e.target.value)}
                  placeholder="If we increase the ramp angle, then the block's acceleration will..."
                  className="w-full h-16 bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm focus:border-[#5C2483] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Inquiry Observations</label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="I observed that at a 15-degree angle with 30% friction, the final velocity reached..."
                  className="w-full h-20 bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm focus:border-[#5C2483] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Conclusion (Claims, Evidence, Reasoning)</label>
                <textarea
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  placeholder="The evidence shows that increasing mass does not change gravitational acceleration, but..."
                  className="w-full h-20 bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm focus:border-[#5C2483] focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSavePortfolio}
                className="bg-[#5C2483] hover:bg-[#4A154B] text-white font-extrabold px-6 py-2.5 rounded-full text-xs transition-colors cursor-pointer"
              >
                {portfolioSaved ? '✅ Saved to Student Portfolio' : '💾 Save to Portfolio'}
              </button>
              <button
                onClick={handleSharePlc}
                className="border-2 border-[#5C2483] text-[#5C2483] hover:bg-purple-50 font-bold px-6 py-2.5 rounded-full text-xs transition-colors cursor-pointer"
              >
                {plcShared ? '✅ Shared with PLC Team' : '📋 Send to PLC Board'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Teacher Recommender & Decision Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Teacher Recommendation Card */}
          <div className="bg-[#FDFBFF] border-2 border-dashed border-purple-200 rounded-3xl p-6 space-y-4">
            <span className="text-xs font-black text-[#5C2483] uppercase tracking-wider">💡 DECISION MAKING</span>
            <h3 className="text-lg font-black text-[#2D183B]">What to do next?</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Based on the Inquiry Lab data, student understanding of forces is approaching proficiency. Recommended instructional path:
            </p>

            <div className="bg-white border border-purple-100 rounded-2xl p-4 space-y-3 shadow-xs">
              <span className="text-[#5C2483] font-bold text-xs uppercase tracking-wider block">Recommended Strategy</span>
              <h4 className="font-extrabold text-sm text-[#2D183B]">Ramp Angles (Visual Manipulatives)</h4>
              <p className="text-[11px] text-zinc-500">Have struggling students draw free-body diagrams of blocks at different slopes to bridge numeric readouts to conceptual models.</p>
              <Link
                href="/dashboard/responsive"
                className="text-xs text-[#5C2483] font-black hover:underline block pt-1"
              >
                Create Responsive Group A →
              </Link>
            </div>

            <div className="bg-white border border-purple-100 rounded-2xl p-4 space-y-3 shadow-xs">
              <span className="text-[#5C2483] font-bold text-xs uppercase tracking-wider block">Extension Challenge</span>
              <h4 className="font-extrabold text-sm text-[#2D183B]">Inquiry Frictionless Design</h4>
              <p className="text-[11px] text-zinc-500">Ask high-performing students to design a vehicle that maintains momentum across a level track with variable coefficients of friction.</p>
              <Link
                href="/dashboard/responsive"
                className="text-xs text-[#5C2483] font-black hover:underline block pt-1"
              >
                Assign Extension Path →
              </Link>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-zinc-200 py-8 px-6 text-xs text-zinc-500 font-medium w-full">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© 2026 Mosaic Edu Inc. All rights reserved.</div>
          <div className="flex gap-6 font-bold">
            <a href="#privacy" className="hover:text-[#5C2483]">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#5C2483]">Terms of Service</a>
            <a href="#security" className="hover:text-[#5C2483]">Security</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
