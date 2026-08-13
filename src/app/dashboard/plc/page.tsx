'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';
import { createClient } from '@/lib/supabase/client';

interface Meeting {
  id: string;
  date: string;
  objective: string;
  standard: string;
  learning_target: string;
  status: string;
  team: {
    name: string;
  };
}

interface ActionItem {
  id: string;
  action: string;
  deadline: string;
  status: string;
  evidence_to_collect: string;
  meeting_id: string;
  meeting: {
    standard: string;
  };
}

interface PlcTeam {
  id: string;
  name: string;
  is_leader: boolean;
}

export default function PlcDashboard() {
  const { profile, loading: authLoading } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [teams, setTeams] = useState<PlcTeam[]>([]);
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
        // Fetch teams the user belongs to
        const { data: memberTeams } = await supabase
          .from('plc_team_members')
          .select('is_leader, team:plc_teams(id, name)')
          .eq('user_id', profile.id);

        const formattedTeams = (memberTeams || []).map((t: any) => ({
          id: t.team.id,
          name: t.team.name,
          is_leader: t.is_leader
        }));
        setTeams(formattedTeams);

        const teamIds = formattedTeams.map(t => t.id);

        // Fetch meetings for those teams
        if (teamIds.length > 0) {
          const { data: meetingsData } = await supabase
            .from('plc_meetings')
            .select('id, date, objective, standard, learning_target, status, team:plc_teams(name)')
            .in('team_id', teamIds)
            .order('date', { ascending: false });

          setMeetings(meetingsData as any || []);

          // Fetch action items assigned to user
          const { data: actionsData } = await supabase
            .from('plc_action_items')
            .select('id, action, deadline, status, evidence_to_collect, meeting_id, meeting:plc_meetings(standard)')
            .eq('owner_id', profile.id)
            .order('deadline', { ascending: true });

          setActionItems(actionsData as any || []);
        } else if (profile.role === 'principal' || profile.role === 'district_admin') {
          // Administrators can see all meetings/action items in their school/district
          const { data: allMeetings } = await supabase
            .from('plc_meetings')
            .select('id, date, objective, standard, learning_target, status, team:plc_teams(name)')
            .order('date', { ascending: false });

          setMeetings(allMeetings as any || []);
        }

      } catch (err) {
        console.error('Error fetching PLC portal data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profile, authLoading, router, supabase]);

  const toggleActionStatus = async (itemId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Completed' ? 'In Progress' : 'Completed';
    try {
      const { error } = await supabase
        .from('plc_action_items')
        .update({ status: nextStatus })
        .eq('id', itemId);

      if (error) throw error;

      // Update state local check
      setActionItems(prev => prev.map(item => item.id === itemId ? { ...item, status: nextStatus } : item));
    } catch (err) {
      console.error('Error toggling action item:', err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F9F8FC] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#5C2483]/30 border-t-[#5C2483] rounded-full animate-spin"></span>
      </div>
    );
  }

  const isTeacherOrLeader = profile?.role === 'teacher' || teams.some(t => t.is_leader);

  return (
    <div className="min-h-screen bg-[#F9F8FC] p-6 lg:p-10 text-zinc-900">
      <header className="max-w-7xl mx-auto flex justify-between items-center border-b border-zinc-200/60 pb-6 mb-8">
        <div>
          <div className="text-[#5C2483] text-xs font-bold tracking-wider uppercase">📋 PLC COLLABORATION HUB</div>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">PLC Meeting Module</h1>
          <p className="text-zinc-600 text-sm mt-1">{profile?.first_name} {profile?.last_name} ({profile?.role?.toUpperCase()})</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push(profile?.role === 'teacher' ? '/dashboard/teacher' : '/dashboard/school')}
            className="bg-zinc-100 border border-zinc-200/50 border border-zinc-200 text-zinc-900 hover:bg-zinc-100 py-2.5 px-5 rounded-md font-semibold text-sm transition-colors cursor-pointer"
          >
            ← Back to Main Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Meetings List */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-200/60 pb-4">
              <h2 className="text-xl font-bold text-zinc-900">PLC Meetings</h2>
              {isTeacherOrLeader && meetings.length > 0 && (
                <button
                  onClick={() => router.push(`/dashboard/plc/run/${meetings[0].id}`)}
                  className="bg-[#5C2483] text-white hover:bg-[#4A154B] font-bold py-2 px-4 rounded-md text-sm transition-colors cursor-pointer"
                >
                  🚀 Run Active Meeting
                </button>
              )}
            </div>

            {meetings.length === 0 ? (
              <div className="text-center py-12 text-zinc-600">
                No PLC meetings scheduled yet. Contact your school administrator to schedule a cycle.
              </div>
            ) : (
              <div className="space-y-4">
                {meetings.map(meeting => (
                  <div 
                    key={meeting.id} 
                    className="bg-[#F9F8FC]/40 border border-zinc-200/60 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-zinc-200 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#5C2483] text-xs font-bold uppercase tracking-wider">{meeting.team.name}</span>
                        <span className="text-zinc-900/30 text-xs">•</span>
                        <span className="text-zinc-600 text-xs">{new Date(meeting.date).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-bold text-zinc-900 text-base leading-snug">{meeting.objective}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-zinc-100 border border-zinc-200/50 border border-zinc-200 text-zinc-900/80 text-[10px] font-bold px-2 py-0.5 rounded">
                          Standard: {meeting.standard}
                        </span>
                        <span className="text-xs text-zinc-600 truncate max-w-xs">{meeting.learning_target}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        meeting.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {meeting.status.toUpperCase()}
                      </span>
                      <button
                        onClick={() => router.push(meeting.status === 'completed' ? `/dashboard/plc/report/${meeting.id}` : `/dashboard/plc/run/${meeting.id}`)}
                        className="bg-[#5C2483]/10 border border-[#5C2483]/20 text-[#5C2483] hover:bg-[#5C2483]/20 py-2 px-4 rounded-md font-bold text-xs transition-colors cursor-pointer"
                      >
                        {meeting.status === 'completed' ? '📄 View Report' : '✏️ Resume'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Action Items & Team Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* Action Items Checklist */}
          {profile?.role === 'teacher' && (
            <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-200/60 pb-3">My Assigned Actions</h3>
              {actionItems.length === 0 ? (
                <div className="text-sm text-zinc-600 py-4">You have no active action items assigned.</div>
              ) : (
                <div className="space-y-3">
                  {actionItems.map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-start gap-3 bg-[#F9F8FC]/40 p-3 rounded-lg border border-zinc-200/60"
                    >
                      <input 
                        type="checkbox"
                        checked={item.status === 'Completed'}
                        onChange={() => toggleActionStatus(item.id, item.status)}
                        className="mt-1 accent-[#64ffda] cursor-pointer"
                      />
                      <div className="space-y-1 text-xs">
                        <p className={`font-semibold text-zinc-900/95 leading-normal ${
                          item.status === 'Completed' ? 'line-through text-zinc-900/40' : ''
                        }`}>
                          {item.action}
                        </p>
                        <div className="flex justify-between items-center text-[10px] text-zinc-600 pt-1">
                          <span>Standard: {item.meeting.standard}</span>
                          <span>Due: {new Date(item.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Team Members info */}
          <div className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-zinc-900 border-b border-zinc-200/60 pb-3">My PLC Teams</h3>
            {teams.length === 0 ? (
              <div className="text-sm text-zinc-600 py-4">You are not currently enrolled in any PLC teams.</div>
            ) : (
              <div className="space-y-2">
                {teams.map(t => (
                  <div key={t.id} className="flex justify-between items-center bg-[#F9F8FC]/40 p-3 rounded-lg border border-zinc-200/60">
                    <span className="font-semibold text-zinc-900 text-sm">{t.name}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      t.is_leader ? 'bg-[#5C2483]/10 text-[#5C2483]' : 'bg-zinc-100 border border-zinc-200/50 text-zinc-600'
                    }`}>
                      {t.is_leader ? 'Leader' : 'Member'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
