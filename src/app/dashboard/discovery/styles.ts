export const discoveryCss = `
/* Global Design System - Innovation Lab Light Theme */

:root {
  /* Colors */
  --bg-dark: #F9F8FC;
  --bg-deep: #FFFFFF;
  --text-primary: #1E0E34;
  --text-secondary: #5C5866;
  --text-muted: #8E8A99;
  
  --primary: #5C2483;
  --primary-light: #8B5CF6;
  --primary-glow: rgba(92, 36, 131, 0.06);
  
  --secondary: #06b6d4;
  --secondary-light: #0891b2;
  --secondary-glow: rgba(6, 182, 212, 0.06);

  --accent: #ec4899;
  --accent-light: #f472b6;
  
  --success: #10b981;
  --success-glow: rgba(16, 185, 129, 0.05);
  --warning: #f59e0b;
  --danger: #ef4444;

  /* Fonts */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Layout */
  --max-width: 1280px;
  --border-radius-sm: 8px;
  --border-radius-md: 16px;
  --border-radius-lg: 24px;
  --border-radius-xl: 32px;
  
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.9);
  --glass-border: rgba(92, 36, 131, 0.08);
  --glass-glow: 0 8px 32px 0 rgba(92, 36, 131, 0.04);
  --glass-blur: blur(8px);

  /* Transitions */
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background-color: var(--bg-dark);
  font-family: var(--font-body);
  color: var(--text-primary);
}

body {
  overflow-x: hidden;
  min-height: 100vh;
  background: radial-gradient(circle at 50% -20%, #F3EEFF 0%, var(--bg-dark) 60%);
  background-attachment: fixed;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar Customization */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: var(--bg-dark);
}
::-webkit-scrollbar-thumb {
  background: rgba(92, 36, 131, 0.15);
  border-radius: 5px;
  border: 2px solid var(--bg-dark);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(92, 36, 131, 0.3);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #1E0E34 30%, #5C2483 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
`;
