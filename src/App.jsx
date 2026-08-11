import React from 'react';
import Navigation from './components/Navigation';
import Curriculum from './components/Curriculum';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Clean Navigation Topbar */}
      <Navigation />

      {/* Main Container - Only Curriculum Hub */}
      <main style={{ flexGrow: 1 }}>
        <Curriculum />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;