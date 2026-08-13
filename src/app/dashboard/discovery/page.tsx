'use client';

import React from 'react';
import Navigation from './Navigation';
import Curriculum from './Curriculum';
import Footer from './Footer';
import { discoveryCss } from './styles';

export default function DiscoveryLabPage() {
  return (
    <div className="discovery-lab-container min-h-screen text-zinc-800 flex flex-col justify-between relative" style={{ background: '#07030f' }}>
      {/* Scope the custom global dark theme styles in a standard style block */}
      <style dangerouslySetInnerHTML={{ __html: discoveryCss }} />

      {/* Clean Navigation Topbar */}
      <Navigation />

      {/* Main Container - Only Curriculum Hub */}
      <main className="flex-1 pt-24 pb-12 w-full">
        <Curriculum />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
