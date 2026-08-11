'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';
import { createClient } from '@/lib/supabase/client';

interface PageParams {
  id: string;
}

export default function PlcMeetingReport({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = use(params);
  const meetingId = resolvedParams.id;

  const { profile, loading: authLoading } = useAuth();
  const [meeting, setMeeting] = useState<any>(null);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [studentGroups, setStudentGroups] = useState<any[]>([]);
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return;
    if (!profile) {
      router.push('/login');
      return;
    }

    const loadReportData = async () => {
      try {
        // Fetch meeting details
        const { data: mt } = await supabase
          .from('plc_meetings')
          .select('*, team:plc_teams(name, school:schools(name))')
          .eq('id', meetingId)
          .single();

        if (mt) {
          setMeeting(mt);

          // Fetch discussions
          const { data: disc } = await supabase
            .from('plc_discussions')
            .select('*')
            .eq('meeting_id', meetingId);
          setDiscussions(disc || []);

          // Fetch student groups
          const { data: grps } = await supabase
            .from('plc_student_groups')
            .select('id, name, members:plc_group_members(student:students(first_name, last_name))')
            .eq('meeting_id', meetingId);
          setStudentGroups(grps || []);

          // Fetch action items
          const { data: acts } = await supabase
            .from('plc_action_items')
            .select('*')
            .eq('meeting_id', meetingId);
          setActions(acts || []);
        }
      } catch (err) {
        console.error('Error loading report info:', err);
      } finally {
        setLoading(false);
      }
    };

    loadReportData();
  }, [profile, authLoading, meetingId, router, supabase]);

  const handlePrint = () => {
    window.print();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#64ffda]/30 border-t-[#64ffda] rounded-full animate-spin"></span>
      </div>
    );
  }

  const getDiscussionText = (key: string) => {
    const d = discussions.find(item => item.question_key === key);
    return d ? d.response_text : 'No notes entered.';
  };

  return (
    <div className="min-h-screen bg-[#0A192F] p-6 lg:p-10 text-white print:bg-white print:text-black print:p-0">
      
      {/* Screen action header (hidden on print) */}
      <header className="max-w-4xl mx-auto flex justify-between items-center border-b border-white/5 pb-6 mb-8 print:hidden">
        <div>
          <div className="text-[#64ffda] text-xs font-bold tracking-wider uppercase">📄 OFFICIAL RECORD</div>
          <h1 className="text-2xl font-extrabold text-white mt-1">PLC Cycle Report</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/dashboard/plc')}
            className="bg-white/5 border border-white/10 text-white hover:bg-white/10 py-2.5 px-4 rounded-md font-semibold text-xs cursor-pointer"
          >
            ← Back to Portal
          </button>
          <button
            onClick={handlePrint}
            className="bg-[#64ffda] text-[#0A192F] hover:bg-[#52e0c2] font-bold py-2.5 px-5 rounded-md text-xs transition-colors cursor-pointer"
          >
            🖨️ Print / Export PDF
          </button>
        </div>
      </header>

      {/* Main Report Container */}
      <article className="max-w-4xl mx-auto bg-[#172A45] border border-white/5 rounded-xl p-8 shadow-2xl space-y-8 print:bg-white print:text-black print:shadow-none print:border-none print:p-0">
        
        {/* Report Header metadata */}
        <div className="border-b border-white/10 pb-6 print:border-black/20">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[#64ffda] font-bold text-xs uppercase tracking-wider print:text-emerald-700">
                {meeting?.team.school.name || 'Springfield School District'}
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1 print:text-black">{meeting?.team.name}</h2>
              <p className="text-[#8892B0] text-sm mt-1 print:text-gray-600">
                Facilitated by Superintendent/PLC Leader • Date: {new Date(meeting?.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase print:border-emerald-600 print:text-emerald-700">
                {meeting?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Goals & targets */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0A192F]/40 border border-white/5 rounded-lg p-5 space-y-2 print:border-gray-200">
            <h3 className="text-[#64ffda] text-xs font-bold uppercase tracking-wider print:text-emerald-700">Objective & Standards</h3>
            <p className="text-sm font-semibold text-white/95 print:text-black">{meeting?.objective}</p>
            <p className="text-xs text-[#8892B0] print:text-gray-500 pt-1">
              **Standard Reference:** {meeting?.standard}
            </p>
          </div>
          
          <div className="bg-[#0A192F]/40 border border-white/5 rounded-lg p-5 space-y-2 print:border-gray-200">
            <h3 className="text-[#64ffda] text-xs font-bold uppercase tracking-wider print:text-emerald-700">Target & Success Criteria</h3>
            <p className="text-sm font-semibold text-white/95 print:text-black">{meeting?.learning_target}</p>
            <p className="text-xs text-[#8892B0] print:text-gray-500 pt-1">
              **Success Criteria:** {meeting?.success_criteria}
            </p>
          </div>
        </section>

        {/* Student groupings */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-white border-b border-white/5 pb-2 print:text-black print:border-black/20">
            Flexible Student Groupings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentGroups.map(grp => (
              <div key={grp.id} className="bg-[#0A192F]/40 border border-white/5 rounded-lg p-4 space-y-2 print:border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-xs print:text-black">{grp.name}</span>
                  <span className="bg-white/5 text-[10px] px-2 py-0.5 rounded text-[#8892B0] print:bg-gray-100 print:text-gray-600">
                    {grp.members.length} Students
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {grp.members.map((m: any, idx: number) => (
                    <span key={idx} className="bg-[#172A45] border border-white/10 text-white text-[9px] px-2 py-0.5 rounded print:bg-gray-100 print:text-black print:border-gray-300">
                      {m.student.first_name} {m.student.last_name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Root cause analysis */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-white border-b border-white/5 pb-2 print:text-black print:border-black/20">
            Root Cause Discussion Analysis
          </h3>
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="bg-[#0A192F]/20 p-4 rounded-lg border border-white/5 print:border-gray-200">
              <h4 className="font-bold text-white print:text-black mb-1">What did students learn?</h4>
              <p className="text-[#8892B0] print:text-gray-700 italic">"{getDiscussionText('what_students_learned')}"</p>
            </div>
            <div className="bg-[#0A192F]/20 p-4 rounded-lg border border-white/5 print:border-gray-200">
              <h4 className="font-bold text-white print:text-black mb-1">Common misconceptions & instruction analysis</h4>
              <p className="text-[#8892B0] print:text-gray-700 italic">"{getDiscussionText('root_causes')}"</p>
            </div>
          </div>
        </section>

        {/* Action items plan */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-white border-b border-white/5 pb-2 print:text-black print:border-black/20">
            Instructional Actions & Tasks Plan
          </h3>
          {actions.length === 0 ? (
            <div className="text-xs text-[#8892B0] italic">No action items recorded for this cycle.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[#64ffda] uppercase font-bold tracking-wider print:border-black/20 print:text-black">
                    <th className="pb-2">Action / Strategy</th>
                    <th className="pb-2">Deadline</th>
                    <th className="pb-2">Task Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-gray-200">
                  {actions.map((act, idx) => (
                    <tr key={idx}>
                      <td className="py-3 text-white/95 print:text-black font-semibold">{act.action}</td>
                      <td className="py-3 text-[#8892B0] print:text-gray-700">{new Date(act.deadline).toLocaleDateString()}</td>
                      <td className="py-3">
                        <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] print:border-emerald-600 print:text-emerald-700">
                          {act.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </article>
    </div>
  );
}
