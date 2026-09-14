'use client';

import React from 'react';
import Navigation from '../discovery/Navigation';
import Footer from '../discovery/Footer';
import CurriculumViewer from './CurriculumViewer';
import { discoveryCss } from '../discovery/styles';

export default function CurriculumPage() {
  return (
    <div className="curriculum-hub-container min-h-screen text-zinc-100 flex flex-col justify-between relative" style={{ background: '#07030f' }}>
      <style dangerouslySetInnerHTML={{ __html: discoveryCss }} />
      <Navigation />

      <main className="flex-1 pt-24 pb-16 w-full">
        <CurriculumViewer />
      </main>

      <Footer />
    </div>
  );
}
