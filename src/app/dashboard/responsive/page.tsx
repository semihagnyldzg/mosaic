'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';
import { createClient } from '@/lib/supabase/client';

interface ResponsiveCycle {
  id: string;
  subject: string;
  grade_level: string;
  lesson_unit: string;
  standard: string;
  learning_target: string;
  status: string;
  created_at: string;
}

interface Student {
  id: string;
  first_name: string;
  last_name: string;
}

export default function ResponsivePortal() {
  const { profile, loading: authLoading } = useAuth();
  const [cycles, setCycles] = useState<ResponsiveCycle[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return;
    if (!profile) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch active cycles
        const { data: cyclesData } = await supabase
          .from('responsive_cycles')
          .select('*')
          .order('updated_at', { ascending: false });

        setCycles(cyclesData || []);

        // Fetch students
        const { data: stds } = await supabase
          .from('students')
          .select('id, first_name, last_name');
        setStudents(stds || []);
      } catch (err) {
        console.error('Error fetching Responsive portal data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profile, authLoading, router, supabase]);

  const handleStartCycle = async () => {
    if (!profile) return;
    try {
      const { data: newCycle, error } = await supabase
        .from('responsive_cycles')
        .insert({
          teacher_id: profile.id,
          subject: 'Mathematics',
          grade_level: '3rd Grade',
          standard: 'NC.3.NF.2',
          lesson_unit: 'Draft Unit',
          learning_target: 'Identify partitioning errors',
          success_criteria: 'Represent thirds on a number line',
          status: 'draft'
        })
        .select('id')
        .single();

      if (error) throw error;
      router.push(`/dashboard/responsive/run/${newCycle.id}`);
    } catch (err) {
      console.error('Error launching responsive cycle:', err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#64ffda]/30 border-t-[#64ffda] rounded-full animate-spin"></span>
      </div>
    );
  }

  const isPrincipal = profile?.role === 'principal';
  const isDistrict = profile?.role === 'district_admin';

  return (
    <div className="min-h-screen bg-[#0A192F] p-6 lg:p-10 text-white">
      <header className="max-w-7xl mx-auto flex justify-between items-center border-b border-white/5 pb-6 mb-8">
        <div>
          <div className="text-[#64ffda] text-xs font-bold tracking-wider uppercase">⚡ RESPONSIVE LEARNING PATHWAY</div>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">Responsive Instruction</h1>
          <p className="text-[#8892B0] text-sm mt-1">{profile?.first_name} {profile?.last_name} ({profile?.role?.toUpperCase()})</p>
        </div>
        <div className="flex gap-3">
          {!isPrincipal && !isDistrict && (
            <button
              onClick={handleStartCycle}
              className="bg-[#64ffda] text-[#0A192F] hover:bg-[#52e0c2] font-bold py-2.5 px-5 rounded-md text-sm transition-colors cursor-pointer"
            >
              ➕ Start Responsive Cycle
            </button>
          )}
          <button
            onClick={() => router.push(profile?.role === 'teacher' ? '/dashboard/teacher' : '/dashboard/school')}
            className="bg-white/5 border border-white/10 text-white hover:bg-white/10 py-2.5 px-5 rounded-md font-semibold text-sm transition-colors cursor-pointer"
          >
            ← Back to Main Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* TEACHER DASHBOARD */}
        {!isPrincipal && !isDistrict && (
          <>
            <div className="lg:col-span-8 space-y-8">
              {/* Active Learning Cycles */}
              <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl space-y-6">
                <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">Active Learning Cycles</h2>
                {cycles.length === 0 ? (
                  <div className="text-center py-12 text-[#8892B0] text-sm">
                    No active instruction cycles registered. Click "Start Responsive Cycle" to create your first workflow.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cycles.map(cycle => (
                      <div key={cycle.id} className="bg-[#0A192F]/40 border border-white/5 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[#64ffda] text-xs font-bold uppercase tracking-wider">{cycle.subject}</span>
                            <span className="text-white/30 text-xs">•</span>
                            <span className="text-[#8892B0] text-xs">Standard: {cycle.standard}</span>
                          </div>
                          <h3 className="font-bold text-white text-base leading-snug">{cycle.learning_target}</h3>
                          <p className="text-xs text-[#8892B0]">Unit: {cycle.lesson_unit} • Grade: {cycle.grade_level}</p>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            cycle.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {cycle.status.toUpperCase()}
                          </span>
                          <button
                            onClick={() => router.push(`/dashboard/responsive/run/${cycle.id}`)}
                            className="bg-[#64ffda]/10 border border-[#64ffda]/20 text-[#64ffda] hover:bg-[#64ffda]/20 py-2 px-4 rounded-md font-bold text-xs transition-colors cursor-pointer"
                          >
                            {cycle.status === 'draft' ? '✏️ Resume Cycle' : '🔍 View / Edit'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Roster & Student Pathways List */}
              <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl space-y-6">
                <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">Individual Student Learning Paths</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {students.map(s => (
                    <div 
                      key={s.id} 
                      onClick={() => router.push(`/dashboard/responsive/student/${s.id}`)}
                      className="bg-[#0A192F]/40 border border-white/5 rounded-lg p-4 hover:border-[#64ffda]/20 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-white text-sm">{s.first_name} {s.last_name}</h4>
                        <span className="text-[10px] text-[#64ffda] font-bold uppercase">View Timeline →</span>
                      </div>
                      <p className="text-xs text-[#8892B0] leading-normal">
                        Active math and ELA standards intervention history recorded.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right widgets */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl space-y-4">
                <h3 className="text-base font-bold text-white border-b border-white/5 pb-3">Active Strategy Usage</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8892B0]">Manipulatives & Tiles</span>
                    <span className="text-white font-bold">1 active</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8892B0]">Project independent inquiry</span>
                    <span className="text-white font-bold">1 active</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PRINCIPAL DASHBOARD VIEW */}
        {isPrincipal && (
          <div className="lg:col-span-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl space-y-2">
                <span className="text-xs text-[#8892B0] font-bold uppercase tracking-wider">Most Common Learning Needs</span>
                <h3 className="text-2xl font-extrabold text-white">Fraction Partitioning</h3>
              </div>
              <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl space-y-2">
                <span className="text-xs text-[#8892B0] font-bold uppercase tracking-wider">Common Instructional Strategy</span>
                <h3 className="text-2xl font-extrabold text-[#64ffda]">Manipulatives</h3>
              </div>
              <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl space-y-2">
                <span className="text-xs text-[#8892B0] font-bold uppercase tracking-wider">Follow-Up Completion Rate</span>
                <h3 className="text-2xl font-extrabold text-emerald-400">100%</h3>
              </div>
            </div>

            <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3">Growth Trends across Grades</h3>
              <div className="text-center py-10 text-[#8892B0] text-sm">
                📈 Aggregated growth curves based on student performance transition levels.
              </div>
            </div>
          </div>
        )}

        {/* DISTRICT DASHBOARD VIEW */}
        {isDistrict && (
          <div className="lg:col-span-12 space-y-8">
            <div className="bg-[#172A45] border border-white/5 rounded-xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3">District Strategy Deployment Aggregates</h3>
              <div className="text-center py-10 text-[#8892B0] text-sm">
                📊 School comparison and research-strategy usage indices (Individual student details hidden).
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
