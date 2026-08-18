'use client';
import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';
import { createClient } from '@/lib/supabase/client';

interface ClassRow {
  id: string;
  name: string;
  grade_level: string;
}

interface StudentRow {
  id: string;
  first_name: string;
  last_name: string;
}

interface SkillRow {
  id: string;
  name: string;
  description: string;
}

interface EvaluationRow {
  id: string;
  score: number;
  evidence: string;
  created_at: string;
  skill: {
    id: string;
    name: string;
  };
}

export default function TeacherDashboard() {
  const { profile, signOut, loading: authLoading } = useAuth();
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassRow | null>(null);
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [skills, setSkills] = useState<SkillRow[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentRow | null>(null);
  const [studentEvaluations, setStudentEvaluations] = useState<EvaluationRow[]>([]);
  
  // Log form state
  const [newSkillId, setNewSkillId] = useState('');
  const [newScore, setNewScore] = useState<number>(3);
  const [newEvidence, setNewEvidence] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [evalsLoading, setEvalsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  // Load classes & skills on load
  useEffect(() => {
    if (authLoading) return;
    if (!profile || profile.role !== 'teacher') {
      router.push('/login');
      return;
    }

    const initData = async () => {
      try {
        // Fetch classes taught by this teacher
        const { data: classesData } = await supabase
          .from('classes')
          .select('id, name, grade_level')
          .eq('teacher_id', profile.id);

        setClasses(classesData || []);

        if (classesData && classesData.length > 0) {
          setSelectedClass(classesData[0]);
        }

        // Fetch list of skills
        const { data: skillsData } = await supabase
          .from('skills')
          .select('id, name, description')
          .order('name');

        if (skillsData) {
          setSkills(skillsData);
          if (skillsData.length > 0) {
            setNewSkillId(skillsData[0].id);
          }
        }
      } catch (err) {
        console.error('Error loading setup data:', err);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, [profile, authLoading, router, supabase]);

  // Load student rosters when class changes
  useEffect(() => {
    if (!selectedClass) return;
    setSelectedStudent(null);
    setStudentsLoading(true);

    const fetchStudents = async () => {
      try {
        const { data, error } = await supabase
          .from('class_enrollments')
          .select('student:students(id, first_name, last_name)')
          .eq('class_id', selectedClass.id);

        if (error) throw error;

        const enrolledStudents = (data || [])
          .map((item: any) => item.student)
          .filter((s): s is StudentRow => s !== null);

        setStudents(enrolledStudents);
      } catch (err) {
        console.error('Error loading student roster:', err);
      } finally {
        setStudentsLoading(false);
      }
    };

    fetchStudents();
  }, [selectedClass, supabase]);

  // Fetch student evaluations helper
  const fetchStudentEvaluations = async (studentId: string) => {
    setEvalsLoading(true);
    try {
      const { data, error } = await supabase
        .from('student_skills')
        .select('id, score, evidence, created_at, skill:skills(id, name)')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudentEvaluations((data as any) || []);
    } catch (err) {
      console.error('Error fetching evaluations:', err);
    } finally {
      setEvalsLoading(false);
    }
  };

  // Load evaluations when student changes
  useEffect(() => {
    if (!selectedStudent) {
      setStudentEvaluations([]);
      return;
    }
    fetchStudentEvaluations(selectedStudent.id);
  }, [selectedStudent]);

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const handleLogEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !newSkillId || !newEvidence.trim() || !profile) return;
    
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const { error } = await supabase
        .from('student_skills')
        .insert({
          student_id: selectedStudent.id,
          skill_id: newSkillId,
          evaluated_by: profile.id,
          score: newScore,
          evidence: newEvidence.trim()
        });

      if (error) throw error;

      setSubmitSuccess(true);
      setNewEvidence('');
      // Reload timeline and progress bars
      await fetchStudentEvaluations(selectedStudent.id);
      
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error logging evidence:', err);
      setSubmitError(err.message || 'Failed to submit evidence.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper to get latest score for a skill
  const getLatestScore = (skillId: string) => {
    const ev = studentEvaluations.find(e => e.skill.id === skillId);
    return ev ? ev.score : null;
  };

  const getScoreName = (score: number) => {
    switch (score) {
      case 1: return 'Beginning';
      case 2: return 'Developing';
      case 3: return 'Proficient';
      case 4: return 'Advanced';
      default: return 'Not Evaluated';
    }
  };

  const getScoreColor = (score: number) => {
    switch (score) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-amber-500';
      case 3: return 'bg-emerald-500';
      case 4: return 'bg-[#5C2483]';
      default: return 'bg-zinc-100';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F9F8FC] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#5C2483]/30 border-t-[#5C2483] rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8FC] p-6 lg:p-10 text-zinc-900">
            {/* APPCIRCLE STYLE NAVIGATION HEADER */}
            {/* OTUS STYLE TOP ANNOUNCEMENT BAR (LIGHT LAVENDER #F3EEFF) */}
      <div className="bg-[#F3EEFF] text-[#5C2483] py-2 px-6 shadow-sm border-b border-[#E6DBFF]">
        <div className="max-w-7xl mx-auto w-full flex justify-end items-center gap-3">
          <Link
            href="/login"
            className="border-2 border-[#5C2483] hover:bg-[#5C2483] hover:text-zinc-900 text-[#5C2483] font-bold px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer bg-transparent shadow-sm"
          >
            <span>📅</span>
            <span>Book a Demo</span>
          </Link>
          <Link
            href="/login"
            className="border-2 border-[#5C2483] hover:bg-[#5C2483] hover:text-zinc-900 text-[#5C2483] font-bold px-4 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer bg-transparent shadow-sm"
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
            <div className="w-9 h-9 rounded-2xl bg-[#5C2483] flex items-center justify-center font-black text-zinc-900 text-xl shadow-md shadow-[#5C2483]/30">
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

                <Link
                  href="/dashboard/discovery"
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-50 transition-colors group/item"
                >
                  <span className="text-xl">🤖</span>
                  <div>
                    <div className="font-bold text-[#2D183B] text-xs group-hover/item:text-[#5C2483]">Discovery Lab</div>
                    <div className="text-[10px] text-zinc-500">Interactive standard simulations & lab journals</div>
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

      <main className="max-w-7xl mx-auto">
        {classes.length === 0 ? (
          <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-12 text-center text-zinc-600 shadow-xl">
            You do not have any classrooms assigned.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar List of Classes (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div>
                <h2 className="text-sm font-bold text-[#5C2483] uppercase tracking-wider mb-3">My Classes</h2>
                <div className="space-y-2">
                  {classes.map(cls => (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClass(cls)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedClass?.id === cls.id
                          ? 'bg-white border border-zinc-200/80 shadow-sm border-[#5C2483] text-zinc-900 shadow-md'
                          : 'bg-white border border-zinc-200/80 shadow-sm/30 border-zinc-200/60 text-zinc-600 hover:bg-white border border-zinc-200/80 shadow-sm/50 hover:text-zinc-900'
                      }`}
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-wider mb-0.5">{cls.grade_level}</span>
                      <span className="font-semibold block text-base">{cls.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Class roster list */}
              {selectedClass && (
                <div className="bg-white border border-zinc-200/80 shadow-sm/30 border border-zinc-200/60 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-[#5C2483] uppercase tracking-wider">Class Roster</h3>
                    <span className="bg-zinc-100 border border-zinc-200/50 text-xs px-2 py-0.5 rounded text-zinc-600">
                      {students.length} students
                    </span>
                  </div>
                  
                  {studentsLoading ? (
                    <div className="py-8 flex justify-center">
                      <span className="w-5 h-5 border-2 border-[#5C2483]/30 border-t-[#5C2483] rounded-full animate-spin"></span>
                    </div>
                  ) : students.length === 0 ? (
                    <div className="text-center py-6 text-sm text-zinc-600">Roster empty.</div>
                  ) : (
                    <div className="space-y-1">
                      {students.map(student => (
                        <button
                          key={student.id}
                          onClick={() => setSelectedStudent(student)}
                          className={`w-full text-left py-2.5 px-3 rounded-md transition-colors text-sm flex justify-between items-center ${
                            selectedStudent?.id === student.id
                              ? 'bg-[#5C2483] text-white font-bold'
                              : 'text-zinc-900 hover:bg-zinc-100 border border-zinc-200/50'
                          }`}
                        >
                          <span>{student.first_name} {student.last_name}</span>
                          <span className={selectedStudent?.id === student.id ? 'text-white' : 'text-zinc-600'}>→</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right student skill logs detail workspace (9 cols) */}
            <div className="lg:col-span-9">
              {!selectedStudent ? (
                <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-16 text-center text-zinc-600 shadow-xl min-h-[400px] flex flex-col justify-center items-center">
                  <span className="text-4xl mb-4">📈</span>
                  <h3 className="text-lg font-bold text-zinc-900">Student Skill Tracker</h3>
                  <p className="max-w-md text-sm mt-1">Select a student from the class roster sidebar to view skill metrics, log classroom evidence, and track growth portfolios.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Student Title header */}
                  <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[#5C2483] text-xs font-bold tracking-wider uppercase mb-1">SELECTED STUDENT PROFILE</div>
                        <h2 className="text-2xl font-extrabold text-zinc-900">{selectedStudent.first_name} {selectedStudent.last_name}</h2>
                        <p className="text-zinc-600 text-sm mt-1">{selectedClass?.name}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedStudent(null)}
                        className="text-xs font-bold text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-white/20 py-1.5 px-3 rounded-md transition-colors"
                      >
                        ✕ Deselect Student
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Skill progress bars (5 cols) */}
                    <div className="md:col-span-5 bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl space-y-6">
                      <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-200/60 pb-3">Skill Competencies</h3>
                      {skills.length === 0 ? (
                        <div className="text-zinc-600 text-sm py-4">No skills configured.</div>
                      ) : (
                        <div className="space-y-5">
                          {skills.map(skill => {
                            const latestScore = getLatestScore(skill.id);
                            const widthPercent = latestScore ? (latestScore / 4) * 100 : 0;
                            return (
                              <div key={skill.id} className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="font-semibold text-zinc-900">{skill.name}</span>
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded text-white ${latestScore ? getScoreColor(latestScore) : 'bg-zinc-100 text-zinc-900'}`}>
                                    {latestScore ? getScoreName(latestScore) : 'No Log'}
                                  </span>
                                </div>
                                <div className="bg-[#F9F8FC] h-2.5 rounded-full overflow-hidden border border-zinc-200/60">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ${latestScore ? getScoreColor(latestScore) : 'w-0'}`}
                                    style={{ width: `${widthPercent}%` }}
                                  ></div>
                                </div>
                                <p className="text-[10px] text-zinc-600 leading-normal">{skill.description}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Log evidence form & timeline (7 cols) */}
                    <div className="md:col-span-7 space-y-8">
                      {/* Log Evidence Form */}
                      <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl">
                        <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-200/60 pb-3 mb-4">Log Skill Evidence</h3>
                        {submitError && (
                          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-md mb-4 font-medium">
                            {submitError}
                          </div>
                        )}
                        {submitSuccess && (
                          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-md mb-4 font-medium">
                            Evidence logged successfully!
                          </div>
                        )}

                        <form onSubmit={handleLogEvidence} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Target Competency</label>
                            <select 
                              value={newSkillId}
                              onChange={(e) => setNewSkillId(e.target.value)}
                              className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded-md py-2 px-3 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none"
                              required
                            >
                              {skills.map(skill => (
                                <option key={skill.id} value={skill.id}>{skill.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Evaluation Rubric Level</label>
                            <div className="grid grid-cols-4 gap-2">
                              {[1, 2, 3, 4].map(scoreVal => (
                                <label 
                                  key={scoreVal}
                                  className={`border rounded-md py-2.5 text-center cursor-pointer text-xs font-semibold transition-all ${
                                    newScore === scoreVal 
                                      ? 'border-[#5C2483] bg-[#5C2483]/10 text-[#5C2483]'
                                      : 'border-zinc-200 bg-[#F9F8FC]/40 text-zinc-600 hover:border-white/20'
                                  }`}
                                >
                                  <input 
                                    type="radio" 
                                    name="scoreRadio" 
                                    value={scoreVal} 
                                    checked={newScore === scoreVal}
                                    onChange={() => setNewScore(scoreVal)}
                                    className="sr-only"
                                  />
                                  <span className="block font-bold mb-0.5">{scoreVal}</span>
                                  <span className="text-[9px] uppercase">{getScoreName(scoreVal)}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Classroom Evidence Notes</label>
                            <textarea 
                              value={newEvidence}
                              onChange={(e) => setNewEvidence(e.target.value)}
                              placeholder="e.g. Bart mapped soil compaction near the main tree but failed to link it to canopy moisture levels."
                              className="w-full h-24 bg-[#F9F8FC]/60 border border-zinc-200 rounded-md p-3 text-zinc-900 text-sm focus:border-[#5C2483] focus:outline-none resize-none"
                              required
                            ></textarea>
                          </div>

                          <button 
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#5C2483] text-white hover:bg-[#4A154B] transition-colors py-2.5 rounded-md font-bold text-sm disabled:opacity-50 flex justify-center items-center gap-2"
                          >
                            {submitting ? 'Submitting...' : '✓ Log Evidence Entry'}
                          </button>
                        </form>
                      </div>

                      {/* Evidence History timeline */}
                      <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl">
                        <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-200/60 pb-3 mb-4">Evidence History Feed</h3>
                        {evalsLoading ? (
                          <div className="py-8 flex justify-center">
                            <span className="w-5 h-5 border-2 border-[#5C2483]/30 border-t-[#5C2483] rounded-full animate-spin"></span>
                          </div>
                        ) : studentEvaluations.length === 0 ? (
                          <div className="text-center py-8 text-zinc-600 text-sm">No evidence logs recorded yet.</div>
                        ) : (
                          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                            {studentEvaluations.map(ev => (
                              <div key={ev.id} className="bg-[#F9F8FC]/40 border border-zinc-200/60 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-[#5C2483] text-xs font-bold uppercase">{ev.skill.name}</span>
                                  <div className="flex gap-2 items-center">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${getScoreColor(ev.score)}`}>
                                      Level {ev.score}
                                    </span>
                                    <span className="text-[10px] text-zinc-600">
                                      {new Date(ev.created_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-zinc-900/95 leading-relaxed font-medium italic">{"\"" + ev.evidence + "\""}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
