'use client';
import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';
import { createClient } from '@/lib/supabase/client';

interface TeacherRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface SkillRow {
  id: string;
  name: string;
}

interface ClassRow {
  id: string;
  name: string;
  grade_level: string;
  teacher_name?: string;
  student_count?: number;
  skill_averages?: Record<string, string>; // Maps skillName -> average (e.g. "3.2" or "N/A")
}

export default function PrincipalDashboard() {
  const { profile, signOut, loading: authLoading } = useAuth();
  const [showPlcModal, setShowPlcModal] = React.useState(false);
  const [showDiffModal, setShowDiffModal] = React.useState(false);
  const [highlightedClassId, setHighlightedClassId] = React.useState<string | null>(null);
  
  const scrollToAndHighlightClass = (classId: string) => {
    setShowPlcModal(false);
    setShowDiffModal(false);
    
    // Set highlight
    setHighlightedClassId(classId);
    
    // Scroll smoothly
    setTimeout(() => {
      const element = document.getElementById('class-row-' + classId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    // Clear highlight after 2.5 seconds
    setTimeout(() => {
      setHighlightedClassId(null);
    }, 2500);
  };
  const [teachers, setTeachers] = useState<TeacherRow[]>([]);
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [skills, setSkills] = useState<SkillRow[]>([]);
  const [schoolName, setSchoolName] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return;
    if (!profile || profile.role !== 'principal' || !profile.school_id) {
      router.push('/login');
      return;
    }

    const fetchSchoolData = async () => {
      try {
        // Fetch school details
        const { data: schoolData } = await supabase
          .from('schools')
          .select('name')
          .eq('id', profile.school_id)
          .single();

        if (schoolData) setSchoolName(schoolData.name);

        // Fetch skills
        const { data: skillsData } = await supabase
          .from('skills')
          .select('id, name')
          .order('name');
        
        const activeSkills = skillsData || [];
        setSkills(activeSkills);

        // Fetch teachers in this school
        const { data: teachersData } = await supabase
          .from('users')
          .select('id, first_name, last_name, email')
          .eq('school_id', profile.school_id);

        let actualTeachers: TeacherRow[] = [];
        if (teachersData) {
          const teacherIds = teachersData.map(t => t.id);
          const { data: rolesData } = await supabase
            .from('user_roles')
            .select('user_id')
            .in('user_id', teacherIds)
            .eq('role', 'teacher');

          const validTeacherIds = new Set(rolesData?.map(r => r.user_id) || []);
          actualTeachers = teachersData.filter(t => validTeacherIds.has(t.id));
          setTeachers(actualTeachers);
        }

        // Fetch all student skills evaluations for this school (relies on Principal RLS)
        const { data: evalsData } = await supabase
          .from('student_skills')
          .select('score, skill_id, student_id');

        const studentSkills = evalsData || [];

        // Fetch classes in this school
        const { data: classesData } = await supabase
          .from('classes')
          .select('id, name, grade_level, teacher_id')
          .eq('school_id', profile.school_id);

        if (classesData) {
          const enrichedClasses = await Promise.all(
            classesData.map(async (cls) => {
              // Fetch teacher profile name
              const teacher = teachersData?.find(t => t.id === cls.teacher_id);
              const teacherName = teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Unknown Teacher';

              // Fetch student enrollment IDs
              const { data: enrollmentData } = await supabase
                .from('class_enrollments')
                .select('student_id')
                .eq('class_id', cls.id);

              const studentIds = enrollmentData?.map(e => e.student_id) || [];
              const studentCount = studentIds.length;

              // Compute averages for each skill
              const skillAverages: Record<string, string> = {};
              activeSkills.forEach(sk => {
                const classEvals = studentSkills.filter(
                  ev => ev.skill_id === sk.id && studentIds.includes(ev.student_id)
                );

                if (classEvals.length === 0) {
                  skillAverages[sk.name] = 'N/A';
                } else {
                  const sum = classEvals.reduce((acc, curr) => acc + curr.score, 0);
                  const avg = (sum / classEvals.length).toFixed(1);
                  skillAverages[sk.name] = avg;
                }
              });

              return {
                ...cls,
                teacher_name: teacherName,
                student_count: studentCount,
                skill_averages: skillAverages
              };
            })
          );
          setClasses(enrichedClasses);
        }
      } catch (err) {
        console.error('Error loading school details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  }, [profile, authLoading, router, supabase]);

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#64ffda]/30 border-t-[#64ffda] rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A192F] p-6 lg:p-10 text-white">
            {/* APPCIRCLE STYLE NAVIGATION HEADER */}
            {/* OTUS STYLE TOP ANNOUNCEMENT BAR (LIGHT LAVENDER #F3EEFF) */}
      <div className="bg-[#F3EEFF] text-[#5C2483] py-2 px-6 shadow-sm border-b border-[#E6DBFF]">
        <div className="max-w-7xl mx-auto w-full flex justify-end items-center gap-3">
          <Link
            href="/login"
            className="border-2 border-[#5C2483] hover:bg-[#5C2483] hover:text-white text-[#5C2483] font-bold px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer bg-transparent shadow-sm"
          >
            <span>📅</span>
            <span>Book a Demo</span>
          </Link>
          <Link
            href="/login"
            className="border-2 border-[#5C2483] hover:bg-[#5C2483] hover:text-white text-[#5C2483] font-bold px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer bg-transparent shadow-sm"
          >
            <span>➔</span>
            <span>Log In</span>
          </Link>
        </div>
      </div>

      {/* OTUS STYLE MAIN HEADER NAVBAR (PURE WHITE #FFFFFF) */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo Mark */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#5C2483] flex items-center justify-center font-black text-white text-xl shadow-md shadow-[#5C2483]/30">
              m
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#2D183B]">mosaic</span>
          </Link>

          {/* Otus Navigation Menu */}
          <nav className="flex items-center gap-8 text-sm font-bold text-[#2D183B]">
            
            {/* PLATFORM DROPDOWN */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#5C2483] transition-colors cursor-pointer py-2">
                <span>Platform</span>
                <span className="text-xs">▾</span>
              </button>

              <div className="hidden group-hover:grid absolute top-full left-0 mt-1 w-80 bg-white border border-zinc-200 rounded-xl shadow-2xl p-3 grid-cols-1 gap-2 z-50 animate-in fade-in duration-150">
                <div className="text-[10px] font-bold text-[#5C2483] uppercase tracking-wider px-3 pt-2">
                  Mosaic Platform Modules
                </div>

                <Link
                  href="/dashboard/responsive"
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50 transition-colors group/item"
                >
                  <span className="text-xl">⚡</span>
                  <div>
                    <div className="font-bold text-[#2D183B] text-xs group-hover/item:text-[#5C2483]">Responsive Instruction</div>
                    <div className="text-[10px] text-zinc-500">5-step guided cycle, flexible groups & student paths</div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/plc"
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50 transition-colors group/item"
                >
                  <span className="text-xl">📋</span>
                  <div>
                    <div className="font-bold text-[#2D183B] text-xs group-hover/item:text-[#5C2483]">PLC Meeting Tool</div>
                    <div className="text-[10px] text-zinc-500">NC standard alignment, evidence & report export</div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/school"
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50 transition-colors group/item"
                >
                  <span className="text-xl">📊</span>
                  <div>
                    <div className="font-bold text-[#2D183B] text-xs group-hover/item:text-[#5C2483]">Student Skill Matrix</div>
                    <div className="text-[10px] text-zinc-500">Competency matrix & principal analytics</div>
                  </div>
                </Link>

                <Link
                  href="/dashboard/district"
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50 transition-colors group/item"
                >
                  <span className="text-xl">🏛️</span>
                  <div>
                    <div className="font-bold text-[#2D183B] text-xs group-hover/item:text-[#5C2483]">District Analytics</div>
                    <div className="text-[10px] text-zinc-500">District trends with privacy safeguards</div>
                  </div>
                </Link>
              </div>
            </div>

            <Link href="/dashboard/teacher" className="hover:text-[#5C2483] transition-colors">Solutions</Link>
            <Link href="/dashboard/responsive" className="hover:text-[#5C2483] transition-colors">Community</Link>
            <Link href="/dashboard/school" className="hover:text-[#5C2483] transition-colors">Resources</Link>
            <Link href="/dashboard/plc" className="hover:text-[#5C2483] transition-colors">About</Link>
          </nav>

        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        {/* School Overview Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl">
            <h3 className="text-[#8892B0] text-sm font-semibold tracking-wider uppercase">School Staff</h3>
            <p className="text-3xl font-extrabold text-white mt-2">{teachers.length} Teachers</p>
          </div>
          <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl">
            <h3 className="text-[#8892B0] text-sm font-semibold tracking-wider uppercase">Classrooms</h3>
            <p className="text-3xl font-extrabold text-white mt-2">{classes.length} Classes</p>
          </div>
          <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl">
            <h3 className="text-[#8892B0] text-sm font-semibold tracking-wider uppercase">Students Enrolled</h3>
            <p className="text-3xl font-extrabold text-white mt-2">
              {classes.reduce((acc, curr) => acc + (curr.student_count || 0), 0)} Students
            </p>
          </div>
        </section>

        {/* Competency matrix card */}
        <section className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Learning Competency Matrix</h2>
          {classes.length === 0 ? (
            <div className="text-center py-12 text-[#8892B0]">No classrooms recorded.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-bold text-[#64ffda] uppercase tracking-wider">
                    <th className="pb-4 pr-4">Classroom Name</th>
                    <th className="pb-4 px-4 text-center">Enrolled</th>
                    {skills.map(sk => (
                      <th key={sk.id} className="pb-4 px-4 text-center">{sk.name} (Avg)</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-base">
                  {classes.map(cls => (
                    <tr 
                      key={cls.id} 
                      id={'class-row-' + cls.id}
                      className={`transition-all duration-500 ${
                        highlightedClassId === cls.id 
                          ? 'bg-[#64ffda]/10 border-l-4 border-[#64ffda]' 
                          : 'hover:bg-white/[0.01]'
                      }`}
                    >
                      <td className="py-4 pr-4">
                        <span className="font-semibold text-white block">{cls.name}</span>
                        <span className="text-xs text-[#8892B0]">Taught by {cls.teacher_name}</span>
                      </td>
                      <td className="py-4 px-4 text-center text-[#8892B0] font-semibold">{cls.student_count}</td>
                      {skills.map(sk => {
                        const scoreStr = cls.skill_averages?.[sk.name] || 'N/A';
                        const scoreVal = parseFloat(scoreStr);
                        let badgeColor = 'bg-white/5 text-[#8892B0]';
                        if (!isNaN(scoreVal)) {
                          if (scoreVal >= 3.5) badgeColor = 'bg-[#64ffda]/10 text-[#64ffda] border border-[#64ffda]/20';
                          else if (scoreVal >= 2.5) badgeColor = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
                          else if (scoreVal >= 1.5) badgeColor = 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
                          else badgeColor = 'bg-red-500/10 text-red-400 border border-red-500/20';
                        }
                        return (
                          <td key={sk.id} className="py-4 px-4 text-center">
                            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${badgeColor}`}>
                              {scoreStr}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Teachers List table */}
        <section className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Teacher Directory</h2>
          {teachers.length === 0 ? (
            <div className="text-center py-12 text-[#8892B0]">No teachers registered at this school.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-bold text-[#64ffda] uppercase tracking-wider">
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 pl-4">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-base">
                  {teachers.map(teacher => (
                    <tr key={teacher.id}>
                      <td className="py-4 pr-4 font-semibold text-white">
                        {teacher.first_name} {teacher.last_name}
                      </td>
                      <td className="py-4 pl-4 text-[#8892B0]">{teacher.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* PLC Meetings Modal */}
        {showPlcModal && (
          <div className="fixed inset-0 bg-[#0A192F]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-[#172A45] border border-white/10 rounded-xl p-6 max-w-2xl w-full shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">📅 Professional Learning Community (PLC) Logs</h3>
                <button 
                  onClick={() => setShowPlcModal(false)}
                  className="text-[#8892B0] hover:text-white text-xl font-bold cursor-pointer"
                >
                  &times;
                </button>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                <div className="bg-[#0A192F]/60 p-4 rounded-lg border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#64ffda] font-bold">Grade 3 & 4 Skill Alignment</span>
                    <span className="text-[#8892B0]">July 15, 2026</span>
                  </div>
                  <h4 
                    onClick={() => scrollToAndHighlightClass('c0000001-0000-0000-0000-000000000000')}
                    className="font-bold text-[#64ffda] hover:underline text-sm cursor-pointer"
                  >
                    Target: Systems Thinking Rubrics (3rd Grade English)
                  </h4>
                  <p className="text-xs text-[#8892B0] leading-relaxed">
                    Attendees: Seymour Skinner (Principal), Semih Yildiz (Teacher). Aligned on third-grade metrics. Agreed that evaluating "Systems Thinking" requires pupils to recognize causal relationships in natural science loops rather than simply repeating facts.
                  </p>
                </div>
                
                <div className="bg-[#0A192F]/60 p-4 rounded-lg border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#64ffda] font-bold">Inter-disciplinary Review</span>
                    <span className="text-[#8892B0]">July 08, 2026</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm">Focus: Collaboration Skills</h4>
                  <p className="text-xs text-[#8892B0] leading-relaxed">
                    Discussed grouping strategies for science lab teams. Skinner recommended structuring peer leadership responsibilities to support student agency benchmarks.
                  </p>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <button 
                  onClick={() => setShowPlcModal(false)}
                  className="bg-[#64ffda] text-[#0A192F] hover:bg-[#52e0c2] font-bold py-2 px-5 rounded-md text-sm cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Differentiation Strategies Modal */}
        {showDiffModal && (
          <div className="fixed inset-0 bg-[#0A192F]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-[#172A45] border border-white/10 rounded-xl p-6 max-w-2xl w-full shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">🎯 Recommended Classroom Differentiation</h3>
                <button 
                  onClick={() => setShowDiffModal(false)}
                  className="text-[#8892B0] hover:text-white text-xl font-bold cursor-pointer"
                >
                  &times;
                </button>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                <div className="space-y-3">
                  <p className="text-xs text-[#8892B0]">
                    Generated strategies based on current class averages and student competencies logs:
                  </p>
                  
                  <div className="bg-[#0A192F]/60 p-4 rounded-lg border border-[#64ffda]/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span 
                      onClick={() => scrollToAndHighlightClass('c0000001-0000-0000-0000-000000000000')}
                      className="text-white hover:text-[#64ffda] hover:underline font-bold text-sm cursor-pointer"
                    >
                      Lisa Simpson (3rd Grade English)
                    </span>
                      <span className="bg-[#64ffda]/10 text-[#64ffda] text-[10px] font-bold px-2 py-0.5 rounded">EXCELPATH (Level 4)</span>
                    </div>
                    <p className="text-xs text-[#8892B0] leading-relaxed">
                      **Systems Thinking:** Lisa is at advanced mastery. Recommendation: Provide independent projects mapping multi-layered ecosystems with external resource limits.
                    </p>
                  </div>

                  <div className="bg-[#0A192F]/60 p-4 rounded-lg border border-amber-500/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span 
                      onClick={() => scrollToAndHighlightClass('c0000001-0000-0000-0000-000000000000')}
                      className="text-white hover:text-[#64ffda] hover:underline font-bold text-sm cursor-pointer"
                    >
                      Bart Simpson (3rd Grade English)
                    </span>
                      <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">SCAFFOLDING (Level 2)</span>
                    </div>
                    <p className="text-xs text-[#8892B0] leading-relaxed">
                      **Systems Thinking:** Bart demonstrates developing capabilities. Recommendation: Pair with structured peer modeling helpers. Provide graphic organizers detailing system nodes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <button 
                  onClick={() => setShowDiffModal(false)}
                  className="bg-[#64ffda] text-[#0A192F] hover:bg-[#52e0c2] font-bold py-2 px-5 rounded-md text-sm cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
