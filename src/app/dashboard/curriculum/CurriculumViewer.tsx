'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CURRICULUM_META, KINDERGARTEN_PROJECTS, Project, Lesson } from '@/lib/curriculum/kindergarten-science';

export default function CurriculumViewer() {
  const [selectedGrade, setSelectedGrade] = useState('K');
  const [activeProjectId, setActiveProjectId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Tab state per lesson
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'script' | 'evidence' | 'checklist'>>({});
  const [activeEvidenceMap, setActiveEvidenceMap] = useState<Record<string, 1 | 2 | 3>>({});

  const grades = [
    { code: 'K', label: 'Kindergarten', active: true },
    { code: '1', label: 'Grade 1', active: false },
    { code: '2', label: 'Grade 2', active: false },
    { code: '3', label: 'Grade 3', active: false },
    { code: '4', label: 'Grade 4', active: false },
    { code: '5', label: 'Grade 5', active: false },
  ];

  const handleChecklistToggle = (lessonId: string, index: number) => {
    const key = `${lessonId}-${index}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getLessonTab = (lessonId: string) => activeTabMap[lessonId] || 'script';
  const setLessonTab = (lessonId: string, tab: 'script' | 'evidence' | 'checklist') => {
    setActiveTabMap(prev => ({ ...prev, [lessonId]: tab }));
  };

  const getLessonEvidence = (lessonId: string) => activeEvidenceMap[lessonId] || 1;
  const setLessonEvidence = (lessonId: string, ev: 1 | 2 | 3) => {
    setActiveEvidenceMap(prev => ({ ...prev, [lessonId]: ev }));
  };

  // Filter projects and lessons
  const filteredProjects = KINDERGARTEN_PROJECTS.map(project => {
    if (activeProjectId !== 'all' && project.id !== activeProjectId) {
      return null;
    }
    const filteredLessons = project.lessons.filter(lesson => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        lesson.title.toLowerCase().includes(query) ||
        lesson.ncObjectives.some(nc => nc.toLowerCase().includes(query)) ||
        lesson.primaryPractice.toLowerCase().includes(query)
      );
    });

    if (filteredLessons.length === 0) return null;
    return { ...project, lessons: filteredLessons };
  }).filter(Boolean) as Project[];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-sans text-zinc-900 selection:bg-[#5C2483] selection:text-white">
      
      {/* MINIMAL HERO HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-[#5C2483] mb-1">
            K-5 CURRICULUM HUB
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2D183B] tracking-tight" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
            Kindergarten Science
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-semibold mt-1">
            36 Evidence-Release Lessons • 5 Integrated Projects • NC Standards
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="bg-[#5C2483] hover:bg-[#4A154B] text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>🖨️</span>
          <span>Print / Export</span>
        </button>
      </div>

      {/* GRADE SELECTOR PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-zinc-200">
        {grades.map(g => (
          <button
            key={g.code}
            onClick={() => setSelectedGrade(g.code)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              selectedGrade === g.code
                ? 'bg-[#5C2483] text-white shadow-md'
                : 'bg-white text-zinc-600 hover:bg-purple-50 border border-zinc-200'
            }`}
          >
            {g.label} {g.active && '✓'}
          </button>
        ))}
      </div>

      {selectedGrade !== 'K' ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center space-y-3 my-8">
          <span className="text-4xl block">🚧</span>
          <h3 className="text-xl font-black text-[#2D183B]">Grade {selectedGrade} Science Coming Soon</h3>
          <p className="text-xs text-zinc-500 font-medium">Curriculum for Grade {selectedGrade} is currently being prepared.</p>
          <button
            onClick={() => setSelectedGrade('K')}
            className="bg-[#5C2483] text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Back to Kindergarten Science
          </button>
        </div>
      ) : (
        <>
          {/* SEARCH & PROJECT FILTER BAR */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8">
            
            {/* Project Filter Pills */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setActiveProjectId('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                  activeProjectId === 'all'
                    ? 'bg-[#5C2483] text-white shadow-xs'
                    : 'bg-white text-zinc-600 hover:bg-purple-50 border border-zinc-200'
                }`}
              >
                All Projects
              </button>

              {KINDERGARTEN_PROJECTS.map(proj => (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectId(proj.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                    activeProjectId === proj.id
                      ? 'bg-[#5C2483] text-white shadow-xs'
                      : 'bg-white text-zinc-600 hover:bg-purple-50 border border-zinc-200'
                  }`}
                >
                  P{proj.projectNumber}: {proj.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons..."
                className="w-full bg-white border border-zinc-300 rounded-lg py-1.5 pl-8 pr-3 text-xs text-zinc-900 font-medium focus:outline-none focus:border-[#5C2483]"
              />
              <span className="absolute left-2.5 top-2 text-zinc-400 text-xs">🔍</span>
            </div>

          </div>

          {/* CLEAN PROJECTS & LESSONS LIST */}
          <div className="space-y-8">
            {filteredProjects.map(project => (
              <div key={project.id} className="space-y-3">
                
                {/* Minimal Project Header */}
                <div className="flex items-center gap-2 border-b border-purple-100 pb-2">
                  <span className="bg-[#5C2483] text-white text-[10px] font-black px-2 py-0.5 rounded">
                    PROJ {project.projectNumber}
                  </span>
                  <h2 className="text-base font-black text-[#2D183B]" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
                    {project.title}
                  </h2>
                </div>

                {/* Lesson Cards */}
                <div className="space-y-2.5">
                  {project.lessons.map(lesson => {
                    const isExpanded = expandedLessonId === lesson.id;
                    const activeTab = getLessonTab(lesson.id);
                    const activeEvidenceNum = getLessonEvidence(lesson.id);
                    const currentEvidence = lesson[`evidence${activeEvidenceNum}` as keyof Lesson] as any;

                    return (
                      <div
                        key={lesson.id}
                        className={`bg-white border rounded-xl transition-all overflow-hidden ${
                          isExpanded ? 'border-[#5C2483] shadow-md' : 'border-zinc-200 hover:border-purple-300'
                        }`}
                      >
                        {/* Compact Lesson Header Row */}
                        <div
                          onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                          className="px-4 py-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-purple-50/30 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="bg-[#F3EEFF] text-[#5C2483] text-xs font-black px-2 py-0.5 rounded border border-[#E6DBFF] shrink-0">
                              L{lesson.lessonNumber}
                            </span>
                            <h3 className="text-sm font-bold text-[#2D183B] truncate">
                              {lesson.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {lesson.ncObjectives.map(nc => (
                              <span key={nc} className="hidden sm:inline bg-zinc-100 text-zinc-700 text-[10px] font-extrabold px-2 py-0.5 rounded">
                                {nc}
                              </span>
                            ))}
                            <span className="text-xs text-[#5C2483] font-bold">
                              {isExpanded ? '▲' : '▼'}
                            </span>
                          </div>
                        </div>

                        {/* Expanded Clean View */}
                        {isExpanded && (
                          <div className="border-t border-zinc-100 p-5 space-y-4 bg-[#F9F8FC] text-left">
                            
                            {/* 3 Clean Workspace Tabs */}
                            <div className="flex gap-2 border-b border-zinc-200 pb-3">
                              <button
                                onClick={() => setLessonTab(lesson.id, 'script')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                                  activeTab === 'script' ? 'bg-[#5C2483] text-white' : 'bg-white text-zinc-700 border border-zinc-200'
                                }`}
                              >
                                🎯 Task Script & Launch
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'evidence')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                                  activeTab === 'evidence' ? 'bg-[#5C2483] text-white' : 'bg-white text-zinc-700 border border-zinc-200'
                                }`}
                              >
                                📦 Evidence Packages (1–2–3)
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'checklist')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                                  activeTab === 'checklist' ? 'bg-[#5C2483] text-white' : 'bg-white text-zinc-700 border border-zinc-200'
                                }`}
                              >
                                ✅ Teacher Checklist
                              </button>
                            </div>

                            {/* TAB 1: SCRIPT & LAUNCH */}
                            {activeTab === 'script' && (
                              <div className="space-y-4">
                                <div className="bg-[#F3EEFF] border border-[#E6DBFF] p-4 rounded-xl space-y-2">
                                  <span className="text-[10px] font-black uppercase text-[#5C2483] tracking-wider block">
                                    EXACT KINDERGARTEN TASK SCRIPT (SAY ALOUD)
                                  </span>
                                  <p className="text-base font-black text-[#2D183B] italic">
                                    &ldquo;{lesson.launch.kindergartenTaskScript}&rdquo;
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                  <div className="bg-white border border-zinc-200 p-3 rounded-lg space-y-1">
                                    <span className="font-bold text-[#5C2483] block">Preparation:</span>
                                    <p className="text-zinc-600">{lesson.prepare}</p>
                                  </div>
                                  <div className="bg-white border border-zinc-200 p-3 rounded-lg space-y-1">
                                    <span className="font-bold text-[#5C2483] block">Before Evidence:</span>
                                    <p className="text-zinc-600">{lesson.launch.studentActionsBeforeEvidence}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* TAB 2: EVIDENCE PACKAGES */}
                            {activeTab === 'evidence' && (
                              <div className="space-y-4">
                                <div className="flex gap-2">
                                  {[1, 2, 3].map(num => (
                                    <button
                                      key={num}
                                      onClick={() => setLessonEvidence(lesson.id, num as 1 | 2 | 3)}
                                      className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer border ${
                                        activeEvidenceNum === num
                                          ? 'bg-[#5C2483] border-[#5C2483] text-white'
                                          : 'bg-white text-zinc-600 border-zinc-200'
                                      }`}
                                    >
                                      Evidence {num}
                                    </button>
                                  ))}
                                </div>

                                <div className="bg-white border border-purple-100 p-4 rounded-xl space-y-3">
                                  <div>
                                    <span className="text-[10px] font-black text-[#5C2483] uppercase block mb-1">
                                      Scientific Knowledge Statement:
                                    </span>
                                    <p className="text-xs font-bold text-[#2D183B] bg-purple-50 p-3 rounded-lg border border-purple-100">
                                      &ldquo;{currentEvidence.scientificKnowledge}&rdquo;
                                    </p>
                                  </div>

                                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs space-y-1">
                                    <span className="font-black text-emerald-800 uppercase block">📦 EXACT EVIDENCE PACKAGE:</span>
                                    <p className="text-emerald-950 font-medium">{currentEvidence.exactEvidencePackage}</p>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs pt-1">
                                    <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                                      <span className="font-bold text-blue-900 block mb-0.5">Slow Down Question:</span>
                                      <p className="text-blue-950 text-[11px]">{currentEvidence.questions.slowDown}</p>
                                    </div>
                                    <div className="bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                                      <span className="font-bold text-purple-900 block mb-0.5">Core Reasoning:</span>
                                      <p className="text-purple-950 text-[11px]">{currentEvidence.questions.coreReasoning}</p>
                                    </div>
                                    <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-100">
                                      <span className="font-bold text-amber-900 block mb-0.5">Challenge / Extend:</span>
                                      <p className="text-amber-950 text-[11px]">{currentEvidence.questions.challengeExtend}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* TAB 3: CHECKLIST */}
                            {activeTab === 'checklist' && (
                              <div className="bg-white border border-zinc-200 p-4 rounded-xl space-y-2">
                                <span className="text-xs font-bold text-[#5C2483] block mb-1">Facilitator Checklist:</span>
                                {lesson.facilitatorChecklist.map((item, idx) => {
                                  const isChecked = !!checkedItems[`${lesson.id}-${idx}`];
                                  return (
                                    <label
                                      key={idx}
                                      onClick={() => handleChecklistToggle(lesson.id, idx)}
                                      className="flex items-center gap-2 text-xs font-medium text-zinc-700 cursor-pointer p-1.5 hover:bg-zinc-50 rounded"
                                    >
                                      <input type="checkbox" checked={isChecked} readOnly className="accent-[#5C2483]" />
                                      <span className={isChecked ? 'line-through text-zinc-400' : ''}>{item}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            )}

                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
