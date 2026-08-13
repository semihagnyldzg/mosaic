'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';
import { createClient } from '@/lib/supabase/client';

interface PageParams {
  studentId: string;
}

export default function StudentLearningPath({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = use(params);
  const studentId = resolvedParams.studentId;

  const { profile, loading: authLoading } = useAuth();
  const [student, setStudent] = useState<any>(null);
  const [path, setPath] = useState<any>(null);
  const [checks, setChecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return;
    if (!profile) {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        // Fetch student details
        const { data: std } = await supabase
          .from('students')
          .select('*, school:schools(name)')
          .eq('id', studentId)
          .single();
        setStudent(std);

        // Fetch active learning path
        const { data: pt } = await supabase
          .from('responsive_student_paths')
          .select('*, cycle:responsive_cycles(*)')
          .eq('student_id', studentId)
          .single();
        setPath(pt);

        // Fetch progress checks
        const { data: chks } = await supabase
          .from('responsive_progress_checks')
          .select('*')
          .eq('student_id', studentId)
          .order('check_date', { ascending: false });
        setChecks(chks || []);

      } catch (err) {
        console.error('Error loading student path page:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [profile, authLoading, studentId, router, supabase]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F9F8FC] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#5C2483]/30 border-t-[#5C2483] rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8FC] p-6 lg:p-10 text-zinc-900">
      <header className="max-w-6xl mx-auto flex justify-between items-center border-b border-zinc-200/60 pb-6 mb-8">
        <div>
          <div className="text-[#5C2483] text-xs font-bold tracking-wider uppercase">👤 INDIVIDUALIZED TIMELINE</div>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">{student?.first_name} {student?.last_name}</h1>
          <p className="text-zinc-600 text-sm mt-1">{student?.school?.name} • Grade 3</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/responsive')}
          className="bg-zinc-100 border border-zinc-200/50 border border-zinc-200 text-zinc-900 hover:bg-zinc-100 py-2.5 px-5 rounded-md font-semibold text-sm transition-colors cursor-pointer"
        >
          ← Back to Portal
        </button>
      </header>

      {/* Top Concise Summary Card */}
      <section className="max-w-6xl mx-auto bg-white border border-zinc-200/80 shadow-sm border border-[#5C2483]/10 rounded-xl p-6 shadow-xl grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Current Target</span>
          <p className="text-xs font-bold text-zinc-900 truncate">{path?.cycle?.learning_target || 'NC.3.NF.2 number lines'}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Current Need</span>
          <p className="text-xs font-bold text-zinc-900">{path?.current_need || 'Fraction Partitioning'}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Current Strategy</span>
          <p className="text-xs font-bold text-[#5C2483]">Manipulatives & Tiles</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Next Follow-up</span>
          <p className="text-xs font-bold text-zinc-900">July 25, 2026</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Current Progress</span>
          <p className="text-xs font-bold text-emerald-400">{checks[0]?.progress_rating || 'Making Progress'}</p>
        </div>
      </section>

      {/* Visual Timeline Section */}
      <section className="max-w-6xl mx-auto bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl space-y-6 mb-8">
        <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-200/60 pb-3">Learning Path Visualization</h3>
        
        {/* Timeline cards flow */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
          <div className="flex-1 bg-[#F9F8FC]/40 border border-zinc-200/60 rounded-lg p-4 space-y-2">
            <span className="text-[10px] text-[#5C2483] font-bold uppercase tracking-wider">Step 1: Goal Target</span>
            <p className="text-xs text-zinc-600">{path?.cycle?.learning_target || 'Represent fractions on a number line'}</p>
          </div>
          <div className="flex items-center justify-center text-zinc-900/20 text-lg hidden md:block">→</div>
          <div className="flex-1 bg-[#F9F8FC]/40 border border-zinc-200/60 rounded-lg p-4 space-y-2">
            <span className="text-[10px] text-[#5C2483] font-bold uppercase tracking-wider">Step 2: Logged Evidence</span>
            <p className="text-xs text-zinc-600 italic">"{checks[0]?.evidence_collected || 'Bart placed 2/3 at 1/3 point. Confuses partitioning counts with tick mark counts.'}"</p>
          </div>
          <div className="flex items-center justify-center text-zinc-900/20 text-lg hidden md:block">→</div>
          <div className="flex-1 bg-[#F9F8FC]/40 border border-[#5C2483]/10 rounded-lg p-4 space-y-2">
            <span className="text-[10px] text-[#5C2483] font-bold uppercase tracking-wider">Step 3: Response Strategy</span>
            <p className="text-xs text-zinc-600">Manipulatives & Number Line Tiles</p>
          </div>
          <div className="flex items-center justify-center text-zinc-900/20 text-lg hidden md:block">→</div>
          <div className="flex-1 bg-[#F9F8FC]/40 border border-zinc-200/60 rounded-lg p-4 space-y-2">
            <span className="text-[10px] text-[#5C2483] font-bold uppercase tracking-wider">Step 4: Next Decision</span>
            <p className="text-xs text-zinc-600 font-bold">{checks[0]?.next_decision || 'Continue the current strategy'}</p>
          </div>
        </div>
      </section>

      {/* Sections A-J content */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left column */}
        <div className="space-y-8">
          <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">A. Current Learning Path</h3>
            <div className="space-y-1 text-xs">
              <p className="text-zinc-600">**Curriculum Level Status:** {path?.curriculum_status || 'Temporary Small-Group Support'}</p>
              <p className="text-zinc-600">**Current Skill Rating:** {path?.current_proficiency_level || 'Developing'}</p>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">G. Learning History (Historical Cycles)</h3>
            {checks.length === 0 ? (
              <div className="text-xs text-zinc-600 italic">No historical cycles logged.</div>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {checks.map(c => (
                  <div key={c.id} className="bg-[#F9F8FC]/40 border border-zinc-200/60 rounded-lg p-4 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[10px] text-[#5C2483] font-bold">
                      <span>{new Date(c.check_date).toLocaleDateString()}</span>
                      <span>{c.progress_rating}</span>
                    </div>
                    <p className="text-zinc-600">**Evidence:** "{c.evidence_collected}"</p>
                    <p className="text-zinc-600">**Decision:** "{c.next_decision}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">H. PLC Connections</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              This student path is mapped to the **Grade 3 ELA PLC** and shared with Seymour Skinner for coordination reviews.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">I. Observation Connections</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              *Principal Walkthrough Observation (Conducted July 16, 2026):* Observed active strategy deployment of number line manipulatives. Student response was highly engaged.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
}
