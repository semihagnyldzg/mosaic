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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans text-zinc-900 selection:bg-[#5C2483] selection:text-white">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-purple-100 pb-8">
        <div className="space-y-3 max-w-3xl text-left">
          <div className="inline-flex items-center gap-2 bg-[#F3EEFF] border border-[#E6DBFF] px-3.5 py-1.5 rounded-full text-xs font-black text-[#5C2483]">
            <span>⚡ MOSAIC K-5 CURRICULUM HUB</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[#2D183B] tracking-tight leading-none" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
            Science & Engineering
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 font-semibold">
            North Carolina Standards-Aligned Clear Scientific Evidence-Release Curriculum
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowFramework(!showFramework)}
            className="flex-1 md:flex-none bg-white hover:bg-purple-50 text-[#5C2483] border-2 border-[#5C2483]/30 px-5 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>💡</span>
            <span>{showFramework ? 'Hide Principles' : 'Framework & Rules'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 md:flex-none bg-[#5C2483] hover:bg-[#4A154B] text-white font-extrabold px-6 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#5C2483]/20"
          >
            <span>🖨️</span>
            <span>Print / Export Lesson</span>
          </button>
        </div>
      </div>

      {/* COLLAPSIBLE PEDAGOGICAL FRAMEWORK BANNER */}
      {showFramework && (
        <div className="bg-white border-2 border-[#E6DBFF] rounded-3xl p-6 sm:p-8 mb-10 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-purple-100 pb-4">
            <span className="bg-[#F3EEFF] text-[#5C2483] border border-[#E6DBFF] text-xs font-black uppercase px-3 py-1 rounded-full">
              PEDAGOGICAL DESIGN FRAMEWORK
            </span>
            <button
              onClick={() => setShowFramework(false)}
              className="text-zinc-500 hover:text-zinc-900 text-xs font-bold"
            >
              ✕ Close
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-[#2D183B] leading-snug" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
              &ldquo;{CURRICULUM_META.nonNegotiableRule}&rdquo;
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F9F8FC] border border-purple-100 p-4 rounded-2xl space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#5C2483] block">
                  🎯 Kindergarten Clarity Rule
                </span>
                <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                  {CURRICULUM_META.clarityRule}
                </p>
              </div>

              <div className="bg-[#F9F8FC] border border-purple-100 p-4 rounded-2xl space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#5C2483] block">
                  🔍 Evidence Definition
                </span>
                <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                  {CURRICULUM_META.evidenceDefinition}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-500 block mb-2">
                9-Step Evidence-Release Sequence:
              </span>
              <div className="flex flex-wrap gap-2">
                {CURRICULUM_META.sequenceSteps.map(s => (
                  <span key={s.step} className="bg-[#F3EEFF] border border-[#E6DBFF] text-[#5C2483] text-[11px] font-bold px-3 py-1 rounded-lg">
                    <strong className="text-[#2D183B]">{s.step}.</strong> {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GRADE SELECTION TABS */}
      <div className="mb-10">
        <div className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-3">Select Grade Level</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {grades.map(g => (
            <button
              key={g.code}
              onClick={() => setSelectedGrade(g.code)}
              className={`p-4 rounded-2xl transition-all text-left flex flex-col justify-between border-2 cursor-pointer ${
                selectedGrade === g.code
                  ? 'bg-[#5C2483] border-[#5C2483] text-white shadow-xl shadow-[#5C2483]/30 scale-[1.02]'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:border-purple-300 hover:text-[#5C2483]'
              }`}
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-black text-lg" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
                  {g.code === 'K' ? 'Grade K' : `Grade ${g.code}`}
                </span>
                {g.active && (
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    selectedGrade === g.code ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    Active
                  </span>
                )}
              </div>
              <div className="text-xs font-bold opacity-90">{g.count}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedGrade !== 'K' ? (
        <div className="bg-white border-2 border-zinc-200 rounded-3xl p-12 text-center space-y-4 my-8 shadow-sm">
          <span className="text-5xl block">🚧</span>
          <h3 className="text-2xl font-black text-[#2D183B]" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
            Grade {selectedGrade} Science Coming Soon
          </h3>
          <p className="text-zinc-600 text-sm max-w-md mx-auto font-medium">
            Grade {selectedGrade} Science & Engineering Evidence-Release curriculum is currently in development.
          </p>
          <button
            onClick={() => setSelectedGrade('K')}
            className="bg-[#5C2483] hover:bg-[#4A154B] text-white font-extrabold px-6 py-3 rounded-xl text-xs transition-all cursor-pointer shadow-md"
          >
            Explore Kindergarten Science (36 Lessons)
          </button>
        </div>
      ) : (
        <>
          {/* SEARCH & PROJECT FILTER BAR */}
          <div className="bg-white border-2 border-purple-100 rounded-2xl p-4 mb-10 shadow-lg sticky top-24 z-30">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              
              {/* Search Box */}
              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lessons or NC standards (e.g. PS.K.1.1)..."
                  className="w-full bg-[#F9F8FC] border border-zinc-300 rounded-xl py-2.5 pl-9 pr-4 text-xs text-zinc-900 font-medium placeholder-zinc-400 focus:outline-none focus:border-[#5C2483]"
                />
                <span className="absolute left-3 top-2.5 text-zinc-400 text-xs">🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Project Tabs */}
              <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                <button
                  onClick={() => setActiveProjectId('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border-2 ${
                    activeProjectId === 'all'
                      ? 'bg-[#5C2483] border-[#5C2483] text-white shadow-md'
                      : 'bg-[#F9F8FC] border-zinc-200 text-zinc-700 hover:bg-purple-50 hover:text-[#5C2483]'
                  }`}
                >
                  All 5 Projects ({CURRICULUM_META.totalLessons} Lessons)
                </button>

                {KINDERGARTEN_PROJECTS.map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectId(proj.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-2 ${
                      activeProjectId === proj.id
                        ? 'bg-[#5C2483] border-[#5C2483] text-white shadow-md'
                        : 'bg-[#F9F8FC] border-zinc-200 text-zinc-700 hover:bg-purple-50 hover:text-[#5C2483]'
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
                <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#5C2483] text-white text-[11px] font-black uppercase px-3 py-1 rounded-md">
                        PROJECT {project.projectNumber}
                      </span>
                      <h2 className="text-xl sm:text-3xl font-black text-[#2D183B]" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
                        {project.title}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 font-medium">{project.description}</p>
                  </div>
                  <div className="text-xs font-black text-[#5C2483] bg-[#F3EEFF] border border-[#E6DBFF] px-3.5 py-2 rounded-xl whitespace-nowrap">
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
                        className={`bg-white border-2 rounded-2xl transition-all overflow-hidden ${
                          isExpanded
                            ? 'border-[#5C2483] shadow-xl shadow-[#5C2483]/10'
                            : 'border-zinc-200 hover:border-purple-300'
                        }`}
                      >
                        {/* Lesson Card Header */}
                        <div
                          onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                          className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-purple-50/40 transition-colors"
                        >
                          <div className="space-y-2 text-left">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="bg-[#5C2483] text-white font-black text-xs px-2.5 py-0.5 rounded-md">
                                Lesson {lesson.lessonNumber}
                              </span>
                              {lesson.ncObjectives.map(nc => (
                                <span key={nc} className="bg-[#F3EEFF] text-[#5C2483] border border-[#E6DBFF] text-[11px] font-black px-2 py-0.5 rounded-md">
                                  NC: {nc}
                                </span>
                              ))}
                              <span className="bg-indigo-50 text-indigo-900 border border-indigo-200 text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                                {lesson.primaryPractice}
                              </span>
                            </div>

                            <h3 className="text-xl font-black text-[#2D183B]" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
                              {lesson.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#5C2483] font-black">
                              {isExpanded ? 'Collapse' : 'Expand Lesson'}
                            </span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-black transition-all ${
                              isExpanded
                                ? 'bg-[#5C2483] border-[#5C2483] text-white rotate-180'
                                : 'bg-[#F3EEFF] border-[#E6DBFF] text-[#5C2483]'
                            }`}>
                              ▲
                            </div>
                          </div>
                        </div>

                        {/* Expanded Drawer Content */}
                        {isExpanded && (
                          <div className="border-t-2 border-zinc-100 p-6 space-y-6 bg-[#F9F8FC] text-left">
                            
                            {/* Direct Instruction Warning Box */}
                            <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-xl text-amber-900 text-xs space-y-1">
                              <span className="font-black uppercase tracking-wider text-amber-800 block">
                                🔒 TEACHER ONLY • WHAT WOULD NORMALLY BE DIRECT INSTRUCTION?
                              </span>
                              <p className="italic text-amber-950 font-medium leading-relaxed">
                                {lesson.directInstructionContext}
                              </p>
                            </div>

                            {/* Workspace Navigation Tabs */}
                            <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
                              <button
                                onClick={() => setLessonTab(lesson.id, 'launch')}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                  activeTab === 'launch'
                                    ? 'bg-[#5C2483] text-white shadow-md'
                                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-purple-50'
                                }`}
                              >
                                🚀 Launch & Task Script
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'pathways')}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                  activeTab === 'pathways'
                                    ? 'bg-[#5C2483] text-white shadow-md'
                                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-purple-50'
                                }`}
                              >
                                👥 Small-Group Pathways
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'evidence')}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                  activeTab === 'evidence'
                                    ? 'bg-[#5C2483] text-white shadow-md'
                                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-purple-50'
                                }`}
                              >
                                📦 Evidence Releases (1–2–3)
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'consolidation')}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                  activeTab === 'consolidation'
                                    ? 'bg-[#5C2483] text-white shadow-md'
                                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-purple-50'
                                }`}
                              >
                                🧠 Consolidation & Transfer
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'checklist')}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                  activeTab === 'checklist'
                                    ? 'bg-[#5C2483] text-white shadow-md'
                                    : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-purple-50'
                                }`}
                              >
                                ✅ Facilitator Checklist
                              </button>
                            </div>

                            {/* TAB 1: LAUNCH & SCRIPT */}
                            {activeTab === 'launch' && (
                              <div className="space-y-6 animate-in fade-in duration-200">
                                <div className="bg-white border border-purple-100 p-5 rounded-2xl space-y-2 shadow-xs">
                                  <span className="text-xs font-black uppercase tracking-wider text-[#5C2483] block">
                                    🛠️ Prepare Materials
                                  </span>
                                  <p className="text-xs text-zinc-700 font-medium leading-relaxed">{lesson.prepare}</p>
                                </div>

                                <div className="bg-[#F3EEFF] border-2 border-[#E6DBFF] p-6 rounded-2xl space-y-4 shadow-sm">
                                  <span className="bg-[#5C2483] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block">
                                    EXACT KINDERGARTEN TASK SCRIPT (SAY ALOUD)
                                  </span>

                                  <blockquote className="text-lg sm:text-xl font-black text-[#2D183B] italic border-l-4 border-[#5C2483] pl-4 py-1 leading-relaxed" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
                                    &ldquo;{lesson.launch.kindergartenTaskScript}&rdquo;
                                  </blockquote>

                                  <div className="pt-2 border-t border-[#E6DBFF] text-xs text-zinc-700">
                                    <span className="font-extrabold text-[#5C2483]">Facilitator Prompt:</span> &ldquo;{lesson.launch.prompt}&rdquo;
                                  </div>
                                </div>

                                <div className="bg-white border border-purple-100 p-5 rounded-2xl space-y-2 shadow-xs">
                                  <span className="text-xs font-black uppercase tracking-wider text-[#5C2483] block">
                                    🧒 What Children Do Before Evidence Release
                                  </span>
                                  <p className="text-xs text-zinc-700 font-medium leading-relaxed">{lesson.launch.studentActionsBeforeEvidence}</p>
                                </div>
                              </div>
                            )}

                            {/* TAB 2: PATHWAYS */}
                            {activeTab === 'pathways' && (
                              <div className="space-y-6 animate-in fade-in duration-200">
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => setLessonPathway(lesson.id, 'language')}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                                      activePathway === 'language' ? 'bg-[#5C2483] text-white shadow-md' : 'bg-white border border-zinc-200 text-zinc-700'
                                    }`}
                                  >
                                    Language & Representation
                                  </button>

                                  <button
                                    onClick={() => setLessonPathway(lesson.id, 'supported')}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                                      activePathway === 'supported' ? 'bg-[#5C2483] text-white shadow-md' : 'bg-white border border-zinc-200 text-zinc-700'
                                    }`}
                                  >
                                    Supported Investigation
                                  </button>

                                  <button
                                    onClick={() => setLessonPathway(lesson.id, 'core')}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                                      activePathway === 'core' ? 'bg-[#5C2483] text-white shadow-md' : 'bg-white border border-zinc-200 text-zinc-700'
                                    }`}
                                  >
                                    Core Investigation
                                  </button>

                                  <button
                                    onClick={() => setLessonPathway(lesson.id, 'extended')}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                                      activePathway === 'extended' ? 'bg-[#5C2483] text-white shadow-md' : 'bg-white border border-zinc-200 text-zinc-700'
                                    }`}
                                  >
                                    Extended Challenge
                                  </button>
                                </div>

                                <div className="bg-white border-2 border-indigo-100 p-6 rounded-2xl space-y-3 shadow-xs">
                                  <div className="text-[#5C2483] text-xs font-black uppercase tracking-wider">
                                    Pathway Setup ({activePathway}):
                                  </div>

                                  <p className="text-sm text-zinc-800 font-semibold leading-relaxed">
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
                                        className={`p-4 rounded-xl text-left border-2 cursor-pointer transition-all ${
                                          isCurrent
                                            ? 'bg-[#5C2483] border-[#5C2483] text-white shadow-lg shadow-[#5C2483]/20'
                                            : 'bg-white border-zinc-200 text-zinc-700 hover:border-purple-300'
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

                                <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 space-y-6 shadow-sm">
                                  
                                  <div className="space-y-2">
                                    <span className="bg-[#F3EEFF] text-[#5C2483] border border-[#E6DBFF] text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                                      {currentEvidence.title}
                                    </span>
                                    <h4 className="text-lg font-black text-[#2D183B] leading-snug" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
                                      Scientific Knowledge Statement:
                                    </h4>
                                    <p className="text-sm font-bold text-[#5C2483] bg-[#F3EEFF] p-4 rounded-xl border border-[#E6DBFF]">
                                      &ldquo;{currentEvidence.scientificKnowledge}&rdquo;
                                    </p>
                                  </div>

                                  <div className="bg-emerald-50 border-2 border-emerald-200 p-5 rounded-xl space-y-2">
                                    <span className="text-xs font-black uppercase tracking-wider text-emerald-800 block">
                                      📦 EXACT EVIDENCE PACKAGE (GIVE / SHOW THIS)
                                    </span>
                                    <p className="text-xs text-emerald-950 leading-relaxed font-bold">
                                      {currentEvidence.exactEvidencePackage}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white border border-zinc-200 p-4 rounded-xl space-y-1.5 shadow-xs">
                                      <span className="text-xs font-black uppercase tracking-wider text-zinc-600 block">
                                        👩‍🔬 Student Work with Evidence
                                      </span>
                                      <p className="text-xs text-zinc-800 font-medium leading-relaxed">
                                        {currentEvidence.studentWork}
                                      </p>
                                    </div>

                                    <div className="bg-white border border-zinc-200 p-4 rounded-xl space-y-1.5 shadow-xs">
                                      <span className="text-xs font-black uppercase tracking-wider text-amber-700 block">
                                        🔄 Required Group Action
                                      </span>
                                      <p className="text-xs text-zinc-800 font-medium leading-relaxed">
                                        {currentEvidence.requiredGroupAction}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-3 pt-2 border-t border-zinc-200">
                                    <span className="text-xs font-black uppercase tracking-wider text-[#5C2483] block">
                                      ❓ Differentiated Questioning Levels
                                    </span>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-1">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-800 block">
                                          1. SLOW DOWN / BUILD UNDERSTANDING
                                        </span>
                                        <p className="text-xs text-blue-950 font-medium leading-relaxed">
                                          {currentEvidence.questions.slowDown}
                                        </p>
                                      </div>

                                      <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl space-y-1">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-purple-800 block">
                                          2. CORE REASONING
                                        </span>
                                        <p className="text-xs text-purple-950 font-medium leading-relaxed">
                                          {currentEvidence.questions.coreReasoning}
                                        </p>
                                      </div>

                                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-1">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 block">
                                          3. CHALLENGE / EXTEND
                                        </span>
                                        <p className="text-xs text-amber-950 font-medium leading-relaxed">
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
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 p-6 rounded-2xl space-y-3">
                                  <span className="bg-emerald-700 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full inline-block">
                                    SCIENTIFIC CONSOLIDATION ({lesson.consolidation.duration})
                                  </span>
                                  <h4 className="text-lg font-black text-emerald-950" style={{ fontFamily: "var(--font-heading, 'Outfit', sans-serif)" }}>
                                    Now the Facilitator Formalizes the Concept:
                                  </h4>
                                  <p className="text-sm font-bold text-emerald-950 leading-relaxed bg-white p-4 rounded-xl border border-emerald-200 shadow-xs">
                                    {lesson.consolidation.content}
                                  </p>
                                </div>

                                <div className="bg-white border border-purple-100 p-6 rounded-2xl space-y-3 shadow-xs">
                                  <span className="text-xs font-black uppercase tracking-wider text-[#5C2483] block">
                                    🎓 Individual Transfer Assessment
                                  </span>
                                  <p className="text-xs text-zinc-800 font-medium leading-relaxed">
                                    {lesson.individualTransferAssessment}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* TAB 5: CHECKLIST */}
                            {activeTab === 'checklist' && (
                              <div className="space-y-4 animate-in fade-in duration-200">
                                <div className="bg-white border border-purple-100 p-6 rounded-2xl space-y-4 shadow-xs">
                                  <span className="text-xs font-black uppercase tracking-wider text-[#5C2483] block">
                                    📋 Facilitator Evidence Checklist for Lesson {lesson.lessonNumber}
                                  </span>

                                  <div className="space-y-2.5">
                                    {lesson.facilitatorChecklist.map((item, idx) => {
                                      const isChecked = !!checkedItems[`${lesson.id}-${idx}`];
                                      return (
                                        <div
                                          key={idx}
                                          onClick={() => handleChecklistToggle(lesson.id, idx)}
                                          className={`p-3.5 rounded-xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                                            isChecked
                                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                                              : 'bg-white border-zinc-200 text-zinc-800 hover:border-purple-200'
                                          }`}
                                        >
                                          <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                                            isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-zinc-300 text-transparent'
                                          }`}>
                                            ✓
                                          </div>
                                          <span className="text-xs font-bold">{item}</span>
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
