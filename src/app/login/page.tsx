'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [platformOpen, setPlatformOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(true); // Open by default for /login route
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo form states
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoSchool, setDemoSchool] = useState('');
  const [demoRole, setDemoRole] = useState('Teacher');
  const [demoDate, setDemoDate] = useState('');
  const [demoSent, setDemoSent] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSchool, setContactSchool] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.trim() !== 'mosaic') {
      setError('Incorrect password.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'semihagnyldz@gmail.com',
        password: '123',
      });

      if (signInError) throw signInError;

      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .single();

      if (roleError) throw roleError;

      const role = roleData.role;
      if (role === 'district_admin') {
        router.push('/dashboard/district');
      } else if (role === 'principal') {
        router.push('/dashboard/school');
      } else if (role === 'teacher') {
        router.push('/dashboard/discovery');
      } else {
        router.push('/dashboard/discovery');
      }
    } catch (err: any) {
      console.error(err);
      setError('Access restricted: Invalid credentials or session error.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    handleLogin(undefined, demoEmail, demoPass);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName || !demoEmail) return;
    setDemoSent(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setContactSent(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactSchool('');
      setContactMsg('');
    }, 3000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col justify-between font-sans selection:bg-[#5C2483] selection:text-white relative scroll-smooth">
      
      {/* 1. OTUS TOP ANNOUNCEMENT BAR (#F3EEFF) */}
      <div className="bg-[#F3EEFF] text-[#5C2483] py-3 px-6 border-b border-[#E6DBFF] shadow-xs">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="text-sm sm:text-base font-bold flex items-center gap-2">
            <span>✨</span>
            <span>Discover North Carolina Standards-Aligned Responsive Instruction with Mosaic AI</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="border-2 border-[#5C2483] hover:bg-[#5C2483] hover:text-white text-[#5C2483] font-black px-5 py-2 rounded-full text-sm transition-all flex items-center gap-2 cursor-pointer bg-transparent shadow-xs"
            >
              <span>📅</span>
              <span>Book a Demo</span>
            </button>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="border-2 border-[#5C2483] hover:bg-[#5C2483] hover:text-white text-[#5C2483] font-black px-5 py-2 rounded-full text-sm transition-all flex items-center gap-2 cursor-pointer bg-transparent shadow-xs"
            >
              <span>➔</span>
              <span>Log In</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. OTUS MAIN HEADER NAVBAR (#FFFFFF) */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40 shadow-xs backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 py-4.5 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5C2483] flex items-center justify-center font-black text-white text-2xl shadow-md shadow-[#5C2483]/30">
              m
            </div>
            <span className="font-black text-3xl tracking-tight text-[#2D183B]">mosaic edu</span>
          </Link>

          <nav className="flex items-center gap-9 text-base font-extrabold text-[#2D183B]">
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
                  className="absolute top-full left-0 mt-1 w-88 bg-white border border-zinc-200 rounded-2xl shadow-2xl p-4 grid grid-cols-1 gap-2.5 z-50 animate-in fade-in duration-150"
                >
                  <div className="text-xs font-black text-[#5C2483] uppercase tracking-wider px-3 pt-2">
                    Mosaic Platform Modules
                  </div>

                  <Link
                    href="/dashboard/responsive"
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
                  >
                    <span className="text-2xl">⚡</span>
                    <div>
                      <div className="font-extrabold text-[#2D183B] text-sm group-hover:text-[#5C2483]">Responsive Instruction</div>
                      <div className="text-xs text-zinc-500">5-step guided cycle, flexible groups & student paths</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/plc"
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
                  >
                    <span className="text-2xl">📋</span>
                    <div>
                      <div className="font-extrabold text-[#2D183B] text-sm group-hover:text-[#5C2483]">PLC Meeting Tool</div>
                      <div className="text-xs text-zinc-500">NC standard alignment, evidence & report export</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/school"
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
                  >
                    <span className="text-2xl">📊</span>
                    <div>
                      <div className="font-extrabold text-[#2D183B] text-sm group-hover:text-[#5C2483]">Student Skill Matrix</div>
                      <div className="text-xs text-zinc-500">Competency matrix & principal analytics</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/district"
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
                  >
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <div className="font-extrabold text-[#2D183B] text-sm group-hover:text-[#5C2483]">District Analytics</div>
                      <div className="text-xs text-zinc-500">District trends with privacy safeguards</div>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/discovery"
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
                  >
                    <span className="text-2xl">🧪</span>
                    <div>
                      <div className="font-extrabold text-[#2D183B] text-sm group-hover:text-[#5C2483]">Discovery Lab</div>
                      <div className="text-xs text-zinc-500">Interactive standard simulations & lab journals</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <button onClick={() => scrollTo('platform')} className="hover:text-[#5C2483] transition-colors cursor-pointer">Solutions</button>
            <button onClick={() => scrollTo('resources')} className="hover:text-[#5C2483] transition-colors cursor-pointer">Community</button>
            <button onClick={() => scrollTo('resources')} className="hover:text-[#5C2483] transition-colors cursor-pointer">Resources</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-[#5C2483] transition-colors cursor-pointer">About</button>
          </nav>

        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#F9F5FF] via-white to-purple-50/40 py-28 px-6 relative overflow-hidden border-b border-purple-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-9 space-y-7 text-left">
            <div className="inline-flex items-center gap-2.5 bg-[#F3EEFF] border border-[#E6DBFF] text-[#5C2483] px-4 py-2 rounded-full text-sm font-extrabold">
              <span className="text-base">🚀</span>
              <span>All-In-One K-12 Learning Suite</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.12] text-[#2D183B] max-w-4xl">
              Every Learning Tool. <br />
              <span className="text-[#5C2483]">One Connected Platform.</span>
            </h1>

            <p className="text-zinc-700 text-lg sm:text-xl max-w-3xl leading-relaxed font-semibold">
              Mosaic gathers evidence-driven assessment data, research-backed instructional strategies, and PLC collaboration into one unified workspace for North Carolina educators.
            </p>

            <div className="pt-3 flex items-center gap-5">
              <button
                onClick={() => setDemoModalOpen(true)}
                className="bg-[#5C2483] hover:bg-[#4A154B] text-white font-black px-9 py-4 rounded-full text-base transition-all shadow-xl shadow-[#5C2483]/30 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Schedule a Demo</span>
                <span className="text-lg">➔</span>
              </button>

              <button
                onClick={() => scrollTo('platform')}
                className="border-2 border-[#5C2483] text-[#5C2483] hover:bg-[#5C2483] hover:text-white font-black px-8 py-4 rounded-full text-base transition-all cursor-pointer"
              >
                Explore Platform
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM SECTION (#platform) */}
      <section id="platform" className="bg-white py-24 px-6 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto space-y-14 text-left">
          
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <div className="text-[#5C2483] text-sm font-black uppercase tracking-wider">⚡ THE MOSAIC PLATFORM</div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2D183B]">Connected Modules for K-12 Success</h2>
            <p className="text-zinc-600 text-base sm:text-lg font-medium">
              Empowering teachers, instructional coaches, and school leadership with actionable student growth evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7">
            
            <div className="bg-purple-50/40 border border-purple-100 rounded-3xl p-7 space-y-5 hover:border-[#5C2483] transition-all flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#5C2483] text-white flex items-center justify-center text-3xl font-bold shadow-md">
                  ⚡
                </div>
                <h3 className="text-xl font-black text-[#2D183B]">Responsive Instruction</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                  5-step guided cycle, flexible student need groups, strategy library, progress checks, and student timeline paths.
                </p>
              </div>
              <Link href="/dashboard/responsive" className="text-sm text-[#5C2483] font-black hover:underline inline-block pt-3">
                Open Portal ➔
              </Link>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-3xl p-7 space-y-5 hover:border-[#5C2483] transition-all flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#5C2483] text-white flex items-center justify-center text-3xl font-bold shadow-md">
                  📋
                </div>
                <h3 className="text-xl font-black text-[#2D183B]">PLC Meeting Tool</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                  Collaborative NC standard alignment, root cause identification, action item tracking, and exportable reports.
                </p>
              </div>
              <Link href="/dashboard/plc" className="text-sm text-[#5C2483] font-black hover:underline inline-block pt-3">
                Open PLC Tool ➔
              </Link>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-3xl p-7 space-y-5 hover:border-[#5C2483] transition-all flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#5C2483] text-white flex items-center justify-center text-3xl font-bold shadow-md">
                  📊
                </div>
                <h3 className="text-xl font-black text-[#2D183B]">Student Skill Matrix</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                  Competency score matrix mapping student growth across Systems Thinking, Critical Thinking, and Creative Design.
                </p>
              </div>
              <Link href="/dashboard/school" className="text-sm text-[#5C2483] font-black hover:underline inline-block pt-3">
                View Matrix ➔
              </Link>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-3xl p-7 space-y-5 hover:border-[#5C2483] transition-all flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#5C2483] text-white flex items-center justify-center text-3xl font-bold shadow-md">
                  🏛️
                </div>
                <h3 className="text-xl font-black text-[#2D183B]">District Analytics</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                  Aggregate growth trends across schools with strict multi-tenant data isolation and privacy safeguards.
                </p>
              </div>
              <Link href="/dashboard/district" className="text-sm text-[#5C2483] font-black hover:underline inline-block pt-3">
                View District ➔
              </Link>
            </div>

            <div className="bg-purple-50/40 border border-purple-100 rounded-3xl p-7 space-y-5 hover:border-[#5C2483] transition-all flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#5C2483] text-white flex items-center justify-center text-3xl font-bold shadow-md">
                  🧪
                </div>
                <h3 className="text-xl font-black text-[#2D183B]">Discovery Lab</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                  Interactive North Carolina standard simulations, digital inquiry journals, and hands-on science journals.
                </p>
              </div>
              <Link href="/dashboard/discovery" className="text-sm text-[#5C2483] font-black hover:underline inline-block pt-3">
                Open Lab ➔
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 5. RESOURCES SECTION (#resources) */}
      <section id="resources" className="bg-[#F9F5FF] py-24 px-6 border-b border-purple-100">
        <div className="max-w-7xl mx-auto space-y-14 text-left">
          
          <div className="space-y-4">
            <div className="text-[#5C2483] text-sm font-black uppercase tracking-wider">📚 INSTRUCTIONAL ASSETS</div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2D183B]">Resources & Strategy Libraries</h2>
            <p className="text-zinc-600 text-base sm:text-lg font-medium max-w-3xl">
              High-quality North Carolina DPI standards alignment guides and research-backed instructional strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-purple-100 rounded-3xl p-7 space-y-4 shadow-sm">
              <span className="text-[#5C2483] text-3xl font-bold">📚</span>
              <h3 className="text-lg font-extrabold text-[#2D183B]">NC Grade 3 Standards Library</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Official North Carolina DPI codes across Mathematics (NC.3.NF), Science (NC.3.P), and English Language Arts (NC.3.RL).
              </p>
            </div>

            <div className="bg-white border border-purple-100 rounded-3xl p-7 space-y-4 shadow-sm">
              <span className="text-[#5C2483] text-3xl font-bold">💡</span>
              <h3 className="text-lg font-extrabold text-[#2D183B]">Research Strategy Library</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Curated strategies (CER, Manipulatives, Close Reading) complete with implementation steps, materials, and duration guides.
              </p>
            </div>

            <div className="bg-white border border-purple-100 rounded-3xl p-7 space-y-4 shadow-sm">
              <span className="text-[#5C2483] text-3xl font-bold">🖨️</span>
              <h3 className="text-lg font-extrabold text-[#2D183B]">Print-Ready PDF Reports</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Exportable PLC meeting minutes and individualized student timeline summaries ready for parent & admin conferences.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CONTACT US SECTION (#contact) */}
      <section id="contact" className="bg-white py-24 px-6 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto space-y-9 text-left">
          
          <div className="space-y-4 text-center">
            <div className="text-[#5C2483] text-sm font-black uppercase tracking-wider">✉️ GET IN TOUCH</div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2D183B]">Talk to an Expert</h2>
            <p className="text-zinc-600 text-base max-w-xl mx-auto font-medium">
              Have questions about implementing Mosaic in your North Carolina school district? Reach out to our team.
            </p>
          </div>

          <div className="bg-[#F9F5FF] border border-purple-100 rounded-3xl p-9 shadow-xl">
            {contactSent ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 p-8 rounded-2xl text-center space-y-3">
                <span className="text-3xl">✅</span>
                <h4 className="font-extrabold text-lg">Thank you for reaching out!</h4>
                <p className="text-sm text-zinc-700">A Mosaic instructional specialist will follow up with your school team shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-zinc-300 rounded-lg py-3 px-4 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">Work Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="jdoe@school.edu"
                      className="w-full bg-white border border-zinc-300 rounded-lg py-3 px-4 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">School / District Name</label>
                  <input
                    type="text"
                    value={contactSchool}
                    onChange={(e) => setContactSchool(e.target.value)}
                    placeholder="Springfield Public Schools"
                    className="w-full bg-white border border-zinc-300 rounded-lg py-3 px-4 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">Message</label>
                  <textarea
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="How can we help your instructional team?"
                    className="w-full h-32 bg-white border border-zinc-300 rounded-lg p-4 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5C2483] hover:bg-[#4A154B] text-white font-black py-4 rounded-xl text-sm transition-all shadow-md cursor-pointer"
                >
                  Send Message ➔
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 7. DEDICATED SCHEDULE A DEMO MODAL */}
      {demoModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-3xl p-9 max-w-lg w-full shadow-2xl relative space-y-6 text-left animate-in fade-in duration-150 text-zinc-900">
            
            <button
              onClick={() => { setDemoModalOpen(false); setDemoSent(false); }}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-900 font-bold text-xl cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1.5">
              <div className="text-[#5C2483] text-xs font-black uppercase tracking-wider">📅 SCHEDULE A LIVE DEMO</div>
              <h3 className="text-3xl font-black text-[#2D183B]">See Mosaic in Action</h3>
              <p className="text-xs text-zinc-500 font-medium">Book a personalized instructional assessment demo for your school.</p>
            </div>

            {demoSent ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-4">
                <span className="text-4xl block">🎉</span>
                <h4 className="font-black text-xl">Demo Request Received!</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  We sent a calendar invite confirmation to <strong className="text-zinc-900">{demoEmail}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => { setDemoModalOpen(false); setLoginModalOpen(true); }}
                    className="bg-[#5C2483] hover:bg-[#4A154B] text-white font-bold py-3 px-6 rounded-xl text-xs shadow-md cursor-pointer"
                  >
                    Try Live Platform Demo Now ➔
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      placeholder="Dr. Sarah Jenkins"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 px-3.5 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Work Email</label>
                    <input
                      type="email"
                      value={demoEmail}
                      onChange={(e) => setDemoEmail(e.target.value)}
                      placeholder="sjenkins@school.edu"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 px-3.5 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">School / District</label>
                    <input
                      type="text"
                      value={demoSchool}
                      onChange={(e) => setDemoSchool(e.target.value)}
                      placeholder="Wake County Public Schools"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 px-3.5 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Role</label>
                    <select
                      value={demoRole}
                      onChange={(e) => setDemoRole(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 px-3.5 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none"
                    >
                      <option value="Teacher">Teacher / PLC Member</option>
                      <option value="Instructional Coach">Instructional Coach</option>
                      <option value="Principal">Principal / Assistant Principal</option>
                      <option value="District Admin">District Administrator</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">Preferred Demo Date</label>
                  <input
                    type="date"
                    value={demoDate}
                    onChange={(e) => setDemoDate(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 px-3.5 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5C2483] hover:bg-[#4A154B] text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer mt-2"
                >
                  Confirm Demo Session ➔
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 8. SIGN IN MODAL */}
      {loginModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-3xl p-9 max-w-md w-full shadow-2xl relative space-y-6 text-left animate-in fade-in duration-150 text-zinc-900">
            
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-900 font-bold text-xl cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1.5">
              <div className="text-[#5C2483] text-xs font-black uppercase tracking-wider">🔒 MOSAIC LOGIN</div>
              <h3 className="text-3xl font-black text-[#2D183B]">Log in to Mosaic</h3>
              <p className="text-xs text-zinc-500 font-medium">Access your PLC Meetings & Responsive Instruction Portal</p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5">Platform Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter platform password"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-3 px-3.5 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5C2483] hover:bg-[#4A154B] text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Entering Platform...' : 'Log In ➔'}
              </button>
            </form>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-zinc-200 py-10 px-6 text-sm text-zinc-500 font-medium">
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
