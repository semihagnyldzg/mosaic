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

      <main className="flex-1 pt-32 sm:pt-36 pb-16 w-full">
        <CurriculumViewer />
      </main>

      <Footer />
    </div>
  );
}
