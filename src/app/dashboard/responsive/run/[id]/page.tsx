'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';
import { createClient } from '@/lib/supabase/client';

interface PageParams {
  id: string;
}

interface Student {
  id: string;
  first_name: string;
  last_name: string;
}

export default function ResponsiveCycleWizard({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = use(params);
  const cycleId = resolvedParams.id;

  const { profile, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [cycle, setCycle] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [standardsList, setStandardsList] = useState<any[]>([]);
  const [skillsList, setSkillsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [subject, setSubject] = useState('Mathematics');
  const [gradeLevel, setGradeLevel] = useState('3rd Grade');
  const [standard, setStandard] = useState('');
  const [lessonUnit, setLessonUnit] = useState('');
  const [learningTarget, setLearningTarget] = useState('');
  const [successCriteria, setSuccessCriteria] = useState('');

  // Evidence logs
  const [evidenceList, setEvidenceList] = useState<any[]>([]);
  const [newEvidenceStudent, setNewEvidenceStudent] = useState('');
  const [newEvidenceType, setNewEvidenceType] = useState('exit_ticket');
  const [newEvidenceNotes, setNewEvidenceNotes] = useState('');

  // Groupings
  const [groups, setGroups] = useState<any[]>([]);
  const [groupStudents, setGroupStudents] = useState<Record<string, Student[]>>({});
  const [studentLevels, setStudentLevels] = useState<Record<string, string>>({});
  const [newGroupName, setNewGroupName] = useState('');

  // Strategy Action
  const [strategies, setStrategies] = useState<any[]>([]);
  const [newStrategyName, setNewStrategyName] = useState('');
  const [newStrategyOwner, setNewStrategyOwner] = useState('');
  const [newStrategyDeadline, setNewStrategyDeadline] = useState('');

  // Progress check
  const [checkEvidence, setCheckEvidence] = useState('');
  const [checkRating, setCheckRating] = useState('Making Progress');
  const [strategyWorking, setStrategyWorking] = useState(true);
  const [needRemains, setNeedRemains] = useState(false);

  // Reflection & Next Steps
  const [reflectionWorked, setReflectionWorked] = useState('');
  const [reflectionNotWorked, setReflectionNotWorked] = useState('');
  const [reflectionReveal, setReflectionReveal] = useState('');
  const [reflectionChange, setReflectionChange] = useState('');
  const [nextDecision, setNextDecision] = useState('Continue the current strategy');

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
        const { data: cy } = await supabase
          .from('responsive_cycles')
          .select('*')
          .eq('id', cycleId)
          .single();

        if (cy) {
          setCycle(cy);
          setSubject(cy.subject || 'Mathematics');
          setGradeLevel(cy.grade_level || '3rd Grade');
          setStandard(cy.standard || '');
          setLessonUnit(cy.lesson_unit || '');
          setLearningTarget(cy.learning_target || '');
          setSuccessCriteria(cy.success_criteria || '');

          const { data: stds } = await supabase.from('students').select('id, first_name, last_name');
          setStudents(stds || []);

          // Fetch standards list
          const { data: stdsList, error: stdsErr } = await supabase.from('standards').select('*').order('code');
          if (stdsErr) console.error("Standards Fetch Error:", stdsErr);
          setStandardsList(stdsList || []);

          // Fetch skills list
          const { data: sks, error: sksErr } = await supabase.from('skills').select('id, name');
          if (sksErr) console.error("Skills Fetch Error:", sksErr);
          setSkillsList(sks || []);

          const { data: evs } = await supabase
            .from('responsive_evidence')
            .select('*, student:students(first_name, last_name)')
            .eq('cycle_id', cycleId);
          setEvidenceList(evs || []);

          const { data: grps } = await supabase
            .from('responsive_student_groups')
            .select('*, members:responsive_group_members(student_id, performance_level, student:students(id, first_name, last_name))')
            .eq('cycle_id', cycleId);
          setGroups(grps || []);

          const initialRoster: Record<string, Student[]> = {};
          const initialLevels: Record<string, string> = {};
          
          grps?.forEach((g: any) => {
            initialRoster[g.id] = (g.members || []).map((m: any) => m.student).filter(Boolean);
            (g.members || []).forEach((m: any) => {
              initialLevels[m.student_id] = m.performance_level;
            });
          });
          setGroupStudents(initialRoster);
          setStudentLevels(initialLevels);

          if (grps && grps.length > 0) {
            const grpIds = grps.map(g => g.id);
            const { data: strats } = await supabase
              .from('responsive_strategies')
              .select('*, group:responsive_student_groups(name)')
              .in('group_id', grpIds);
            setStrategies(strats || []);
          }
        }
      } catch (err) {
        console.error('Error loading cycle data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [profile, authLoading, cycleId, router, supabase]);

  const handleSaveStep = async () => {
    if (!cycle) return;
    try {
      await supabase
        .from('responsive_cycles')
        .update({
          subject,
          grade_level: gradeLevel,
          standard,
          lesson_unit: lessonUnit,
          learning_target: learningTarget,
          success_criteria: successCriteria,
          updated_at: new Date().toISOString()
        })
        .eq('id', cycleId);
    } catch (err) {
      console.error('Error saving cycle parameters:', err);
    }
  };

  const handleAddEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvidenceStudent || !newEvidenceNotes.trim()) return;

    try {
      const selectedStd = standardsList.find(s => s.code === standard);
      const { data, error } = await supabase
        .from('responsive_evidence')
        .insert({
          cycle_id: cycleId,
          student_id: newEvidenceStudent,
          class_id: 'c0000001-0000-0000-0000-000000000000',
          evidence_type: newEvidenceType,
          notes: newEvidenceNotes.trim(),
          skill_id: selectedStd?.skill_id || null,
          standard: standard,
          collected_date: new Date().toISOString().split('T')[0]
        })
        .select('*, student:students(first_name, last_name)')
        .single();

      if (error) throw error;
      setEvidenceList(prev => [...prev, data]);
      setNewEvidenceNotes('');
    } catch (err) {
      console.error('Error logging student evidence:', err);
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    try {
      const { data, error } = await supabase
        .from('responsive_student_groups')
        .insert({
          cycle_id: cycleId,
          name: newGroupName.trim()
        })
        .select('*')
        .single();

      if (error) throw error;
      setGroups(prev => [...prev, data]);
      setGroupStudents(prev => ({ ...prev, [data.id]: [] }));
      setNewGroupName('');
    } catch (err) {
      console.error('Error creating group need category:', err);
    }
  };

  const handleAssignStudentToGroup = async (studentId: string, groupId: string, level: string) => {
    try {
      const grpIds = groups.map(g => g.id);
      await supabase
        .from('responsive_group_members')
        .delete()
        .eq('student_id', studentId)
        .in('group_id', grpIds);

      await supabase
        .from('responsive_group_members')
        .insert({
          group_id: groupId,
          student_id: studentId,
          performance_level: level
        });

      const targetStudent = students.find(s => s.id === studentId);
      if (!targetStudent) return;

      setGroupStudents(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(k => {
          updated[k] = updated[k].filter(s => s.id !== studentId);
        });
        updated[groupId] = [...(updated[groupId] || []), targetStudent];
        return updated;
      });

      setStudentLevels(prev => ({ ...prev, [studentId]: level }));
    } catch (err) {
      console.error('Error assigning student:', err);
    }
  };

  const handleAddStrategy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStrategyName || !newStrategyOwner || !newStrategyDeadline) return;

    try {
      if (groups.length === 0) return;
      const targetGroupId = groups[0].id;

      const { data, error } = await supabase
        .from('responsive_strategies')
        .insert({
          group_id: targetGroupId,
          strategy_name: newStrategyName,
          responsible_teacher_id: newStrategyOwner,
          start_date: new Date().toISOString().split('T')[0],
          followup_date: newStrategyDeadline,
          evidence_to_collect: 'Exit ticket scores & observed behavior',
          status: 'Not Started'
        })
        .select('*, group:responsive_student_groups(name)')
        .single();

      if (error) throw error;
      setStrategies(prev => [...prev, data]);
      setNewStrategyName('');
      setNewStrategyDeadline('');
    } catch (err) {
      console.error('Error adding strategy plan:', err);
    }
  };

  const handleCompleteCycle = async () => {
    await handleSaveStep();
    try {
      // Create student paths and progress checks for all students in group lists
      for (const group of groups) {
        const grpStds = groupStudents[group.id] || [];
        for (const s of grpStds) {
          // Update / Upsert student learning paths
          await supabase
            .from('responsive_student_paths')
            .upsert({
              student_id: s.id,
              cycle_id: cycleId,
              current_need: group.name,
              current_proficiency_level: studentLevels[s.id] || 'Beginning',
              current_group_id: group.id,
              curriculum_status: 'Temporary Small-Group Support'
            }, { onConflict: 'student_id,cycle_id' });

          // Insert progress check details
          await supabase
            .from('responsive_progress_checks')
            .insert({
              student_id: s.id,
              cycle_id: cycleId,
              evidence_collected: checkEvidence || 'Initial diagnostic cycle check',
              progress_rating: checkRating,
              strategy_working: strategyWorking,
              need_remains: needRemains,
              next_decision: nextDecision,
              reflection_worked: reflectionWorked || 'Strategy alignment worked',
              reflection_not_worked: reflectionNotWorked || 'Scaffolding gaps persist',
              reflection_reveal: reflectionReveal || 'Needs direct feedback loops',
              reflection_change: reflectionChange || 'Deploy visuals next',
              share_with_plc: true
            });
        }
      }

      await supabase
        .from('responsive_cycles')
        .update({ status: 'active' })
        .eq('id', cycleId);
      router.push('/dashboard/responsive');
    } catch (err) {
      console.error('Error completing draft cycle:', err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F9F8FC] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#5C2483]/30 border-t-[#5C2483] rounded-full animate-spin"></span>
      </div>
    );
  }

  const stepsList = [
    'Target & Evidence',
    'Needs & Groups',
    'Strategies & Actions',
    'Progress Check',
    'Next Learning Path'
  ];

  return (
    <div className="min-h-screen bg-[#F9F8FC] p-6 lg:p-10 text-zinc-900">
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-200/60 pb-6 mb-8 gap-4">
        <div>
          <div className="text-[#5C2483] text-xs font-bold tracking-wider uppercase">⚡ RESPONSIVE LEARNING CYCLE</div>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">Intervention & Extension Wizard</h1>
          <p className="text-zinc-600 text-sm mt-1">{cycle?.subject} • Grade 3</p>
        </div>
        <button
          onClick={async () => {
            await handleSaveStep();
            router.push('/dashboard/responsive');
          }}
          className="bg-zinc-100 border border-zinc-200/50 border border-zinc-200 text-zinc-900 hover:bg-zinc-100 py-2.5 px-5 rounded-md font-semibold text-sm transition-colors cursor-pointer"
        >
          Save Draft & Exit
        </button>
      </header>

      {/* Progress tracker */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-white border border-zinc-200/80 shadow-sm/40 border border-zinc-200/60 rounded-lg p-2 max-w-2xl mx-auto">
          {stepsList.map((stepLabel, idx) => (
            <button
              key={idx}
              onClick={async () => {
                await handleSaveStep();
                setStep(idx + 1);
              }}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                step === idx + 1 ? 'bg-[#5C2483] text-white' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {stepLabel}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto bg-white border border-zinc-200/80 shadow-sm border border-zinc-200/60 rounded-xl p-8 shadow-2xl space-y-6">
        
        {/* STEP 1: Target & Evidence */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">Step 1: Targets & Evidence</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setStandard('');
                  }}
                  className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs focus:outline-none"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English Language Arts">English Language Arts</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Standard Code</label>
                <select 
                  value={standard} 
                  onChange={(e) => setStandard(e.target.value)} 
                  className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2.5 px-3 text-zinc-900 text-xs focus:outline-none"
                >
                  <option value="">Select Standard...</option>
                  {standardsList.filter(s => s.subject === subject).map(s => (
                    <option key={s.id} value={s.code}>{s.code} - {s.description.substring(0, 50)}...</option>
                  ))}
                </select>
                {(() => {
                  const selected = standardsList.find(s => s.code === standard && s.subject === subject);
                  const associatedSkill = selected ? skillsList.find(sk => sk.id === selected.skill_id) : null;
                  if (!associatedSkill) return null;
                  return (
                    <div className="mt-2 text-xs text-[#5C2483] bg-[#5C2483]/10 border border-[#5C2483]/20 py-1.5 px-3 rounded flex items-center gap-2">
                      <span>🎯 Associated Skill/Practice:</span>
                      <span className="font-bold uppercase tracking-wider">{associatedSkill.name}</span>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Lesson / Unit</label>
                <input 
                  type="text" 
                  value={lessonUnit} 
                  onChange={(e) => setLessonUnit(e.target.value)} 
                  placeholder="e.g. Fractions Unit 2"
                  className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Learning Target</label>
                <input 
                  type="text" 
                  value={learningTarget} 
                  onChange={(e) => setLearningTarget(e.target.value)} 
                  placeholder="e.g. Represent fractions on a number line"
                  className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Success Criteria</label>
              <textarea 
                value={successCriteria} 
                onChange={(e) => setSuccessCriteria(e.target.value)} 
                placeholder="Describe how students demonstrate mastery..."
                className="w-full h-20 bg-[#F9F8FC]/60 border border-zinc-200 rounded p-3 text-zinc-900 text-xs focus:outline-none resize-none"
              />
            </div>

            {/* Evidence Logger */}
            <div className="border-t border-zinc-200/60 pt-6 space-y-4">
              <h3 className="text-base font-bold text-zinc-900">Log Student Evidence</h3>
              {evidenceList.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {evidenceList.map(ev => (
                    <div key={ev.id} className="bg-[#F9F8FC]/40 p-3 rounded border border-zinc-200/60 text-xs">
                      <div className="flex justify-between items-center text-[10px] text-[#5C2483] font-bold">
                        <span>{ev.student?.first_name} {ev.student?.last_name}</span>
                        <span className="uppercase text-zinc-900/50">{ev.evidence_type}</span>
                      </div>
                      <p className="text-zinc-600 mt-1.5 leading-relaxed">"{ev.notes}"</p>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleAddEvidence} className="bg-[#F9F8FC]/20 p-4 rounded border border-zinc-200/60 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-4">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">Select Student</label>
                  <select 
                    value={newEvidenceStudent}
                    onChange={(e) => setNewEvidenceStudent(e.target.value)}
                    className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-1.5 px-3 text-zinc-900 text-xs"
                    required
                  >
                    <option value="">Choose Student...</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-4">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">Evidence Source</label>
                  <select 
                    value={newEvidenceType}
                    onChange={(e) => setNewEvidenceType(e.target.value)}
                    className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-1.5 px-3 text-zinc-900 text-xs"
                  >
                    <option value="exit_ticket">Exit Ticket</option>
                    <option value="observation">Observation Log</option>
                    <option value="student_work">Student Work Sample</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>
                <div className="md:col-span-4">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">Observational Notes</label>
                  <input 
                    type="text" 
                    value={newEvidenceNotes}
                    onChange={(e) => setNewEvidenceNotes(e.target.value)}
                    className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-1.5 px-3 text-zinc-900 text-xs focus:outline-none"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="md:col-span-12 w-full bg-[#5C2483]/10 border border-[#5C2483]/20 text-[#5C2483] hover:bg-[#5C2483]/20 py-2 rounded text-xs font-bold cursor-pointer"
                >
                  ➕ Log Evidence Card
                </button>
              </form>
            </div>
          </div>
        )}

        {/* STEP 2: Learning Needs & Groups */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">Step 2: Learning Needs & Flexible Groups</h2>
            <div className="flex gap-3 bg-[#F9F8FC]/20 p-4 rounded border border-zinc-200/60">
              <input 
                type="text" 
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g. Fraction Partitioning..."
                className="flex-1 bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs focus:outline-none"
              />
              <button 
                onClick={handleCreateGroup}
                className="bg-[#5C2483] text-white hover:bg-[#4A154B] font-bold py-2 px-4 rounded text-xs cursor-pointer"
              >
                Create Group
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4 bg-[#F9F8FC]/40 border border-zinc-200/60 rounded-lg p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C2483]">Student Roster</h4>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {students.map(s => (
                    <div key={s.id} className="bg-white border border-zinc-200/80 shadow-sm p-2.5 rounded border border-zinc-200/60 space-y-2">
                      <span className="font-bold text-zinc-900 text-xs block">{s.first_name} {s.last_name}</span>
                      
                      <div className="grid grid-cols-2 gap-1 text-[9px]">
                        <div>
                          <label className="text-zinc-600 block mb-0.5">Need Group</label>
                          <select 
                            onChange={(e) => handleAssignStudentToGroup(s.id, e.target.value, studentLevels[s.id] || 'Beginning')}
                            className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded text-zinc-900 p-0.5"
                            defaultValue=""
                          >
                            <option value="" disabled>Assign...</option>
                            {groups.map(g => (
                              <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-zinc-600 block mb-0.5">Rating Level</label>
                          <select 
                            onChange={(e) => {
                              const assignedGroupId = Object.keys(groupStudents).find(k => groupStudents[k].some(item => item.id === s.id));
                              if (assignedGroupId) {
                                handleAssignStudentToGroup(s.id, assignedGroupId, e.target.value);
                              } else {
                                setStudentLevels(prev => ({ ...prev, [s.id]: e.target.value }));
                              }
                            }}
                            value={studentLevels[s.id] || 'Beginning'}
                            className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded text-zinc-900 p-0.5"
                          >
                            <option value="Beginning">Beginning</option>
                            <option value="Developing">Developing</option>
                            <option value="Approaching Proficiency">Approaching</option>
                            <option value="Proficient">Proficient</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      {studentLevels[s.id] === 'Advanced' && (
                        <div className="bg-[#5C2483]/10 border border-[#5C2483]/20 rounded p-1.5 text-[9px] text-[#5C2483] font-bold text-center">
                          🎯 Pathway: Ready for Extension!
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-8 space-y-3">
                {groups.map(grp => (
                  <div key={grp.id} className="bg-[#F9F8FC]/20 border border-zinc-200/60 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs border-b border-zinc-200/60 pb-2">
                      <span className="font-bold text-[#5C2483]">{grp.name}</span>
                      <span className="text-[10px] text-zinc-600">{(groupStudents[grp.id] || []).length} Students</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {((groupStudents[grp.id] || [])).map(s => (
                        <div key={s.id} className="bg-white border border-zinc-200/80 shadow-sm border border-zinc-200 rounded-full px-3 py-1 text-[10px] flex items-center gap-2">
                          <span className="font-bold text-zinc-900">{s.first_name} {s.last_name}</span>
                          <span className="text-zinc-600 text-[8px] bg-zinc-100 border border-zinc-200/50 px-1.5 py-0.5 rounded-full">{studentLevels[s.id]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Strategies & Actions */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">Step 3: Strategies & Actions</h2>
            
            <div className="space-y-3">
              <h3 className="text-base font-bold text-zinc-900">Instructional Strategy Plan</h3>
              {strategies.map((strat, idx) => (
                <div key={idx} className="bg-[#F9F8FC]/40 border border-zinc-200/60 p-3 rounded-lg flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-zinc-900">{strat.strategy_name}</p>
                    <span className="text-[10px] text-zinc-600">Due: {new Date(strat.followup_date).toLocaleDateString()}</span>
                  </div>
                  <span className="bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded text-[10px]">
                    {strat.status}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddStrategy} className="bg-[#F9F8FC]/20 p-4 rounded border border-zinc-200/60 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C2483]">Add Strategy Action</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">Strategy Name</label>
                  <input 
                    type="text" 
                    value={newStrategyName} 
                    onChange={(e) => setNewStrategyName(e.target.value)} 
                    placeholder="e.g. Manipulatives & Number Line Tiles..."
                    className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs focus:outline-none"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">Responsible Owner</label>
                    <select 
                      value={newStrategyOwner}
                      onChange={(e) => setNewStrategyOwner(e.target.value)}
                      className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs"
                      required
                    >
                      <option value="">Choose User...</option>
                      <option value={profile?.id}>{profile?.first_name} {profile?.last_name}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">Follow-Up Date</label>
                    <input 
                      type="date" 
                      value={newStrategyDeadline} 
                      onChange={(e) => setNewStrategyDeadline(e.target.value)} 
                      className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs"
                      required
                    />
                  </div>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#5C2483]/10 border border-[#5C2483]/20 text-[#5C2483] hover:bg-[#5C2483]/20 py-2 rounded text-xs font-bold cursor-pointer"
              >
                Save Strategy to Group
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: Progress Check */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">Step 4: Progress Check</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">What new evidence was collected?</label>
                <textarea
                  value={checkEvidence}
                  onChange={(e) => setCheckEvidence(e.target.value)}
                  placeholder="e.g. Classroom diagnostic logs show correct partitioning..."
                  className="w-full h-24 bg-[#F9F8FC]/60 border border-zinc-200 rounded p-3 text-zinc-900 text-xs focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Progress Rating</label>
                  <select
                    value={checkRating}
                    onChange={(e) => setCheckRating(e.target.value)}
                    className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs focus:outline-none"
                  >
                    <option value="No Evidence Yet">No Evidence Yet</option>
                    <option value="Limited Progress">Limited Progress</option>
                    <option value="Making Progress">Making Progress</option>
                    <option value="Met the Learning Target">Met the Learning Target</option>
                    <option value="Exceeded the Learning Target">Exceeded the Learning Target</option>
                  </select>
                </div>
                <div className="flex items-center gap-6 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input 
                      type="checkbox" 
                      checked={strategyWorking} 
                      onChange={(e) => setStrategyWorking(e.target.checked)}
                      className="accent-[#64ffda]" 
                    />
                    Strategy Working
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input 
                      type="checkbox" 
                      checked={needRemains} 
                      onChange={(e) => setNeedRemains(e.target.checked)}
                      className="accent-[#64ffda]" 
                    />
                    Need Remains
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Next Learning Path & Reflections */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">Step 5: Next Learning Path</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Next Instructional Decision</label>
                <select
                  value={nextDecision}
                  onChange={(e) => setNextDecision(e.target.value)}
                  className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2.5 px-3 text-zinc-900 text-xs focus:outline-none"
                >
                  <option value="Continue the current strategy">Continue the current strategy</option>
                  <option value="Adjust the current strategy">Adjust the current strategy</option>
                  <option value="Move the student to a different learning-need group">Move the student to a different learning-need group</option>
                  <option value="Return the student to core instruction">Return the student to core instruction</option>
                  <option value="Provide additional support">Provide additional support</option>
                  <option value="Begin a new learning target">Begin a new learning target</option>
                  <option value="Move the student to enrichment or extension">Move the student to enrichment or extension</option>
                  <option value="Close the current learning path">Close the current learning path</option>
                </select>
              </div>

              {/* Reflection Questions */}
              <div className="border-t border-zinc-200/60 pt-6 space-y-4">
                <h3 className="text-base font-bold text-zinc-900">Teacher Reflections</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">What worked well?</label>
                    <input 
                      type="text" 
                      value={reflectionWorked} 
                      onChange={(e) => setReflectionWorked(e.target.value)}
                      className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">What did NOT work?</label>
                    <input 
                      type="text" 
                      value={reflectionNotWorked} 
                      onChange={(e) => setReflectionNotWorked(e.target.value)}
                      className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">What did the student response reveal?</label>
                    <input 
                      type="text" 
                      value={reflectionReveal} 
                      onChange={(e) => setReflectionReveal(e.target.value)}
                      className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1.5">What will you change next?</label>
                    <input 
                      type="text" 
                      value={reflectionChange} 
                      onChange={(e) => setReflectionChange(e.target.value)}
                      className="w-full bg-[#F9F8FC]/60 border border-zinc-200 rounded py-2 px-3 text-zinc-900 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleCompleteCycle}
                className="w-full bg-emerald-500 text-white hover:bg-emerald-400 font-extrabold py-3.5 rounded-md text-xs transition-colors shadow-lg cursor-pointer mt-4"
              >
                💾 Lock Cycle & Create Learning Pathways
              </button>
            </div>
          </div>
        )}

        {/* Wizard navigation */}
        <div className="flex justify-between items-center border-t border-zinc-200/60 pt-6 mt-6">
          <button
            onClick={async () => {
              if (step > 1) {
                await handleSaveStep();
                setStep(step - 1);
              }
            }}
            disabled={step === 1}
            className="bg-zinc-100 border border-zinc-200/50 border border-zinc-200 text-zinc-900 hover:bg-zinc-100 py-2 px-5 rounded font-semibold text-xs transition-colors disabled:opacity-30 cursor-pointer"
          >
            ← Previous Stage
          </button>
          
          {step < 5 && (
            <button
              onClick={async () => {
                await handleSaveStep();
                setStep(step + 1);
              }}
              className="bg-[#5C2483] text-white hover:bg-[#4A154B] font-bold py-2 px-6 rounded text-xs transition-colors cursor-pointer"
            >
              Next Stage →
            </button>
          )}
        </div>

      </main>
    </div>
  );
}
