'use client';

import React from 'react';
import Navigation from '../discovery/Navigation';
import Footer from '../discovery/Footer';
import CurriculumViewer from './CurriculumViewer';
import { discoveryCss } from '../discovery/styles';

export default function CurriculumPage() {
  return (
    <div className="curriculum-hub-container min-h-screen text-zinc-900 flex flex-col justify-between relative" style={{ background: 'var(--bg-dark, #F9F8FC)' }}>
      <style dangerouslySetInnerHTML={{ __html: discoveryCss }} />
      <Navigation />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "60px", width: "100%" }}>
        <CurriculumViewer />
      </main>

      <Footer />
    </div>
  );
}
