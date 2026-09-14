'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CURRICULUM_META, KINDERGARTEN_PROJECTS, Project, Lesson } from '@/lib/curriculum/kindergarten-science';

export default function CurriculumViewer() {
  const [selectedGrade, setSelectedGrade] = useState('K');
  const [activeProjectId, setActiveProjectId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFramework, setShowFramework] = useState(false);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>('lesson-1');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Tab states per lesson
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'launch' | 'pathways' | 'evidence' | 'consolidation' | 'checklist'>>({});
  const [activePathwayMap, setActivePathwayMap] = useState<Record<string, 'language' | 'supported' | 'core' | 'extended'>>({});
  const [activeEvidenceMap, setActiveEvidenceMap] = useState<Record<string, 1 | 2 | 3>>({});

  const grades = [
    { code: 'K', label: 'Kindergarten', active: true, count: '36 Lessons' },
    { code: '1', label: '1st Grade', active: false, count: 'Coming Soon' },
    { code: '2', label: '2nd Grade', active: false, count: 'Coming Soon' },
    { code: '3', label: '3rd Grade', active: false, count: 'Coming Soon' },
    { code: '4', label: '4th Grade', active: false, count: 'Coming Soon' },
    { code: '5', label: '5th Grade', active: false, count: 'Coming Soon' },
  ];

  const handleChecklistToggle = (lessonId: string, index: number) => {
    const key = `${lessonId}-${index}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getLessonTab = (lessonId: string) => activeTabMap[lessonId] || 'launch';
  const setLessonTab = (lessonId: string, tab: 'launch' | 'pathways' | 'evidence' | 'consolidation' | 'checklist') => {
    setActiveTabMap(prev => ({ ...prev, [lessonId]: tab }));
  };

  const getLessonPathway = (lessonId: string) => activePathwayMap[lessonId] || 'core';
  const setLessonPathway = (lessonId: string, pathway: 'language' | 'supported' | 'core' | 'extended') => {
    setActivePathwayMap(prev => ({ ...prev, [lessonId]: pathway }));
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
      const matchTitle = lesson.title.toLowerCase().includes(query);
      const matchNC = lesson.ncObjectives.some(nc => nc.toLowerCase().includes(query));
      const matchPractice = lesson.primaryPractice.toLowerCase().includes(query);
      const matchKnowledge = lesson.directInstructionContext.toLowerCase().includes(query);
      return matchTitle || matchNC || matchPractice || matchKnowledge;
    });

    if (filteredLessons.length === 0) return null;
    return { ...project, lessons: filteredLessons };
  }).filter(Boolean) as Project[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-24 text-zinc-100 font-sans selection:bg-purple-600 selection:text-white">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-zinc-800/80 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-purple-950/80 border border-purple-800/60 px-3 py-1 rounded-full text-xs font-bold text-purple-300">
            <span>📚 MOSAIC K-5 CURRICULUM HUB</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Science & Engineering Curriculum
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-medium">
            North Carolina Standards-Aligned Clear Scientific Evidence-Release Framework
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowFramework(!showFramework)}
            className="flex-1 md:flex-none bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>💡</span>
            <span>{showFramework ? 'Hide Principles' : 'Framework & Rules'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-950/50"
          >
            <span>🖨️</span>
            <span>Print / Export Lesson</span>
          </button>
        </div>
      </div>

      {/* COLLAPSIBLE PEDAGOGICAL FRAMEWORK BANNER */}
      {showFramework && (
        <div className="bg-gradient-to-br from-purple-950/90 via-zinc-900 to-slate-950 border border-purple-700/50 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-purple-900/60 pb-4">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-black uppercase px-3 py-1 rounded-full">
              ⚡ PEDAGOGICAL DESIGN FRAMEWORK
            </span>
            <button
              onClick={() => setShowFramework(false)}
              className="text-zinc-400 hover:text-white text-xs font-bold"
            >
              ✕ Close
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
              &ldquo;{CURRICULUM_META.nonNegotiableRule}&rdquo;
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                  🎯 Kindergarten Clarity Rule
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {CURRICULUM_META.clarityRule}
                </p>
              </div>

              <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                  🔍 Evidence Definition
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {CURRICULUM_META.evidenceDefinition}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 block mb-2">
                9-Step Evidence-Release Sequence:
              </span>
              <div className="flex flex-wrap gap-2">
                {CURRICULUM_META.sequenceSteps.map(s => (
                  <span key={s.step} className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-semibold px-3 py-1 rounded-lg">
                    <strong className="text-purple-400">{s.step}.</strong> {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GRADE SELECTION TABS */}
      <div className="mb-10">
        <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Select Grade Level</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {grades.map(g => (
            <button
              key={g.code}
              onClick={() => setSelectedGrade(g.code)}
              className={`p-4 rounded-2xl transition-all text-left flex flex-col justify-between border cursor-pointer ${
                selectedGrade === g.code
                  ? 'bg-purple-600 border-purple-400 text-white shadow-xl shadow-purple-950/50 scale-[1.02]'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
              }`}
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-black text-lg">{g.code === 'K' ? 'Grade K' : `Grade ${g.code}`}</span>
                {g.active && (
                  <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <div className="text-xs font-semibold opacity-80">{g.count}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedGrade !== 'K' ? (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-12 text-center space-y-4 my-8">
          <span className="text-5xl block">🚧</span>
          <h3 className="text-2xl font-black text-white">Grade {selectedGrade} Science Coming Soon</h3>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Grade {selectedGrade} Science & Engineering Evidence-Release curriculum is currently in development.
          </p>
          <button
            onClick={() => setSelectedGrade('K')}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all cursor-pointer shadow-lg"
          >
            Explore Kindergarten Science (36 Lessons)
          </button>
        </div>
      ) : (
        <>
          {/* SEARCH & PROJECT FILTER BAR */}
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-4 mb-10 shadow-xl backdrop-blur-md sticky top-24 z-30">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              
              {/* Search Box */}
              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lessons or NC standards (e.g. PS.K.1.1)..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                />
                <span className="absolute left-3 top-2.5 text-zinc-500 text-xs">🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Project Tabs */}
              <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                <button
                  onClick={() => setActiveProjectId('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeProjectId === 'all'
                      ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  All 5 Projects ({CURRICULUM_META.totalLessons} Lessons)
                </button>

                {KINDERGARTEN_PROJECTS.map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectId(proj.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      activeProjectId === proj.id
                        ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    Project {proj.projectNumber}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* PROJECTS & LESSONS */}
          <div className="space-y-12">
            {filteredProjects.map(project => (
              <section key={project.id} className="space-y-6">
                
                {/* Project Header Banner */}
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-600 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md">
                        PROJECT {project.projectNumber}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-white">{project.title}</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400">{project.description}</p>
                  </div>
                  <div className="text-xs font-bold text-purple-300 bg-purple-950/60 border border-purple-800/40 px-3 py-1.5 rounded-lg whitespace-nowrap">
                    {project.lessons.length} Detailed Lessons
                  </div>
                </div>

                {/* Lesson Cards Accordion */}
                <div className="space-y-4">
                  {project.lessons.map(lesson => {
                    const isExpanded = expandedLessonId === lesson.id;
                    const activeTab = getLessonTab(lesson.id);
                    const activePathway = getLessonPathway(lesson.id);
                    const activeEvidenceNum = getLessonEvidence(lesson.id);

                    const currentEvidence = lesson[`evidence${activeEvidenceNum}` as keyof Lesson] as any;

                    return (
                      <div
                        key={lesson.id}
                        className={`bg-zinc-900/90 border rounded-2xl transition-all overflow-hidden ${
                          isExpanded
                            ? 'border-purple-500/80 shadow-2xl shadow-purple-950/50'
                            : 'border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {/* Lesson Card Header */}
                        <div
                          onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                          className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-zinc-850/50 transition-colors"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="bg-purple-950 border border-purple-700/60 text-purple-300 font-extrabold text-xs px-2.5 py-0.5 rounded-md">
                                Lesson {lesson.lessonNumber}
                              </span>
                              {lesson.ncObjectives.map(nc => (
                                <span key={nc} className="bg-zinc-800 text-zinc-200 text-[11px] font-bold px-2 py-0.5 rounded-md">
                                  NC: {nc}
                                </span>
                              ))}
                              <span className="bg-indigo-950/60 border border-indigo-700/50 text-indigo-300 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                                {lesson.primaryPractice}
                              </span>
                            </div>

                            <h3 className="text-xl font-black text-white">{lesson.title}</h3>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-zinc-400 font-bold">
                              {isExpanded ? 'Collapse' : 'Expand'}
                            </span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold transition-all ${
                              isExpanded
                                ? 'bg-purple-600 border-purple-400 text-white rotate-180'
                                : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                            }`}>
                              ▲
                            </div>
                          </div>
                        </div>

                        {/* Expanded Drawer Content */}
                        {isExpanded && (
                          <div className="border-t border-zinc-800 p-6 space-y-6 bg-zinc-950">
                            
                            {/* Direct Instruction Warning Box */}
                            <div className="bg-amber-950/40 border border-amber-800/60 p-4 rounded-xl text-amber-200 text-xs space-y-1">
                              <span className="font-black uppercase tracking-wider text-amber-400 block">
                                🔒 TEACHER ONLY • WHAT WOULD NORMALLY BE DIRECT INSTRUCTION?
                              </span>
                              <p className="italic text-amber-200/90 leading-relaxed font-medium">
                                {lesson.directInstructionContext}
                              </p>
                            </div>

                            {/* Workspace Navigation Tabs */}
                            <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-4">
                              <button
                                onClick={() => setLessonTab(lesson.id, 'launch')}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  activeTab === 'launch'
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                                }`}
                              >
                                🚀 Launch & Task Script
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'pathways')}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  activeTab === 'pathways'
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                                }`}
                              >
                                👥 Small-Group Pathways
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'evidence')}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  activeTab === 'evidence'
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                                }`}
                              >
                                📦 Evidence Releases (1–2–3)
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'consolidation')}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  activeTab === 'consolidation'
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                                }`}
                              >
                                🧠 Consolidation & Transfer
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'checklist')}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  activeTab === 'checklist'
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                                }`}
                              >
                                ✅ Facilitator Checklist
                              </button>
                            </div>

                            {/* TAB 1: LAUNCH & SCRIPT */}
                            {activeTab === 'launch' && (
                              <div className="space-y-6 animate-in fade-in duration-200">
                                <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl space-y-2">
                                  <span className="text-xs font-black uppercase tracking-wider text-purple-400 block">
                                    🛠️ Prepare Materials
                                  </span>
                                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">{lesson.prepare}</p>
                                </div>

                                <div className="bg-gradient-to-r from-purple-950 to-indigo-950 border-2 border-purple-500/60 p-6 rounded-2xl space-y-4 shadow-xl">
                                  <span className="bg-purple-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block">
                                    EXACT KINDERGARTEN TASK SCRIPT (SAY ALOUD)
                                  </span>

                                  <blockquote className="text-lg sm:text-xl font-black text-white italic border-l-4 border-purple-400 pl-4 py-1 leading-relaxed">
                                    &ldquo;{lesson.launch.kindergartenTaskScript}&rdquo;
                                  </blockquote>

                                  <div className="pt-2 border-t border-purple-800/40 text-xs text-purple-200">
                                    <span className="font-bold text-purple-300">Facilitator Prompt:</span> &ldquo;{lesson.launch.prompt}&rdquo;
                                  </div>
                                </div>

                                <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-2xl space-y-2">
                                  <span className="text-xs font-black uppercase tracking-wider text-purple-400 block">
                                    🧒 What Children Do Before Evidence Release
                                  </span>
                                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">{lesson.launch.studentActionsBeforeEvidence}</p>
                                </div>
                              </div>
                            )}

                            {/* TAB 2: PATHWAYS */}
                            {activeTab === 'pathways' && (
                              <div className="space-y-6 animate-in fade-in duration-200">
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => setLessonPathway(lesson.id, 'language')}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                                      activePathway === 'language' ? 'bg-indigo-600 text-white shadow-md' : 'bg-zinc-900 text-zinc-400'
                                    }`}
                                  >
                                    Language & Representation
                                  </button>

                                  <button
                                    onClick={() => setLessonPathway(lesson.id, 'supported')}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                                      activePathway === 'supported' ? 'bg-indigo-600 text-white shadow-md' : 'bg-zinc-900 text-zinc-400'
                                    }`}
                                  >
                                    Supported Investigation
                                  </button>

                                  <button
                                    onClick={() => setLessonPathway(lesson.id, 'core')}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                                      activePathway === 'core' ? 'bg-indigo-600 text-white shadow-md' : 'bg-zinc-900 text-zinc-400'
                                    }`}
                                  >
                                    Core Investigation
                                  </button>

                                  <button
                                    onClick={() => setLessonPathway(lesson.id, 'extended')}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                                      activePathway === 'extended' ? 'bg-indigo-600 text-white shadow-md' : 'bg-zinc-900 text-zinc-400'
                                    }`}
                                  >
                                    Extended Challenge
                                  </button>
                                </div>

                                <div className="bg-zinc-900/90 border border-indigo-500/40 p-6 rounded-2xl space-y-3">
                                  <div className="text-indigo-400 text-xs font-black uppercase tracking-wider">
                                    Pathway Setup ({activePathway}):
                                  </div>

                                  <p className="text-sm text-zinc-100 font-medium leading-relaxed">
                                    {activePathway === 'language' && lesson.accessPathways.languageRepresentation}
                                    {activePathway === 'supported' && lesson.accessPathways.supportedInvestigation}
                                    {activePathway === 'core' && lesson.accessPathways.coreInvestigation}
                                    {activePathway === 'extended' && lesson.accessPathways.extendedChallenge}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* TAB 3: EVIDENCE RELEASES (1-2-3) */}
                            {activeTab === 'evidence' && (
                              <div className="space-y-6 animate-in fade-in duration-200">
                                
                                <div className="grid grid-cols-3 gap-3">
                                  {[1, 2, 3].map(num => {
                                    const ev = lesson[`evidence${num}` as keyof Lesson] as any;
                                    const isCurrent = activeEvidenceNum === num;
                                    return (
                                      <button
                                        key={num}
                                        onClick={() => setLessonEvidence(lesson.id, num as 1 | 2 | 3)}
                                        className={`p-4 rounded-xl text-left border cursor-pointer transition-all ${
                                          isCurrent
                                            ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-950/40'
                                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                                        }`}
                                      >
                                        <div className="text-[10px] font-black uppercase tracking-wider opacity-80 mb-1">
                                          RELEASE {num}
                                        </div>
                                        <div className="font-bold text-xs line-clamp-1">{ev.title}</div>
                                      </button>
                                    );
                                  })}
                                </div>

                                <div className="bg-zinc-900/90 border border-purple-500/40 rounded-2xl p-6 space-y-6">
                                  
                                  <div className="space-y-2">
                                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                                      {currentEvidence.title}
                                    </span>
                                    <h4 className="text-lg font-black text-white leading-snug">
                                      Scientific Knowledge Statement:
                                    </h4>
                                    <p className="text-sm font-semibold text-purple-200 bg-purple-950/50 p-4 rounded-xl border border-purple-800/40">
                                      &ldquo;{currentEvidence.scientificKnowledge}&rdquo;
                                    </p>
                                  </div>

                                  <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl space-y-2">
                                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block">
                                      📦 EXACT EVIDENCE PACKAGE (GIVE / SHOW THIS)
                                    </span>
                                    <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                                      {currentEvidence.exactEvidencePackage}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-1.5">
                                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                                        👩‍🔬 Student Work with Evidence
                                      </span>
                                      <p className="text-xs text-zinc-300 leading-relaxed">
                                        {currentEvidence.studentWork}
                                      </p>
                                    </div>

                                    <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-1.5">
                                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                                        🔄 Required Group Action
                                      </span>
                                      <p className="text-xs text-zinc-300 leading-relaxed">
                                        {currentEvidence.requiredGroupAction}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-3 pt-2 border-t border-zinc-800">
                                    <span className="text-xs font-black uppercase tracking-wider text-purple-400 block">
                                      ❓ Differentiated Questioning Levels
                                    </span>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                      <div className="bg-blue-950/30 border border-blue-800/40 p-4 rounded-xl space-y-1">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-400 block">
                                          1. SLOW DOWN / BUILD UNDERSTANDING
                                        </span>
                                        <p className="text-xs text-blue-100 leading-relaxed">
                                          {currentEvidence.questions.slowDown}
                                        </p>
                                      </div>

                                      <div className="bg-purple-950/30 border border-purple-800/40 p-4 rounded-xl space-y-1">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-purple-400 block">
                                          2. CORE REASONING
                                        </span>
                                        <p className="text-xs text-purple-100 leading-relaxed">
                                          {currentEvidence.questions.coreReasoning}
                                        </p>
                                      </div>

                                      <div className="bg-amber-950/30 border border-amber-800/40 p-4 rounded-xl space-y-1">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block">
                                          3. CHALLENGE / EXTEND
                                        </span>
                                        <p className="text-xs text-amber-100 leading-relaxed">
                                          {currentEvidence.questions.challengeExtend}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                </div>

                              </div>
                            )}

                            {/* TAB 4: CONSOLIDATION */}
                            {activeTab === 'consolidation' && (
                              <div className="space-y-6 animate-in fade-in duration-200">
                                <div className="bg-gradient-to-r from-emerald-950/60 to-zinc-900 border border-emerald-700/50 p-6 rounded-2xl space-y-3">
                                  <span className="bg-emerald-500 text-zinc-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full inline-block">
                                    SCIENTIFIC CONSOLIDATION ({lesson.consolidation.duration})
                                  </span>
                                  <h4 className="text-lg font-black text-white">
                                    Now the Facilitator Formalizes the Concept:
                                  </h4>
                                  <p className="text-sm font-semibold text-emerald-200 leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-emerald-800/40">
                                    {lesson.consolidation.content}
                                  </p>
                                </div>

                                <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl space-y-3">
                                  <span className="text-xs font-black uppercase tracking-wider text-purple-400 block">
                                    🎓 Individual Transfer Assessment
                                  </span>
                                  <p className="text-xs text-zinc-300 leading-relaxed">
                                    {lesson.individualTransferAssessment}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* TAB 5: CHECKLIST */}
                            {activeTab === 'checklist' && (
                              <div className="space-y-4 animate-in fade-in duration-200">
                                <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl space-y-4">
                                  <span className="text-xs font-black uppercase tracking-wider text-purple-400 block">
                                    📋 Facilitator Evidence Checklist for Lesson {lesson.lessonNumber}
                                  </span>

                                  <div className="space-y-2.5">
                                    {lesson.facilitatorChecklist.map((item, idx) => {
                                      const isChecked = !!checkedItems[`${lesson.id}-${idx}`];
                                      return (
                                        <div
                                          key={idx}
                                          onClick={() => handleChecklistToggle(lesson.id, idx)}
                                          className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                                            isChecked
                                              ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200'
                                              : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-900'
                                          }`}
                                        >
                                          <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold border transition-colors ${
                                            isChecked ? 'bg-emerald-500 border-emerald-400 text-zinc-950' : 'border-zinc-700 text-transparent'
                                          }`}>
                                            ✓
                                          </div>
                                          <span className="text-xs font-medium">{item}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </section>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
