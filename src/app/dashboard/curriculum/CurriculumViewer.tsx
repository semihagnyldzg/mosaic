'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CURRICULUM_META, KINDERGARTEN_PROJECTS, Project, Lesson } from '@/lib/curriculum/kindergarten-science';

export default function CurriculumViewer() {
  const [selectedGrade, setSelectedGrade] = useState('K');
  const [activeProjectId, setActiveProjectId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>('lesson-1');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Tab states per lesson
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'launch' | 'evidence' | 'checklist'>>({});
  const [activeEvidenceMap, setActiveEvidenceMap] = useState<Record<string, 1 | 2 | 3>>({});
  const [activePathwayMap, setActivePathwayMap] = useState<Record<string, 'language' | 'supported' | 'core' | 'extended'>>({});

  const grades = [
    { code: 'K', label: 'Kindergarten', active: true, count: '36 Lessons' },
    { code: '1', label: 'Grade 1', active: false, count: 'Coming Soon' },
    { code: '2', label: 'Grade 2', active: false, count: 'Coming Soon' },
    { code: '3', label: 'Grade 3', active: false, count: 'Coming Soon' },
    { code: '4', label: 'Grade 4', active: false, count: 'Coming Soon' },
    { code: '5', label: 'Grade 5', active: false, count: 'Coming Soon' },
  ];

  const handleChecklistToggle = (lessonId: string, index: number) => {
    const key = `${lessonId}-${index}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getLessonTab = (lessonId: string) => activeTabMap[lessonId] || 'launch';
  const setLessonTab = (lessonId: string, tab: 'launch' | 'evidence' | 'checklist') => {
    setActiveTabMap(prev => ({ ...prev, [lessonId]: tab }));
  };

  const getLessonEvidence = (lessonId: string) => activeEvidenceMap[lessonId] || 1;
  const setLessonEvidence = (lessonId: string, ev: 1 | 2 | 3) => {
    setActiveEvidenceMap(prev => ({ ...prev, [lessonId]: ev }));
  };

  const getLessonPathway = (lessonId: string) => activePathwayMap[lessonId] || 'core';
  const setLessonPathway = (lessonId: string, pathway: 'language' | 'supported' | 'core' | 'extended') => {
    setActivePathwayMap(prev => ({ ...prev, [lessonId]: pathway }));
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
        lesson.primaryPractice.toLowerCase().includes(query) ||
        lesson.directInstructionContext.toLowerCase().includes(query)
      );
    });

    if (filteredLessons.length === 0) return null;
    return { ...project, lessons: filteredLessons };
  }).filter(Boolean) as Project[];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px 20px', fontFamily: "'Inter', system-ui, sans-serif", color: '#1e0e34' }}>
      
      {/* PAGE HEADER CARD */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
        border: '1px solid rgba(92, 36, 131, 0.15)',
        borderRadius: '20px',
        padding: '32px shadow-sm',
        marginBottom: '32px',
        boxShadow: '0 8px 30px rgba(92, 36, 131, 0.05)',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f3eeff',
              border: '1px solid #e6dbff',
              color: '#5c2483',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>
              📚 MOSAIC K-5 CURRICULUM HUB
            </div>
            
            <h1 style={{
              fontSize: '2.4rem',
              fontWeight: 900,
              color: '#2d183b',
              margin: '0 0 8px 0',
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}>
              Kindergarten Science & Engineering
            </h1>
            
            <p style={{ fontSize: '0.95rem', color: '#5c5866', margin: 0, fontWeight: 500 }}>
              North Carolina Standards-Aligned Clear Scientific Evidence-Release Curriculum (36 Detailed Lessons)
            </p>
          </div>

          <button
            onClick={() => window.print()}
            style={{
              background: '#5c2483',
              color: '#ffffff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(92, 36, 131, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>🖨️</span>
            <span>Print / Export Lesson</span>
          </button>
        </div>
      </div>

      {/* GRADE SELECTION TABS */}
      <div style={{ marginBottom: '32px', textAlign: 'left' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8e8a99', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
          SELECT GRADE LEVEL
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '10px',
          background: '#f8fafc',
          padding: '8px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0'
        }}>
          {grades.map(g => {
            const isSelected = selectedGrade === g.code;
            return (
              <button
                key={g.code}
                onClick={() => setSelectedGrade(g.code)}
                style={{
                  background: isSelected ? '#5c2483' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#475569',
                  border: isSelected ? '1px solid #5c2483' : '1px solid #e2e8f0',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(92, 36, 131, 0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', fontFamily: "'Outfit', sans-serif" }}>{g.label}</span>
                  {g.active && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      background: isSelected ? 'rgba(255,255,255,0.2)' : '#dcfce7',
                      color: isSelected ? '#fff' : '#166534',
                      padding: '2px 6px',
                      borderRadius: '10px'
                    }}>
                      Active
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', marginTop: '4px', opacity: isSelected ? 0.9 : 0.7 }}>{g.count}</div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedGrade !== 'K' ? (
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '48px',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🚧</span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2d183b', margin: '0 0 8px 0', fontFamily: "'Outfit', sans-serif" }}>
            Grade {selectedGrade} Science Coming Soon
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 16px 0' }}>
            Grade {selectedGrade} Evidence-Release Curriculum is currently in active development.
          </p>
          <button
            onClick={() => setSelectedGrade('K')}
            style={{
              background: '#5c2483',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Explore Kindergarten Science (36 Lessons)
          </button>
        </div>
      ) : (
        <>
          {/* SEARCH & PROJECT FILTERS */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}>
            
            {/* Project Filter Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => setActiveProjectId('all')}
                style={{
                  background: activeProjectId === 'all' ? '#5c2483' : '#f8fafc',
                  color: activeProjectId === 'all' ? '#ffffff' : '#475569',
                  border: activeProjectId === 'all' ? '1px solid #5c2483' : '1px solid #e2e8f0',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                All Projects ({CURRICULUM_META.totalLessons} Lessons)
              </button>

              {KINDERGARTEN_PROJECTS.map(proj => (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectId(proj.id)}
                  style={{
                    background: activeProjectId === proj.id ? '#5c2483' : '#f8fafc',
                    color: activeProjectId === proj.id ? '#ffffff' : '#475569',
                    border: activeProjectId === proj.id ? '1px solid #5c2483' : '1px solid #e2e8f0',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Project {proj.projectNumber}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '260px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons or NC standards..."
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '8px 12px 8px 32px',
                  fontSize: '0.8rem',
                  color: '#1e0e34',
                  outline: 'none'
                }}
              />
              <span style={{ position: 'absolute', left: '10px', top: '8px', color: '#94a3b8', fontSize: '0.8rem' }}>🔍</span>
            </div>

          </div>

          {/* PROJECTS & LESSONS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {filteredProjects.map(project => (
              <div key={project.id} style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                
                {/* Project Banner Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #2d183b 0%, #5c2483 100%)',
                  color: '#ffffff',
                  padding: '20px 24px',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ background: '#ffffff', color: '#5c2483', fontSize: '0.65rem', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        PROJECT {project.projectNumber}
                      </span>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', margin: 0, fontFamily: "'Outfit', sans-serif" }}>
                        {project.title}
                      </h2>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                      {project.description}
                    </p>
                  </div>

                  <span style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px' }}>
                    {project.lessons.length} Detailed Lessons
                  </span>
                </div>

                {/* Lessons List Inside Project */}
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {project.lessons.map(lesson => {
                    const isExpanded = expandedLessonId === lesson.id;
                    const activeTab = getLessonTab(lesson.id);
                    const activeEvidenceNum = getLessonEvidence(lesson.id);
                    const activePathway = getLessonPathway(lesson.id);
                    const currentEvidence = lesson[`evidence${activeEvidenceNum}` as keyof Lesson] as any;

                    return (
                      <div
                        key={lesson.id}
                        style={{
                          background: '#ffffff',
                          border: isExpanded ? '2px solid #5c2483' : '1px solid #e2e8f0',
                          borderRadius: '14px',
                          overflow: 'hidden',
                          transition: 'all 0.2s ease',
                          boxShadow: isExpanded ? '0 4px 16px rgba(92, 36, 131, 0.1)' : '0 1px 3px rgba(0,0,0,0.02)'
                        }}
                      >
                        {/* Lesson Summary Bar */}
                        <div
                          onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                          style={{
                            padding: '16px 20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            background: isExpanded ? '#fbf9ff' : '#ffffff'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', textAlign: 'left' }}>
                            <span style={{
                              background: '#5c2483',
                              color: '#ffffff',
                              fontSize: '0.75rem',
                              fontWeight: 900,
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontFamily: "'Outfit', sans-serif"
                            }}>
                              Lesson {lesson.lessonNumber}
                            </span>

                            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e0e34', margin: 0, fontFamily: "'Outfit', sans-serif" }}>
                              {lesson.title}
                            </h3>

                            <span style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                              {lesson.primaryPractice}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {lesson.ncObjectives.map(nc => (
                                <span key={nc} style={{ background: '#f3eeff', color: '#5c2483', border: '1px solid #e6dbff', fontSize: '0.7rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>
                                  NC: {nc}
                                </span>
                              ))}
                            </div>

                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#5c2483' }}>
                              {isExpanded ? 'Collapse ▲' : 'Explore Lesson ▼'}
                            </span>
                          </div>
                        </div>

                        {/* Expanded Drawer Content */}
                        {isExpanded && (
                          <div style={{ borderTop: '1px solid #e2e8f0', padding: '24px', background: '#fcfbfe', textAlign: 'left' }}>
                            
                            {/* 3 Workspace Tabs */}
                            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                              <button
                                onClick={() => setLessonTab(lesson.id, 'launch')}
                                style={{
                                  background: activeTab === 'launch' ? '#5c2483' : '#ffffff',
                                  color: activeTab === 'launch' ? '#ffffff' : '#475569',
                                  border: activeTab === 'launch' ? '1px solid #5c2483' : '1px solid #cbd5e1',
                                  padding: '8px 16px',
                                  borderRadius: '8px',
                                  fontSize: '0.8rem',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                🎯 1. Launch & Task Script
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'evidence')}
                                style={{
                                  background: activeTab === 'evidence' ? '#5c2483' : '#ffffff',
                                  color: activeTab === 'evidence' ? '#ffffff' : '#475569',
                                  border: activeTab === 'evidence' ? '1px solid #5c2483' : '1px solid #cbd5e1',
                                  padding: '8px 16px',
                                  borderRadius: '8px',
                                  fontSize: '0.8rem',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                📦 2. Evidence Releases (1–2–3)
                              </button>

                              <button
                                onClick={() => setLessonTab(lesson.id, 'checklist')}
                                style={{
                                  background: activeTab === 'checklist' ? '#5c2483' : '#ffffff',
                                  color: activeTab === 'checklist' ? '#ffffff' : '#475569',
                                  border: activeTab === 'checklist' ? '1px solid #5c2483' : '1px solid #cbd5e1',
                                  padding: '8px 16px',
                                  borderRadius: '8px',
                                  fontSize: '0.8rem',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                ✅ 3. Facilitator Checklist
                              </button>
                            </div>

                            {/* TAB 1: LAUNCH & SCRIPT */}
                            {activeTab === 'launch' && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                
                                {/* Teacher Context Notice */}
                                <div style={{ background: '#fffbeb', border: '1px solid #fef08a', padding: '12px 16px', borderRadius: '10px', fontSize: '0.8rem', color: '#713f12' }}>
                                  <strong style={{ color: '#854d0e', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block', marginBottom: '2px' }}>
                                    🔒 Teacher Background • What Would Normally Be Direct Instruction?
                                  </strong>
                                  <em>{lesson.directInstructionContext}</em>
                                </div>

                                {/* Task Script Callout */}
                                <div style={{ background: '#f3eeff', borderLeft: '5px solid #5c2483', padding: '20px', borderRadius: '8px' }}>
                                  <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#5c2483', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                                    EXACT KINDERGARTEN TASK SCRIPT (SAY ALOUD TO STUDENTS)
                                  </span>
                                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#2d183b', fontStyle: 'italic', lineHeight: 1.3, fontFamily: "'Outfit', sans-serif" }}>
                                    &ldquo;{lesson.launch.kindergartenTaskScript}&rdquo;
                                  </div>
                                  <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#4c1d95', borderTop: '1px solid #e6dbff', paddingTop: '8px' }}>
                                    <strong>Facilitator Launch Prompt:</strong> &ldquo;{lesson.launch.prompt}&rdquo;
                                  </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', fontSize: '0.8rem' }}>
                                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '10px' }}>
                                    <strong style={{ color: '#5c2483', display: 'block', marginBottom: '4px' }}>🛠️ Preparation & Materials:</strong>
                                    <p style={{ color: '#475569', margin: 0, lineHeight: 1.4 }}>{lesson.prepare}</p>
                                  </div>
                                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '10px' }}>
                                    <strong style={{ color: '#5c2483', display: 'block', marginBottom: '4px' }}>🧒 What Children Do Before Evidence:</strong>
                                    <p style={{ color: '#475569', margin: 0, lineHeight: 1.4 }}>{lesson.launch.studentActionsBeforeEvidence}</p>
                                  </div>
                                </div>

                                {/* Small-Group Access Pathways */}
                                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px' }}>
                                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5c2483', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                                    👥 Small-Group Access Pathways
                                  </span>
                                  
                                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                    {(['language', 'supported', 'core', 'extended'] as const).map(pw => (
                                      <button
                                        key={pw}
                                        onClick={() => setLessonPathway(lesson.id, pw)}
                                        style={{
                                          background: activePathway === pw ? '#3730a3' : '#f1f5f9',
                                          color: activePathway === pw ? '#ffffff' : '#475569',
                                          border: 'none',
                                          padding: '4px 10px',
                                          borderRadius: '6px',
                                          fontSize: '0.75rem',
                                          fontWeight: 700,
                                          cursor: 'pointer'
                                        }}
                                      >
                                        {pw === 'language' && 'Language & Representation'}
                                        {pw === 'supported' && 'Supported Investigation'}
                                        {pw === 'core' && 'Core Investigation'}
                                        {pw === 'extended' && 'Extended Challenge'}
                                      </button>
                                    ))}
                                  </div>

                                  <p style={{ fontSize: '0.85rem', color: '#1e293b', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                                    {activePathway === 'language' && lesson.accessPathways.languageRepresentation}
                                    {activePathway === 'supported' && lesson.accessPathways.supportedInvestigation}
                                    {activePathway === 'core' && lesson.accessPathways.coreInvestigation}
                                    {activePathway === 'extended' && lesson.accessPathways.extendedChallenge}
                                  </p>
                                </div>

                              </div>
                            )}

                            {/* TAB 2: EVIDENCE PACKAGES */}
                            {activeTab === 'evidence' && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  {[1, 2, 3].map(num => (
                                    <button
                                      key={num}
                                      onClick={() => setLessonEvidence(lesson.id, num as 1 | 2 | 3)}
                                      style={{
                                        background: activeEvidenceNum === num ? '#5c2483' : '#ffffff',
                                        color: activeEvidenceNum === num ? '#ffffff' : '#475569',
                                        border: activeEvidenceNum === num ? '1px solid #5c2483' : '1px solid #cbd5e1',
                                        padding: '6px 14px',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        fontWeight: 800,
                                        cursor: 'pointer'
                                      }}
                                    >
                                      Evidence Release {num}
                                    </button>
                                  ))}
                                </div>

                                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                  <div>
                                    <span style={{ background: '#f3eeff', color: '#5c2483', border: '1px solid #e6dbff', fontSize: '0.7rem', fontWeight: 900, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                                      {currentEvidence.title}
                                    </span>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e0e34', margin: '8px 0 6px 0', fontFamily: "'Outfit', sans-serif" }}>
                                      Scientific Knowledge Statement:
                                    </h4>
                                    <div style={{ background: '#f5f3ff', border: '1px solid #e0e7ff', padding: '12px 16px', borderRadius: '10px', color: '#4c1d95', fontSize: '0.85rem', fontWeight: 700 }}>
                                      &ldquo;{currentEvidence.scientificKnowledge}&rdquo;
                                    </div>
                                  </div>

                                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '14px 16px', borderRadius: '10px' }}>
                                    <strong style={{ color: '#065f46', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                                      📦 EXACT EVIDENCE PACKAGE (GIVE / SHOW THIS):
                                    </strong>
                                    <p style={{ color: '#064e3b', fontSize: '0.85rem', margin: 0, fontWeight: 600, lineHeight: 1.4 }}>
                                      {currentEvidence.exactEvidencePackage}
                                    </p>
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', fontSize: '0.8rem' }}>
                                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                                      <strong style={{ color: '#475569', display: 'block', marginBottom: '4px' }}>👩‍🔬 Student Work with Evidence:</strong>
                                      <p style={{ color: '#1e293b', margin: 0, lineHeight: 1.4 }}>{currentEvidence.studentWork}</p>
                                    </div>

                                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                                      <strong style={{ color: '#b45309', display: 'block', marginBottom: '4px' }}>🔄 Required Group Action:</strong>
                                      <p style={{ color: '#1e293b', margin: 0, lineHeight: 1.4 }}>{currentEvidence.requiredGroupAction}</p>
                                    </div>
                                  </div>

                                  {/* Differentiated Questions */}
                                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                                    <strong style={{ fontSize: '0.75rem', color: '#5c2483', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                                      ❓ Differentiated Questioning Levels:
                                    </strong>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '0.75rem' }}>
                                      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px', borderRadius: '8px' }}>
                                        <strong style={{ color: '#1e40af', display: 'block', marginBottom: '2px' }}>1. Slow Down:</strong>
                                        <p style={{ color: '#1e3a8a', margin: 0, lineHeight: 1.3 }}>{currentEvidence.questions.slowDown}</p>
                                      </div>

                                      <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', padding: '10px', borderRadius: '8px' }}>
                                        <strong style={{ color: '#6b21a8', display: 'block', marginBottom: '2px' }}>2. Core Reasoning:</strong>
                                        <p style={{ color: '#581c87', margin: 0, lineHeight: 1.3 }}>{currentEvidence.questions.coreReasoning}</p>
                                      </div>

                                      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '10px', borderRadius: '8px' }}>
                                        <strong style={{ color: '#92400e', display: 'block', marginBottom: '2px' }}>3. Challenge / Extend:</strong>
                                        <p style={{ color: '#78350f', margin: 0, lineHeight: 1.3 }}>{currentEvidence.questions.challengeExtend}</p>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            )}

                            {/* TAB 3: CHECKLIST */}
                            {activeTab === 'checklist' && (
                              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                                <strong style={{ fontSize: '0.8rem', color: '#5c2483', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                                  📋 Facilitator Evidence Checklist (Lesson {lesson.lessonNumber}):
                                </strong>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {lesson.facilitatorChecklist.map((item, idx) => {
                                    const isChecked = !!checkedItems[`${lesson.id}-${idx}`];
                                    return (
                                      <label
                                        key={idx}
                                        onClick={() => handleChecklistToggle(lesson.id, idx)}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '10px',
                                          fontSize: '0.8rem',
                                          color: isChecked ? '#94a3b8' : '#1e293b',
                                          textDecoration: isChecked ? 'line-through' : 'none',
                                          cursor: 'pointer',
                                          padding: '6px 10px',
                                          background: isChecked ? '#f8fafc' : '#ffffff',
                                          borderRadius: '6px',
                                          border: '1px solid #f1f5f9'
                                        }}
                                      >
                                        <input type="checkbox" checked={isChecked} readOnly style={{ accentColor: '#5c2483' }} />
                                        <span>{item}</span>
                                      </label>
                                    );
                                  })}
                                </div>
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
