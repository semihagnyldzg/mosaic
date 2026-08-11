import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Pre-load synthesis voices for browser compatibility
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  // --- Gateway and Role Initialization ---
  const gateway = document.getElementById('entrance-gateway');
  const btnGatewayFacilitator = document.getElementById('gateway-btn-facilitator');
  const btnGatewayStudent = document.getElementById('gateway-btn-student');

  function setRole(role) {
    if (role === 'student') {
      sessionStorage.setItem('userRole', 'student');
      document.body.classList.add('role-student-mode');
      document.body.classList.remove('role-facilitator-mode');
      if (gateway) gateway.classList.add('hidden');
      window.location.hash = '#student-portal';
      try {
        initializeStudentPortal();
      } catch (e) {
        console.error("Error in initializeStudentPortal:", e);
      }
      try {
        initializeStudentPortal002();
      } catch (e) {
        console.error("Error in initializeStudentPortal002:", e);
      }
      try {
        syncActiveStudioVisibility();
      } catch (e) {
        console.error("Error in syncActiveStudioVisibility:", e);
      }
    } else if (role === 'facilitator') {
      sessionStorage.setItem('userRole', 'facilitator');
      document.body.classList.add('role-facilitator-mode');
      document.body.classList.remove('role-student-mode');
      if (gateway) gateway.classList.add('hidden');
      window.location.hash = '#facilitator-portal';
    } else {
      sessionStorage.removeItem('userRole');
      document.body.classList.remove('role-student-mode');
      document.body.classList.remove('role-facilitator-mode');
      if (gateway) gateway.classList.remove('hidden');
      window.location.hash = '#home';
    }
  }

  // Check saved role on startup
  const savedRole = sessionStorage.getItem('userRole');
  if (savedRole) {
    // Delay slightly to ensure elements are parsed
    setTimeout(() => {
      setRole(savedRole);
    }, 50);
  } else {
    // Delay slightly
    setTimeout(() => {
      setRole(null);
    }, 50);
  }

  if (btnGatewayFacilitator) {
    btnGatewayFacilitator.addEventListener('click', () => setRole('facilitator'));
  }
  if (btnGatewayStudent) {
    btnGatewayStudent.addEventListener('click', () => setRole('student'));
  }

  // --- Navigation & Routing ---
  const sections = document.querySelectorAll('.app-section');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');

  function handleRoute() {
    let hash = window.location.hash || '#home';
    const activeRole = sessionStorage.getItem('userRole');

    // Auto-sync role based on URL hash to prevent uninitialized states on page refresh/manual entry
    if (hash === '#student-portal' && activeRole !== 'student') {
      setRole('student');
      return;
    }
    if (hash === '#facilitator-portal' && activeRole !== 'facilitator') {
      setRole('facilitator');
      return;
    }

    if (activeRole === 'student') {
      if (window.location.hash !== '#student-portal') {
        window.location.hash = '#student-portal';
        return;
      }
    }
    
    // Parse target section id (everything before the second '#' or handle hashes like #framework#practices-list)
    let targetSectionId = hash.split('#')[1];
    let anchorId = null;
    
    if (hash.includes('#', 1)) {
      // e.g. #framework#practices-list
      const parts = hash.substring(1).split('#');
      targetSectionId = parts[0];
      anchorId = parts[1];
    }

    const targetSection = document.getElementById(targetSectionId);

    if (targetSection) {
      // Hide all sections, deactivate all links
      sections.forEach(s => s.classList.remove('active'));
      navLinks.forEach(l => l.classList.remove('active'));

      // Show target section
      targetSection.classList.add('active');

      // Highlight corresponding link
      const matchingLinks = document.querySelectorAll(`[href*="#${targetSectionId}"]`);
      matchingLinks.forEach(l => l.classList.add('active'));

      // Close mobile menu
      closeMobileMenu();

      // Scroll behavior
      if (anchorId) {
        setTimeout(() => {
          const anchorElement = document.getElementById(anchorId);
          if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  window.addEventListener('hashchange', handleRoute);
  // Run router on load
  handleRoute();

  // --- Mobile Menu Toggle ---
  function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileNavMenu.classList.toggle('active');
    
    // Animate mobile burger menu icon to "X"
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenuBtn.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileNavMenu.classList.remove('active');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach(s => s.style.transform = 'none');
    spans.forEach(s => s.style.opacity = '1');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // --- Case Study Map Nodes ---
  const mapNodes = document.querySelectorAll('.map-node');
  const details = document.querySelectorAll('.subject-detail');

  mapNodes.forEach(node => {
    node.addEventListener('click', () => {
      // Set active node
      mapNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      // Set active detail
      const targetSubject = node.getAttribute('data-subject');
      details.forEach(d => {
        d.classList.remove('active');
        if (d.getAttribute('id') === `detail-${targetSubject}`) {
          d.classList.add('active');
        }
      });
    });
  });

  // --- Community Practice Cards ---
  const practiceCards = document.querySelectorAll('.practice-card');

  practiceCards.forEach(card => {
    card.addEventListener('click', () => {
      // Toggle expanded on clicked card
      card.classList.toggle('expanded');
    });
  });

  // --- Forms Submission ---
  const pilotForm = document.getElementById('pilot-program-form');
  const pilotSuccess = document.getElementById('pilot-form-success');
  const contactForm = document.getElementById('contact-general-form');
  const contactSuccess = document.getElementById('contact-form-success');

  if (pilotForm) {
    pilotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Select submit button and show loading state
      const submitBtn = document.getElementById('submit-pilot-btn');
      submitBtn.innerText = 'Submitting...';
      submitBtn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        pilotForm.classList.add('hidden');
        pilotSuccess.classList.remove('hidden');
      }, 1200);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Select submit button and show loading state
      const submitBtn = document.getElementById('submit-contact-btn');
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        contactForm.classList.add('hidden');
        contactSuccess.classList.remove('hidden');
      }, 1200);
    });
  }

  // --- Video Trigger Play/Pause (Simulated Streaming Feed with Audio Speech) ---
  const videoContainers = document.querySelectorAll('.video-container');

  videoContainers.forEach(container => {
    const overlay = container.querySelector('.video-overlay');
    const loader = container.querySelector('.video-loader');
    const activeControls = container.querySelector('.video-active-controls');
    const fill = container.querySelector('.video-progress-fill');
    const currentTimeText = container.querySelector('.current-time');
    const duration = parseInt(container.getAttribute('data-duration') || '12', 10);
    
    let timerInterval = null;
    let secondsElapsed = 0;
    let isPlaying = false;

    function formatTime(secs) {
      const m = Math.floor(secs / 60).toString().padStart(2, '0');
      const s = (secs % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // 1. Show buffering state
        overlay.classList.add('hidden');
        if (loader) loader.classList.remove('hidden');

        // 2. Start streaming video feed after 1 second
        setTimeout(() => {
          if (loader) loader.classList.add('hidden');
          if (activeControls) activeControls.classList.remove('hidden');
          container.classList.add('playing'); // Reveal the transcript below
          isPlaying = true;

          // Start timer ticks
          secondsElapsed = 0;
          if (currentTimeText) currentTimeText.innerText = formatTime(0);
          if (fill) fill.style.width = '0%';

          if (timerInterval) clearInterval(timerInterval);

          // Get transcript text to read out loud
          const quote = container.querySelector('.video-transcript blockquote');
          const textToSpeak = quote ? quote.innerText.replace(/"/g, '') : '';
          
          if (textToSpeak && ('speechSynthesis' in window)) {
            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            
            const isMale = container.getAttribute('data-voice') === 'male';
            const voices = window.speechSynthesis.getVoices();
            let selectedVoice = null;
            
            if (isMale) {
              // Search for a male voice
              selectedVoice = voices.find(v => 
                v.lang.startsWith('en') && 
                (v.name.toLowerCase().includes('male') || 
                 v.name.toLowerCase().includes('david') || 
                 v.name.toLowerCase().includes('mark') || 
                 v.name.toLowerCase().includes('ravi') || 
                 v.name.toLowerCase().includes('george') || 
                 v.name.toLowerCase().includes('microsoft david'))
              );
            } else {
              // Search for a female voice
              selectedVoice = voices.find(v => 
                v.lang.startsWith('en') && 
                (v.name.toLowerCase().includes('female') || 
                 v.name.toLowerCase().includes('zira') || 
                 v.name.toLowerCase().includes('samantha') || 
                 v.name.toLowerCase().includes('hazel') || 
                 v.name.toLowerCase().includes('google us english') || 
                 v.name.toLowerCase().includes('susan'))
              );
            }
            
            if (selectedVoice) {
              utterance.voice = selectedVoice;
            }
            
            utterance.lang = 'en-US';
            utterance.rate = 0.95; // Natural speaking pace
            window.speechSynthesis.speak(utterance);
          }

          timerInterval = setInterval(() => {
            if (!isPlaying) {
              clearInterval(timerInterval);
              return;
            }

            secondsElapsed++;
            if (currentTimeText) currentTimeText.innerText = formatTime(secondsElapsed);
            if (fill) {
              const pct = (secondsElapsed / duration) * 100;
              fill.style.width = `${pct}%`;
            }

            // End of streaming video feed
            if (secondsElapsed >= duration) {
              clearInterval(timerInterval);
              isPlaying = false;
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              setTimeout(() => {
                // Reset player controls back to play overlay
                if (activeControls) activeControls.classList.add('hidden');
                overlay.classList.remove('hidden');
                if (fill) fill.style.width = '0%';
                if (currentTimeText) currentTimeText.innerText = formatTime(0);
              }, 500);
            }
          }, 1000);
        }, 1000);
      });
    }

    // Stop/Pause when clicking active controls screen (click to pause/reset)
    if (activeControls) {
      activeControls.addEventListener('click', (e) => {
        e.stopPropagation();
        isPlaying = false;
        if (timerInterval) clearInterval(timerInterval);
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel(); // Mute/stop speaking
        }
        
        // Reset player interface back to beginning
        activeControls.classList.add('hidden');
        if (overlay) overlay.classList.remove('hidden');
        if (fill) fill.style.width = '0%';
        if (currentTimeText) currentTimeText.innerText = formatTime(0);
      });
    }
  });

  // --- Systems Thinking Connection Data Map ---
  const systemConnectionsMap = {
    'q1-q2': {
      title: '💨 Wind Force & Gravity (Mechanical Stress)',
      flow: 'High Wind Speeds ➔ Continuous Force on Canopy ➔ Trunk Lean over Time',
      desc: 'Strong winds blowing across the open slope of the park exert continuous mechanical load on the branches. Over time, this forces the tree to grow at an angle.'
    },
    'q1-q3': {
      title: '🍂 Soil Anchorage & Moisture (Structural Support)',
      flow: 'Dry Sandy Soil ➔ Loose Anchorage ➔ Root Slippage ➔ Leaning Trunk',
      desc: 'Dry, eroded sandy soil is loose and cannot hold the tree\'s root system firmly in place. Without solid anchorage, the tree tilts under its own weight.'
    },
    'q2-q3': {
      title: '🏜️ Wind Evaporation (Microclimate)',
      flow: 'Strong Wind Sweeps ➔ Accelerated Evaporation ➔ Dried Topsoil',
      desc: 'High winds sweep away moisture from the surface of the soil, drying it out much faster than in the sheltered, densely forested areas of the park.'
    },
    'q3-q4': {
      title: '🐛 Biodiversity & Soil Health (Food Web)',
      flow: 'Low Soil Moisture ➔ Dry Ground ➔ Less Undergrowth ➔ Fewer Insect Habitats',
      desc: 'Dry, sandy soil prevents wildflowers, grass, and undergrowth from growing. Without this vegetative cover, insects lose their primary food source and shelter.'
    },
    'q2-q4': {
      title: '🐝 Wind Turbulence & Flight (Habitats)',
      flow: 'Strong Winds ➔ Flight Disruption ➔ Insects Seek Shelter in Denser Woods',
      desc: 'Strong winds make it difficult for flying insects like butterflies and bees to navigate, forcing them to leave the exposed hillside for quieter zones.'
    },
    'q1-q4': {
      title: '🪵 Tree Stress & Biodiversity (Ecosystem Feedback)',
      flow: 'Leaning Tree Stress ➔ Damaged Sap Flow ➔ Weakened Defense ➔ Insect Shifts',
      desc: 'A leaning tree is under physical stress. Its roots are damaged, reducing its nutrient absorption and sap flow, attracting different insect populations.'
    }
  };

  function getSystemConnectionHTML(id1, id2, text1, text2) {
    const key = [id1, id2].sort().join('-');
    const link = systemConnectionsMap[key];

    if (link) {
      return `
        <div class="system-link-card" style="background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.2); padding: 16px; border-radius: 6px; margin-top: 12px; animation: fadeIn 0.3s ease;">
          <h4 style="color: var(--color-accent); font-size: 0.95rem; display: flex; align-items: center; gap: 8px; margin: 0;">${link.title}</h4>
          <div class="system-flow" style="font-family: var(--font-heading); font-size: 0.75rem; color: #57CBFF; margin: 8px 0; font-weight: 600;">
            ${link.flow}
          </div>
          <p style="font-size: 0.8rem; color: var(--color-text-light); line-height: 1.4; margin: 0;">${link.desc}</p>
        </div>
      `;
    } else {
      return `
        <div class="system-link-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); padding: 16px; border-radius: 6px; margin-top: 12px; animation: fadeIn 0.3s ease;">
          <h4 style="color: #fff; font-size: 0.9rem; margin: 0;">Connected Questions</h4>
          <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 4px; margin-bottom: 0;">
            1. ${text1}<br>
            2. ${text2}
          </p>
          <p style="font-size: 0.8rem; color: var(--color-accent); font-style: italic; margin-top: 8px; margin-bottom: 0; line-height: 1.3;">
            💡 Custom Link: Think about how these two are connected in the park. Is there a chain reaction? Discuss with your team!
          </p>
        </div>
      `;
    }
  }

  // --- Step 4 Sticky Board Sync Function ---
  function syncStep4UnsortedPool(scope) {
    const targetBoard = scope.querySelector('#chalkboard-target');
    const unsortedPool = scope.querySelector('#unsorted-sticky-pool');
    const orgTarget = scope.querySelector('#organisms-sticky-target');
    const envTarget = scope.querySelector('#environments-sticky-target');
    
    if (!targetBoard || !unsortedPool || !orgTarget || !envTarget) return;

    // Get all recorded words from the chalkboard
    const words = Array.from(targetBoard.querySelectorAll('.chalk-word')).map(w => w.innerText.trim());
    
    // Get already sorted words
    const sortedWords = Array.from(scope.querySelectorAll('.sticky-card-item')).map(s => s.innerText.trim().toLowerCase());
    
    // Clear unsorted pool
    unsortedPool.innerHTML = '';
    
    // Filter out already sorted
    const unsorted = words.filter(w => !sortedWords.includes(w.toLowerCase()));
    
    if (unsorted.length === 0) {
      unsortedPool.innerHTML = '<span class="chalk-placeholder text-xs" style="color: rgba(255,255,255,0.3)">No unsorted concepts. Write on Step 2 chalkboard, or all concepts are sorted!</span>';
      return;
    }

    unsorted.forEach(word => {
      const card = document.createElement('div');
      card.className = 'unsorted-sticky-card';
      card.innerHTML = `
        <span>${word}</span>
        <div class="sort-actions">
          <button class="btn-sort" data-target="organisms">🧬 Org</button>
          <button class="btn-sort" data-target="environments">🌍 Env</button>
        </div>
      `;

      card.querySelector('.btn-sort[data-target="organisms"]').addEventListener('click', () => {
        const item = document.createElement('div');
        item.className = 'sticky-card-item';
        item.innerText = word;
        orgTarget.appendChild(item);
        card.remove();
        if (unsortedPool.children.length === 0) {
          unsortedPool.innerHTML = '<span class="chalk-placeholder text-xs" style="color: rgba(255,255,255,0.3)">All concepts sorted!</span>';
        }
      });

      card.querySelector('.btn-sort[data-target="environments"]').addEventListener('click', () => {
        const item = document.createElement('div');
        item.className = 'sticky-card-item';
        item.innerText = word;
        envTarget.appendChild(item);
        card.remove();
        if (unsortedPool.children.length === 0) {
          unsortedPool.innerHTML = '<span class="chalk-placeholder text-xs" style="color: rgba(255,255,255,0.3)">All concepts sorted!</span>';
        }
      });

      unsortedPool.appendChild(card);
    });
  }

  // --- Studio 001 Walkthrough Simulator ---
  const btnToggle001 = document.getElementById('btn-toggle-studio-001');
  const expContainer = document.getElementById('studio-001-experience');

  if (btnToggle001 && expContainer) {
    btnToggle001.addEventListener('click', () => {
      expContainer.classList.toggle('hidden');
      if (expContainer.classList.contains('hidden')) {
        btnToggle001.innerText = 'Step Inside Studio 001 (45-Min Walkthrough)';
      } else {
        btnToggle001.innerText = 'Close Walkthrough Explorer';
        expContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Role Switcher (Facilitator Mode vs Student Mode)
  const roleBtns = document.querySelectorAll('.role-btn');
  if (roleBtns.length > 0 && expContainer) {
    roleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        roleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const role = btn.getAttribute('data-role');
        if (role === 'student') {
          expContainer.classList.add('role-student');
        } else {
          expContainer.classList.remove('role-student');
        }
      });
    });
  }

  // Step Switcher
  const expNavBtns = document.querySelectorAll('.exp-nav-btn');
  const expStepPanes = document.querySelectorAll('.exp-step-pane');

  expNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = btn.getAttribute('data-step');
      
      // Toggle active nav
      expNavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Toggle active pane
      expStepPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.getAttribute('id') === `exp-step-${targetStep}`) {
          pane.classList.add('active');
        }
      });

      // Sync Step 4 Unsorted Board observations
      if (targetStep === '4') {
        syncStep4UnsortedPool(document.getElementById('studio-001-experience'));
      }
    });
  });

  // Step 1: Silence Timer
  const btnTriggerSilence = document.getElementById('btn-trigger-silence');
  const silenceTimerText = document.getElementById('silence-timer');
  let silenceInterval = null;

  if (btnTriggerSilence && silenceTimerText) {
    btnTriggerSilence.addEventListener('click', () => {
      if (silenceInterval) {
        clearInterval(silenceInterval);
        silenceInterval = null;
        silenceTimerText.innerText = '20';
        silenceTimerText.classList.remove('pulsing');
        btnTriggerSilence.innerText = 'Start Countdown';
        return;
      }
      
      let count = 20;
      silenceTimerText.innerText = count;
      silenceTimerText.classList.add('pulsing');
      btnTriggerSilence.innerText = 'Reset';

      silenceInterval = setInterval(() => {
        count--;
        silenceTimerText.innerText = count;
        if (count <= 0) {
          clearInterval(silenceInterval);
          silenceInterval = null;
          silenceTimerText.classList.remove('pulsing');
          btnTriggerSilence.innerText = 'Restart';
        }
      }, 1000);
    });
  }

  // Step 2: Chalkboard Words
  const poolWords = document.querySelectorAll('.pool-word');
  const chalkboardTarget = document.getElementById('chalkboard-target');

  poolWords.forEach(word => {
    word.addEventListener('click', () => {
      const text = word.innerText;
      const placeholder = chalkboardTarget.querySelector('.chalk-placeholder');
      if (placeholder) {
        chalkboardTarget.innerHTML = '';
      }
      
      // Avoid duplicates
      const existingWords = Array.from(chalkboardTarget.querySelectorAll('.chalk-word')).map(w => w.innerText.toLowerCase());
      if (!existingWords.includes(text.toLowerCase())) {
        const span = document.createElement('span');
        span.className = 'chalk-word';
        span.innerText = text;
        chalkboardTarget.appendChild(span);
      }
    });
  });

  // Step 3: Observe vs Explain Photos
  const simPhotoCards = document.querySelectorAll('.sim-photo-card');
  const photoObsDetails = document.getElementById('photo-obs-details');
  const valObsText = photoObsDetails ? photoObsDetails.querySelector('.val-obs') : null;
  const valExpText = photoObsDetails ? photoObsDetails.querySelector('.val-exp') : null;

  simPhotoCards.forEach(card => {
    card.addEventListener('click', () => {
      simPhotoCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const obs = card.getAttribute('data-obs');
      const exp = card.getAttribute('data-exp');

      if (photoObsDetails && valObsText && valExpText) {
        valObsText.innerText = obs;
        valExpText.innerText = exp;
        photoObsDetails.classList.remove('hidden');
      }
    });
  });

  // Step 5: Wonder Wall
  const poolWonders = document.querySelectorAll('.pool-wonder');
  const wonderWallTarget = document.getElementById('wonder-wall-target');
  const customWonderInput = document.getElementById('custom-wonder');
  const addWonderBtn = document.getElementById('add-wonder-btn');

  function addWonderToWall(question) {
    if (!question.trim()) return;
    const placeholder = wonderWallTarget.querySelector('.chalk-placeholder');
    if (placeholder) {
      wonderWallTarget.innerHTML = '';
    }

    const sticky = document.createElement('div');
    sticky.className = 'wonder-sticky';
    sticky.innerText = question;
    wonderWallTarget.appendChild(sticky);
  }

  poolWonders.forEach(w => {
    w.addEventListener('click', () => {
      addWonderToWall(w.innerText);
    });
  });

  if (addWonderBtn && customWonderInput) {
    addWonderBtn.addEventListener('click', () => {
      addWonderToWall(customWonderInput.value);
      customWonderInput.value = '';
    });
    customWonderInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addWonderToWall(customWonderInput.value);
        customWonderInput.value = '';
      }
    });
  }

  // Step 6: System Connections nodes
  const connectNodes = document.querySelectorAll('.connect-node');
  const connectionResults = document.getElementById('connection-line-results');
  let selectedNodes = [];

  connectNodes.forEach(node => {
    node.addEventListener('click', () => {
      node.classList.toggle('selected');
      
      if (node.classList.contains('selected')) {
        selectedNodes.push(node);
      } else {
        selectedNodes = selectedNodes.filter(n => n !== node);
      }

      if (selectedNodes.length === 2) {
        const placeholder = connectionResults.querySelector('.chalk-placeholder');
        if (placeholder) {
          connectionResults.innerHTML = '';
        }

        const id1 = selectedNodes[0].getAttribute('data-id');
        const id2 = selectedNodes[1].getAttribute('data-id');
        const text1 = selectedNodes[0].innerText;
        const text2 = selectedNodes[1].innerText;

        const linkDiv = document.createElement('div');
        linkDiv.className = 'connection-link-item mt-2';
        linkDiv.innerHTML = getSystemConnectionHTML(id1, id2, text1, text2);
        connectionResults.appendChild(linkDiv);

        // Reset state
        selectedNodes.forEach(n => n.classList.remove('selected'));
        selectedNodes = [];
      }
    });
  });

  // Step 7: Votes
  const voteBtns = document.querySelectorAll('.vote-btn');
  const voteResult = document.getElementById('vote-result');
  const votedText = document.getElementById('voted-text');

  voteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      voteBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.getAttribute('data-vote');
      if (voteResult && votedText) {
        votedText.innerText = `"${val}"`;
        voteResult.classList.remove('hidden');
      }
    });
  });

  // Step 9: Report loop submission
  const submitLoopBtn = document.getElementById('submit-loop-btn');
  const partnerResponseLoop = document.getElementById('partner-response-loop');
  const loopNoticedInput = document.getElementById('loop-noticed');
  const loopQuestionInput = document.getElementById('loop-question');

  if (submitLoopBtn) {
    submitLoopBtn.addEventListener('click', () => {
      const noticed = loopNoticedInput ? loopNoticedInput.value.trim() : '';
      const question = loopQuestionInput ? loopQuestionInput.value.trim() : '';

      if (!noticed || !question) {
        alert('Please fill out both observation and wonder question before submitting.');
        return;
      }

      submitLoopBtn.innerText = 'Submitting report to Apex Parks...';
      submitLoopBtn.disabled = true;

      // Simulate loop feedback delay
      setTimeout(() => {
        submitLoopBtn.innerText = 'Report Submitted';
        if (partnerResponseLoop) {
          partnerResponseLoop.classList.remove('hidden');
          partnerResponseLoop.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 1500);
    });
  }

  // ==========================================================================
  // STUDENT & FACILITATOR DUAL PORTAL ENGINE
  // ==========================================================================

  // Global Submissions State
  let submissions = [
    { team: 'Team Alpha', noticed: 'Butterflies only cluster around trees on the sunny west side.', question: 'Do butterflies need direct sunlight or nectar?' },
    { team: 'Team Beta', noticed: 'Mushrooms are growing near the bases of leaning pine trees.', question: 'Are the mushrooms helping the trees or are they parasites?' }
  ];

  // Render Facilitator Inbox Table
  const inboxTableBody = document.getElementById('facilitator-inbox-table-body');
  const inboxBadgeCount = document.getElementById('inbox-badge-count');

  function renderFacilitatorInbox() {
    if (!inboxTableBody) return;
    inboxTableBody.innerHTML = '';
    
    submissions.forEach(sub => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="padding: 12px;" class="inbox-row-team">${sub.team}</td>
        <td style="padding: 12px;" class="inbox-row-text">"${sub.noticed}"</td>
        <td style="padding: 12px;" class="inbox-row-text">"${sub.question}"</td>
        <td style="padding: 12px; text-align: center;">
          <button class="btn btn-secondary btn-xs btn-review-submission" style="padding: 4px 8px; font-size: 0.75rem;">Send to Partner</button>
        </td>
      `;
      
      // Bind Review Action
      row.querySelector('.btn-review-submission').addEventListener('click', (e) => {
        e.target.innerText = 'Sent!';
        e.target.disabled = true;
        e.target.style.background = 'rgba(212, 175, 55, 0.2)';
        e.target.style.color = 'var(--color-accent)';
      });

      inboxTableBody.appendChild(row);
    });
  }

  function updateInboxBadge(newCount) {
    if (!inboxBadgeCount) return;
    if (newCount > 0) {
      inboxBadgeCount.innerText = newCount;
      inboxBadgeCount.classList.remove('hidden');
    } else {
      inboxBadgeCount.classList.add('hidden');
    }
  }

  // Pre-render on startup
  renderFacilitatorInbox();

  // Login Navigation Redirects
  const btnLoginStudent = document.getElementById('btn-login-student');
  const btnLoginFacilitator = document.getElementById('btn-login-facilitator');

  if (btnLoginStudent) {
    btnLoginStudent.addEventListener('click', () => {
      window.location.hash = '#student-portal';
      try {
        initializeStudentPortal();
      } catch (e) {
        console.error(e);
      }
      try {
        initializeStudentPortal002();
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (btnLoginFacilitator) {
    btnLoginFacilitator.addEventListener('click', () => {
      window.location.hash = '#facilitator-portal';
      renderFacilitatorInbox();
      updateInboxBadge(0);
    });
  }

  // Logout Buttons Redirect (Triggers Gateway reset)
  const logoutBtns = document.querySelectorAll('.logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setRole(null);
    });
  });

  // Sidebar Tab Switching
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    if (link.classList.contains('logout-btn')) return;

    link.addEventListener('click', () => {
      const sidebar = link.closest('.portal-sidebar');
      const main = sidebar.nextElementSibling; // portal-main
      const tabName = link.getAttribute('data-tab');

      // Deactivate other sidebar tabs in this portal
      sidebar.querySelectorAll('.sidebar-link').forEach(b => b.classList.remove('active'));
      link.classList.add('active');

      // Deactivate other tabs content in this portal
      main.querySelectorAll('.portal-tab-content').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('id') === `tab-${tabName}`) {
          tab.classList.add('active');
        }
      });
    });
  });

  // Initialize Student Portal Cloned Simulator
  function initializeStudentPortal() {
    const source = document.getElementById('studio-001-experience');
    const target = document.getElementById('student-studio-001-target');

    if (!source || !target) return;

    const clone = source.cloneNode(true);
    clone.id = 'student-studio-001-cloned';
    clone.classList.remove('hidden');
    clone.classList.add('role-student'); // Force student view!
    clone.classList.add('active'); // Ensure block visibility inside portal

    // Remove role switcher bar
    const switcher = clone.querySelector('.role-selector-bar');
    if (switcher) switcher.remove();

    // Simplify nav button labels for students
    const navBtns = clone.querySelectorAll('.exp-nav-btn');
    const stepNamesS1 = {
      "1": "1. Welcome",
      "2": "2. Reflection",
      "3": "3. Observe",
      "4": "4. Ideas",
      "5": "5. Wonder Wall",
      "6": "6. Connect",
      "7": "7. Vote",
      "8": "8. Write Report",
      "9": "9. Submit"
    };
    navBtns.forEach(btn => {
      const step = btn.getAttribute('data-step');
      if (stepNamesS1[step]) {
        btn.innerText = stepNamesS1[step];
      }
    });

    target.innerHTML = '';
    target.appendChild(clone);
    // Add close workspace overlay button at the top right of clone
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times; Close Workspace';
    closeBtn.className = 'btn btn-secondary btn-close-studio-overlay';
    closeBtn.style.position = 'fixed';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '40px';
    closeBtn.style.zIndex = '2000';
    closeBtn.style.background = '#ff4a4a';
    closeBtn.style.color = '#fff';
    closeBtn.style.border = 'none';
    closeBtn.style.fontWeight = '700';
    closeBtn.style.padding = '8px 16px';
    closeBtn.style.borderRadius = '4px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.transition = 'transform 0.2s';
    
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      target.classList.add('hidden');
    });
    clone.appendChild(closeBtn);

    // Bind event handlers on the cloned simulator
    bindClonedWalkthrough(clone);
  }

  // Bind Event Listeners Scoped to Cloned Simulator
  function bindClonedWalkthrough(scope) {
    // 1. Tab switches
    const navBtns = scope.querySelectorAll('.exp-nav-btn');
    const panes = scope.querySelectorAll('.exp-step-pane');
    
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const step = btn.getAttribute('data-step');
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        panes.forEach(pane => {
          pane.classList.remove('active');
          if (pane.getAttribute('id') === `exp-step-${step}`) {
            pane.classList.add('active');
          }
        });

        // Sync Step 4 Unsorted Board observations in student portal
        if (step === '4') {
          syncStep4UnsortedPool(scope);
        }
      });
    });

    // 2. Silence Timer
    const triggerSilence = scope.querySelector('#btn-trigger-silence');
    const timerText = scope.querySelector('#silence-timer');
    let timerInt = null;

    if (triggerSilence && timerText) {
      triggerSilence.addEventListener('click', () => {
        if (timerInt) {
          clearInterval(timerInt);
          timerInt = null;
          timerText.innerText = '20';
          timerText.classList.remove('pulsing');
          triggerSilence.innerText = 'Start Countdown';
          return;
        }
        
        let count = 20;
        timerText.innerText = count;
        timerText.classList.add('pulsing');
        triggerSilence.innerText = 'Reset';

        timerInt = setInterval(() => {
          count--;
          timerText.innerText = count;
          if (count <= 0) {
            clearInterval(timerInt);
            timerInt = null;
            timerText.classList.remove('pulsing');
            triggerSilence.innerText = 'Restart';
          }
        }, 1000);
      });
    }

    // 3. Chalkboard Words
    const words = scope.querySelectorAll('.pool-word');
    const targetBoard = scope.querySelector('#chalkboard-target');

    words.forEach(w => {
      w.addEventListener('click', () => {
        const placeholder = targetBoard.querySelector('.chalk-placeholder');
        if (placeholder) targetBoard.innerHTML = '';
        
        const txt = w.innerText;
        const existing = Array.from(targetBoard.querySelectorAll('.chalk-word')).map(node => node.innerText.toLowerCase());
        if (!existing.includes(txt.toLowerCase())) {
          const span = document.createElement('span');
          span.className = 'chalk-word';
          span.innerText = txt;
          targetBoard.appendChild(span);
        }
      });
    });

    // 4. Photo Observers
    const photos = scope.querySelectorAll('.sim-photo-card');
    const obsDetails = scope.querySelector('#photo-obs-details');
    const vObs = obsDetails ? obsDetails.querySelector('.val-obs') : null;
    const vExp = obsDetails ? obsDetails.querySelector('.val-exp') : null;

    photos.forEach(p => {
      p.addEventListener('click', () => {
        photos.forEach(c => c.classList.remove('active'));
        p.classList.add('active');
        if (obsDetails && vObs && vExp) {
          vObs.innerText = p.getAttribute('data-obs');
          vExp.innerText = p.getAttribute('data-exp');
          obsDetails.classList.remove('hidden');
        }
      });
    });

    // 5. Wonder Wall
    const poolW = scope.querySelectorAll('.pool-wonder');
    const wallTarget = scope.querySelector('#wonder-wall-target');
    const inputW = scope.querySelector('#custom-wonder');
    const addBtnW = scope.querySelector('#add-wonder-btn');

    function postWonder(question) {
      if (!question.trim()) return;
      const placeholder = wallTarget.querySelector('.chalk-placeholder');
      if (placeholder) wallTarget.innerHTML = '';
      
      const sticky = document.createElement('div');
      sticky.className = 'wonder-sticky';
      sticky.innerText = question;
      wallTarget.appendChild(sticky);
    }

    poolW.forEach(w => {
      w.addEventListener('click', () => postWonder(w.innerText));
    });

    if (addBtnW && inputW) {
      addBtnW.addEventListener('click', () => {
        postWonder(inputW.value);
        inputW.value = '';
      });
      inputW.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          postWonder(inputW.value);
          inputW.value = '';
        }
      });
    }

    // 6. Connections
    const nodes = scope.querySelectorAll('.connect-node');
    const results = scope.querySelector('#connection-line-results');
    let sel = [];

    nodes.forEach(n => {
      n.addEventListener('click', () => {
        n.classList.toggle('selected');
        if (n.classList.contains('selected')) {
          sel.push(n);
        } else {
          sel = sel.filter(item => item !== n);
        }

        if (sel.length === 2) {
          const placeholder = results.querySelector('.chalk-placeholder');
          if (placeholder) results.innerHTML = '';

          const id1 = sel[0].getAttribute('data-id');
          const id2 = sel[1].getAttribute('data-id');
          const text1 = sel[0].innerText;
          const text2 = sel[1].innerText;

          const div = document.createElement('div');
          div.className = 'connection-link-item mt-2';
          div.innerHTML = getSystemConnectionHTML(id1, id2, text1, text2);
          results.appendChild(div);

          sel.forEach(item => item.classList.remove('selected'));
          sel = [];
        }
      });
    });

    // 7. Voting
    const votes = scope.querySelectorAll('.vote-btn');
    const resultV = scope.querySelector('#vote-result');
    const txtV = scope.querySelector('#voted-text');

    votes.forEach(btn => {
      btn.addEventListener('click', () => {
        votes.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (resultV && txtV) {
          txtV.innerText = `"${btn.getAttribute('data-vote')}"`;
          resultV.classList.remove('hidden');
        }
      });
    });

    // 9. Report Loop Submission
    const submitBtn = scope.querySelector('#submit-loop-btn');
    const responseBox = scope.querySelector('#partner-response-loop');
    const noticeInput = scope.querySelector('#loop-noticed');
    const questionInput = scope.querySelector('#loop-question');

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const notTxt = noticeInput ? noticeInput.value.trim() : '';
        const qTxt = questionInput ? questionInput.value.trim() : '';

        if (!notTxt || !qTxt) {
          alert('Please fill out both observation and wonder question before submitting.');
          return;
        }

        submitBtn.innerText = 'Submitting report to Apex Parks...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerText = 'Report Submitted';
          if (responseBox) {
            responseBox.classList.remove('hidden');
            responseBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }

          // In-memory Database Integration (push to Facilitator Inbox!)
          submissions.unshift({
            team: 'Team Delta (Live)',
            noticed: notTxt,
            question: qTxt
          });

          // Log in Student Journal
          const journal = document.getElementById('student-submitted-reports');
          if (journal) {
            const log = document.createElement('div');
            log.className = 'report-log-item';
            log.style.background = 'rgba(212, 175, 55, 0.05)';
            log.style.borderLeft = '2px solid var(--color-accent)';
            log.style.padding = '12px 16px';
            log.style.borderRadius = '0 6px 6px 0';
            log.style.marginBottom = '8px';
            log.innerHTML = `<div class="report-log-meta" style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 6px;">Submitted just now by Team Delta</div>
                             <p style="font-size: 0.9rem; color: #fff; margin: 0;"><strong>Noticed:</strong> ${notTxt}</p>
                             <p style="font-size: 0.9rem; color: var(--color-text-muted); margin: 4px 0 0 0;"><strong>Wonder:</strong> ${qTxt}</p>`;
            journal.prepend(log);
          }

          // Trigger Facilitator Inbox Unread Badge!
          updateInboxBadge(1);

        }, 1500);
      });
    }
  }

  // --- Custom Chalkboard Concept Adder (Event Delegation) ---
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-custom-chalk');
    if (btn) {
      const container = btn.closest('.sim-display');
      const input = container.querySelector('.custom-chalk-input');
      const targetBoard = container.querySelector('#chalkboard-target');
      
      if (input && targetBoard) {
        const text = input.value.trim();
        if (text) {
          addCustomChalkWord(targetBoard, text);
          input.value = '';
        }
      }
    }
  });

  document.addEventListener('keypress', (e) => {
    const input = e.target.closest('.custom-chalk-input');
    if (input && e.key === 'Enter') {
      const container = input.closest('.sim-display');
      const targetBoard = container.querySelector('#chalkboard-target');
      
      if (input && targetBoard) {
        const text = input.value.trim();
        if (text) {
          addCustomChalkWord(targetBoard, text);
          input.value = '';
        }
      }
    }
  });

  function addCustomChalkWord(targetBoard, text) {
    const placeholder = targetBoard.querySelector('.chalk-placeholder');
    if (placeholder) {
      targetBoard.innerHTML = '';
    }
    
    const existing = Array.from(targetBoard.querySelectorAll('.chalk-word')).map(w => w.innerText.toLowerCase());
    if (!existing.includes(text.toLowerCase())) {
      const span = document.createElement('span');
      span.className = 'chalk-word';
      span.innerText = text;
      targetBoard.appendChild(span);
    }
  }

  // --- Photo Lightbox Zoom Engine (Event Delegation) ---
  const photoLightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');

  document.addEventListener('click', (e) => {
    const imgContainer = e.target.closest('.photo-img-container');
    if (imgContainer) {
      e.stopPropagation();
      const img = imgContainer.querySelector('img');
      const card = imgContainer.closest('.sim-photo-card');
      if (img && photoLightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = img.src;
        lightboxCaption.innerText = img.alt || (card ? card.querySelector('.photo-info').innerText : 'Science Photo');
        photoLightbox.classList.remove('hidden');
      }
    }
  });

  if (photoLightbox && btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', () => {
      photoLightbox.classList.add('hidden');
    });
    photoLightbox.addEventListener('click', (e) => {
      if (e.target === photoLightbox) {
        photoLightbox.classList.add('hidden');
      }
    });
  }

  // ==========================================================================
  // STUDIO 002 WALKTHROUGH SIMULATOR CONTROLLERS
  // ==========================================================================
  const btnToggle002 = document.getElementById('btn-toggle-studio-002');
  const expContainer002 = document.getElementById('studio-002-experience');

  if (btnToggle002 && expContainer002) {
    btnToggle002.addEventListener('click', () => {
      expContainer002.classList.toggle('hidden');
      if (expContainer002.classList.contains('hidden')) {
        btnToggle002.innerText = 'Step Inside Studio 002 (45-Min Walkthrough)';
      } else {
        btnToggle002.innerText = 'Close Walkthrough Explorer';
        expContainer002.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    // Bind original facilitator simulator actions
    bindStudio002Actions(expContainer002);
  }

  function initializeStudentPortal002() {
    const source = document.getElementById('studio-002-experience');
    const target = document.getElementById('student-studio-002-target');
    if (!source || !target) return;

    const clone = source.cloneNode(true);
    clone.id = 'student-studio-002-cloned';
    clone.classList.remove('hidden');
    clone.classList.add('role-student'); // Force student view!
    clone.classList.add('active'); // Ensure block visibility inside portal

    // Remove role switcher bar
    const switcher = clone.querySelector('.role-selector-bar');
    if (switcher) switcher.remove();

    // Simplify nav button labels for students
    const navBtns = clone.querySelectorAll('.exp-nav-btn');
    const stepNamesS2 = {
      "1": "1. Ranger Marcus",
      "2": "2. Review Report",
      "3": "3. Evidence Photos",
      "4": "4. Causal Patterns",
      "5": "5. Sort Signals",
      "6": "6. Plan Trip",
      "7": "7. Submit Report"
    };
    navBtns.forEach(btn => {
      const step = btn.getAttribute('data-step');
      if (stepNamesS2[step]) {
        btn.innerText = stepNamesS2[step];
      }
    });

    target.innerHTML = '';
    target.appendChild(clone);

    // Add close workspace overlay button at the top right of clone
    const closeBtn002 = document.createElement('button');
    closeBtn002.innerHTML = '&times; Close Workspace';
    closeBtn002.className = 'btn btn-secondary btn-close-studio-overlay';
    closeBtn002.style.position = 'fixed';
    closeBtn002.style.top = '20px';
    closeBtn002.style.right = '40px';
    closeBtn002.style.zIndex = '2000';
    closeBtn002.style.background = '#ff4a4a';
    closeBtn002.style.color = '#fff';
    closeBtn002.style.border = 'none';
    closeBtn002.style.fontWeight = '700';
    closeBtn002.style.padding = '8px 16px';
    closeBtn002.style.borderRadius = '4px';
    closeBtn002.style.cursor = 'pointer';
    closeBtn002.style.transition = 'transform 0.2s';
    
    closeBtn002.addEventListener('click', (e) => {
      e.preventDefault();
      target.classList.add('hidden');
    });
    clone.appendChild(closeBtn002);

    // Bind event handlers on the cloned simulator
    bindStudio002Actions(clone);
  }

  // Helper to bind Studio 002 actions scoped to either Facilitator or Cloned Student container
  function bindStudio002Actions(scope) {
    // 1. Progress Steps Navigation
    const navBtns = scope.querySelectorAll('.exp-nav-btn');
    const panes = scope.querySelectorAll('.exp-step-pane');
    
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const step = btn.getAttribute('data-step');
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        panes.forEach(pane => {
          pane.classList.remove('active');
          if (pane.getAttribute('id') === `exp-step-2-${step}`) {
            pane.classList.add('active');
          }
        });
      });
    });

    // Local switcher inside the walkthrough card (Facilitator vs Student)
    const localRoleBtns = scope.querySelectorAll('.role-btn');
    localRoleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        localRoleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const role = btn.getAttribute('data-role');
        if (role === 'student') {
          scope.classList.add('role-student');
        } else {
          scope.classList.remove('role-student');
        }
      });
    });

    // 2. Step 2 Reflection Adder
    const addReflBtn = scope.querySelector('.btn-add-reflection');
    const reflInput = scope.querySelector('.reflection-input');
    const reflList = scope.querySelector('.reflection-list');
    if (addReflBtn && reflInput && reflList) {
      const addThought = () => {
        const txt = reflInput.value.trim();
        if (txt) {
          const item = document.createElement('div');
          item.className = 'text-xs mt-1';
          item.style.color = 'var(--color-accent)';
          item.innerHTML = `â­ <span>${txt}</span>`;
          reflList.appendChild(item);
          reflInput.value = '';
        }
      };
      addReflBtn.addEventListener('click', addThought);
      reflInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addThought();
      });
    }

    // 3. Step 3 Photo observation detail text
    const photoCards = scope.querySelectorAll('.sim-photo-card');
    const detailBox = scope.querySelector('.photo-obs-details');
    if (photoCards.length > 0 && detailBox) {
      const obsSpan = detailBox.querySelector('.val-obs');
      const expSpan = detailBox.querySelector('.val-exp');
      
      photoCards.forEach(card => {
        card.addEventListener('click', () => {
          photoCards.forEach(c => c.style.borderColor = 'rgba(255, 255, 255, 0.1)');
          card.style.borderColor = 'var(--color-accent)';
          
          if (obsSpan && expSpan) {
            obsSpan.innerText = card.getAttribute('data-obs');
            expSpan.innerText = card.getAttribute('data-exp');
            detailBox.classList.remove('hidden');
          }
        });
      });
    }

    // 4. Step 4 Ecosystem Pattern Builder
    const nodeBtns = scope.querySelectorAll('.pattern-node-btn');
    const chainList = scope.querySelector('.pattern-chain-list');
    const clearChainBtn = scope.querySelector('.btn-clear-pattern');
    const feedbackDiv = scope.querySelector('.pattern-feedback');
    let patternChain = [];

    if (nodeBtns.length > 0 && chainList) {
      nodeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const node = btn.getAttribute('data-node');
          const nodeLabel = btn.innerText;

          if (patternChain.includes(node)) return; // No duplicates

          patternChain.push(node);
          btn.classList.add('selected');
          
          // Render chain
          renderChain();
          validateChain();
        });
      });

      if (clearChainBtn) {
        clearChainBtn.addEventListener('click', () => {
          resetChain();
        });
      }
    }

    function renderChain() {
      if (patternChain.length === 0) {
        chainList.innerHTML = `<span style="color: rgba(255,255,255,0.3); font-weight: normal; font-size: 0.75rem;">Build a pattern chain (e.g. Healthy Trees âž” More Shade...)</span>`;
        if (clearChainBtn) clearChainBtn.classList.add('hidden');
        return;
      }

      if (clearChainBtn) clearChainBtn.classList.remove('hidden');
      chainList.innerHTML = '';
      
      patternChain.forEach((node, idx) => {
        const nodeBtn = Array.from(nodeBtns).find(b => b.getAttribute('data-node') === node);
        const label = nodeBtn ? nodeBtn.innerText : node;

        const span = document.createElement('span');
        span.innerText = label;
        chainList.appendChild(span);

        if (idx < patternChain.length - 1) {
          const arrow = document.createElement('span');
          arrow.className = 'pattern-arrow';
          arrow.innerText = 'âž”';
          chainList.appendChild(arrow);
        }
      });
    }

    function validateChain() {
      if (!feedbackDiv) return;
      
      const targetStr = patternChain.join('->');
      // Success path: trees->shade->insects->soil
      if (patternChain.length === 4) {
        if (targetStr === 'trees->shade->insects->soil') {
          feedbackDiv.innerText = 'ðŸ§¬ Dynamic Pattern Found! [Healthy Trees] create [More Shade], which supports [More Insects], decomposing leaf litter to build [Darker Soil].';
          feedbackDiv.style.color = '#64ffda';
          feedbackDiv.classList.remove('hidden');
        } else {
          feedbackDiv.innerText = 'âš ï¸ That chain is plausible, but try ordering them by immediate causal relationship (source to effect).';
          feedbackDiv.style.color = 'var(--color-accent)';
          feedbackDiv.classList.remove('hidden');
        }
      } else {
        feedbackDiv.classList.add('hidden');
      }
    }

    function resetChain() {
      patternChain = [];
      nodeBtns.forEach(b => b.classList.remove('selected'));
      renderChain();
      if (feedbackDiv) feedbackDiv.classList.add('hidden');
    }

    // 5. Step 5 Abstraction Signal vs Noise Filter
    const absCards = scope.querySelectorAll('.abstraction-item-card');
    absCards.forEach(card => {
      const btns = card.querySelectorAll('.abs-toggle-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    });

    // 6. Step 7 Report Submissions & Facilitator Inbox Sync
    const submitBtn = scope.querySelector('.submit-loop2-btn');
    const partnerResponse = scope.querySelector('.partner-response-loop2');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const noticed = scope.querySelector('.loop2-noticed') ? scope.querySelector('.loop2-noticed').value.trim() : '';
        const patterns = scope.querySelector('.loop2-patterns') ? scope.querySelector('.loop2-patterns').value.trim() : '';
        const planning = scope.querySelector('.loop2-planning') ? scope.querySelector('.loop2-planning').value.trim() : '';

        if (!noticed || !patterns || !planning) {
          alert('Please fill out the report inputs before submitting.');
          return;
        }

        submitBtn.innerText = 'Submitting report to Apex Parks...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerText = 'Report Submitted';
          if (partnerResponse) {
            partnerResponse.classList.remove('hidden');
            partnerResponse.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }

          // In Facilitator Portal, we add it to the live facilitator inbox
          const inboxTable = document.getElementById('facilitator-inbox-table-body');
          if (inboxTable) {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
            tr.style.background = 'rgba(212, 175, 55, 0.02)';
            tr.innerHTML = `
              <td style="padding: 12px; font-weight: 600; color: #fff;">Team Delta (Live S2)</td>
              <td style="padding: 12px; font-size: 0.8rem; color: var(--color-text-light);">${noticed}</td>
              <td style="padding: 12px; font-size: 0.8rem; color: var(--color-text-muted);">
                <strong>Patterns:</strong> ${patterns}<br>
                <strong>Need:</strong> ${planning}
              </td>
              <td style="padding: 12px; text-align: center;">
                <button class="btn btn-secondary btn-xs btn-review-submission" style="padding: 2px 6px;">Approve S2</button>
              </td>
            `;

            // Bind click event to review button
            tr.querySelector('.btn-review-submission').addEventListener('click', (e) => {
              e.target.innerText = 'Approved S2!';
              e.target.disabled = true;
              e.target.style.background = 'rgba(100, 255, 218, 0.15)';
              e.target.style.color = '#64ffda';
            });

            inboxTable.insertBefore(tr, inboxTable.firstChild);

            // Increment inbox badge count
            const badge = document.getElementById('inbox-badge-count');
            if (badge) {
              const current = parseInt(badge.innerText || '0') + 1;
              badge.innerText = current;
              badge.classList.remove('hidden');
            }
          }
        }, 1500);
      });
    }

  }

// ==========================================================================
  // STUDENT PORTAL CONCEPT MAP BUILDER SYSTEM
  // ==========================================================================
  const mapContainer = document.getElementById('concept-nodes-container');
  const mapSvg = document.getElementById('concept-map-svg');
  const btnAddNode = document.getElementById('btn-add-map-node');
  const inputNodeText = document.getElementById('map-concept-input');
  const btnToggleLinkMode = document.getElementById('btn-toggle-link-mode');
  const btnClearMap = document.getElementById('btn-clear-map');
  const btnSaveMap = document.getElementById('btn-save-map');

  let conceptNodes = []; // { id, text, x, y, el }
  let conceptLinks = []; // { from, to, label }
  let nodeCounter = 0;
  
  let isLinkMode = false;
  let linkStartNode = null;
  let dragNode = null;
  let dragOffset = { x: 0, y: 0 };
  let dragStartPos = { x: 0, y: 0 };
  let hasMovedDuringDrag = false;

  // Initial nodes to get them started
  if (mapContainer) {
    setTimeout(() => {
      spawnNode("Wind Force", 80, 100);
      spawnNode("Exposed Roots", 220, 260);
      spawnNode("Dry Sandy Soil", 360, 100);
      spawnNode("Leaning Oak Trees", 480, 260);
    }, 100);

    // Double-click on empty canvas to create a node at that exact position
    mapContainer.addEventListener('dblclick', (e) => {
      if (e.target === mapContainer) {
        const text = prompt("Enter new concept name:");
        if (text && text.trim()) {
          const rect = mapContainer.getBoundingClientRect();
          const x = e.clientX - rect.left - 50; // offset approximate half width
          const y = e.clientY - rect.top - 15;  // offset approximate half height
          spawnNode(text.trim(), x, y);
        }
      }
    });
  }

  function spawnNode(text, x, y) {
    if (!mapContainer) return;
    
    nodeCounter++;
    const nodeId = `node-item-${nodeCounter}`;
    
    const nodeEl = document.createElement('div');
    nodeEl.className = 'concept-node';
    nodeEl.id = nodeId;
    nodeEl.innerText = text;
    nodeEl.style.left = `${x}px`;
    nodeEl.style.top = `${y}px`;
    
    mapContainer.appendChild(nodeEl);
    
    const nodeObj = {
      id: nodeId,
      text: text,
      x: x,
      y: y,
      el: nodeEl
    };

    // Double click on node to rename it
    nodeEl.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      const newText = prompt("Edit concept name:", nodeObj.text);
      if (newText && newText.trim()) {
        nodeObj.text = newText.trim();
        nodeEl.innerText = newText.trim();
        redrawLines();
      }
    });
    
    conceptNodes.push(nodeObj);
    
    // Drag & Drop Listeners
    nodeEl.addEventListener('mousedown', (e) => {
      dragNode = nodeObj;
      hasMovedDuringDrag = false;
      dragStartPos.x = e.clientX;
      dragStartPos.y = e.clientY;
      
      const rect = nodeEl.getBoundingClientRect();
      dragOffset.x = e.clientX - rect.left;
      dragOffset.y = e.clientY - rect.top;
      nodeEl.classList.add('dragging');
    });

    nodeEl.addEventListener('touchstart', (e) => {
      dragNode = nodeObj;
      hasMovedDuringDrag = false;
      const touch = e.touches[0];
      dragStartPos.x = touch.clientX;
      dragStartPos.y = touch.clientY;
      
      const rect = nodeEl.getBoundingClientRect();
      dragOffset.x = touch.clientX - rect.left;
      dragOffset.y = touch.clientY - rect.top;
      nodeEl.classList.add('dragging');
    });
  }

  // Global mousemove to drag nodes smoothly
  document.addEventListener('mousemove', (e) => {
    if (!dragNode || !mapContainer) return;
    
    // Check if moved enough to be considered a drag
    const dist = Math.sqrt(Math.pow(e.clientX - dragStartPos.x, 2) + Math.pow(e.clientY - dragStartPos.y, 2));
    if (dist > 3) {
      hasMovedDuringDrag = true;
    }
    
    const parentRect = mapContainer.getBoundingClientRect();
    let newX = e.clientX - parentRect.left - dragOffset.x;
    let newY = e.clientY - parentRect.top - dragOffset.y;
    
    newX = Math.max(10, Math.min(parentRect.width - dragNode.el.offsetWidth - 10, newX));
    newY = Math.max(10, Math.min(parentRect.height - dragNode.el.offsetHeight - 10, newY));
    
    dragNode.x = newX;
    dragNode.y = newY;
    dragNode.el.style.left = `${newX}px`;
    dragNode.el.style.top = `${newY}px`;
    
    redrawLines();
  });

  document.addEventListener('touchmove', (e) => {
    if (!dragNode || !mapContainer) return;
    const touch = e.touches[0];
    
    const dist = Math.sqrt(Math.pow(touch.clientX - dragStartPos.x, 2) + Math.pow(touch.clientY - dragStartPos.y, 2));
    if (dist > 3) {
      hasMovedDuringDrag = true;
    }
    
    const parentRect = mapContainer.getBoundingClientRect();
    let newX = touch.clientX - parentRect.left - dragOffset.x;
    let newY = touch.clientY - parentRect.top - dragOffset.y;
    
    newX = Math.max(10, Math.min(parentRect.width - dragNode.el.offsetWidth - 10, newX));
    newY = Math.max(10, Math.min(parentRect.height - dragNode.el.offsetHeight - 10, newY));
    
    dragNode.x = newX;
    dragNode.y = newY;
    dragNode.el.style.left = `${newX}px`;
    dragNode.el.style.top = `${newY}px`;
    
    redrawLines();
  });

  document.addEventListener('mouseup', () => {
    if (dragNode) {
      dragNode.el.classList.remove('dragging');
      // If Link Mode is ON and the user clicked without dragging, trigger link selection
      if (isLinkMode && !hasMovedDuringDrag) {
        handleLinkSelection(dragNode);
      }
      dragNode = null;
    }
  });

  document.addEventListener('touchend', () => {
    if (dragNode) {
      dragNode.el.classList.remove('dragging');
      if (isLinkMode && !hasMovedDuringDrag) {
        handleLinkSelection(dragNode);
      }
      dragNode = null;
    }
  });

  function handleLinkSelection(nodeObj) {
    if (!linkStartNode) {
      linkStartNode = nodeObj;
      nodeObj.el.classList.add('active-link-node');
    } else {
      if (linkStartNode.id === nodeObj.id) {
        linkStartNode.el.classList.remove('active-link-node');
        linkStartNode = null;
        return;
      }
      
      const label = prompt(`Describe how [${linkStartNode.text}] relates to [${nodeObj.text}]:\n(e.g. 'cools', 'weakens', 'supports')`);
      if (label !== null) {
        conceptLinks.push({
          from: linkStartNode.id,
          to: nodeObj.id,
          label: label.trim() || 'relates to'
        });
        redrawLines();
      }
      
      linkStartNode.el.classList.remove('active-link-node');
      linkStartNode = null;
    }
  }

  function redrawLines() {
    if (!mapSvg) return;
    
    const lines = mapSvg.querySelectorAll('.concept-line');
    lines.forEach(l => l.remove());
    
    const floatLabels = mapContainer.querySelectorAll('.concept-relationship-label');
    floatLabels.forEach(fl => fl.remove());

    conceptLinks.forEach(link => {
      const nodeFrom = conceptNodes.find(n => n.id === link.from);
      const nodeTo = conceptNodes.find(n => n.id === link.to);
      
      if (!nodeFrom || !nodeTo) return;
      
      const fromW = nodeFrom.el.offsetWidth || 100;
      const fromH = nodeFrom.el.offsetHeight || 30;
      const toW = nodeTo.el.offsetWidth || 100;
      const toH = nodeTo.el.offsetHeight || 30;

      const x1 = nodeFrom.x + fromW / 2;
      const y1 = nodeFrom.y + fromH / 2;
      const x2 = nodeTo.x + toW / 2;
      const y2 = nodeTo.y + toH / 2;
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = `M ${x1} ${y1} L ${x2} ${y2}`;
      path.setAttributeNS(null, 'd', d);
      path.setAttributeNS(null, 'class', 'concept-line');
      path.setAttributeNS(null, 'style', 'stroke: var(--color-accent); stroke-width: 2; fill: none; marker-end: url(#arrow); stroke-dasharray: 4;');
      mapSvg.appendChild(path);
      
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      
      const labelEl = document.createElement('div');
      labelEl.className = 'concept-relationship-label';
      labelEl.innerText = link.label;
      labelEl.style.left = `${midX}px`;
      labelEl.style.top = `${midY}px`;
      
      mapContainer.appendChild(labelEl);
    });
  }

  if (btnAddNode && inputNodeText) {
    const addNode = () => {
      const text = inputNodeText.value.trim();
      if (text) {
        const parentRect = mapContainer.getBoundingClientRect();
        const randX = Math.floor(Math.random() * (parentRect.width - 200)) + 50;
        const randY = Math.floor(Math.random() * (parentRect.height - 100)) + 50;
        spawnNode(text, randX, randY);
        inputNodeText.value = '';
      }
    };
    btnAddNode.addEventListener('click', addNode);
    inputNodeText.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addNode();
    });
  }

  if (btnToggleLinkMode) {
    btnToggleLinkMode.addEventListener('click', () => {
      isLinkMode = !isLinkMode;
      if (isLinkMode) {
        btnToggleLinkMode.innerText = '🔗 Link Mode: ON';
        btnToggleLinkMode.style.background = 'rgba(212, 175, 55, 0.15)';
        btnToggleLinkMode.style.borderColor = 'var(--color-accent)';
        btnToggleLinkMode.style.color = 'var(--color-accent)';
      } else {
        btnToggleLinkMode.innerText = '🔗 Link Mode: OFF';
        btnToggleLinkMode.style.background = 'rgba(255,255,255,0.05)';
        btnToggleLinkMode.style.borderColor = 'rgba(255,255,255,0.1)';
        btnToggleLinkMode.style.color = '#fff';
        if (linkStartNode) {
          linkStartNode.el.classList.remove('active-link-node');
          linkStartNode = null;
        }
      }
    });
  }

  if (btnClearMap) {
    btnClearMap.addEventListener('click', () => {
      if (confirm('Clear the entire concept map?')) {
        conceptNodes.forEach(n => n.el.remove());
        conceptNodes = [];
        conceptLinks = [];
        redrawLines();
      }
    });
  }

  if (btnSaveMap) {
    btnSaveMap.addEventListener('click', () => {
      if (conceptNodes.length === 0) {
        alert('Please add some concept nodes before saving.');
        return;
      }
      
      btnSaveMap.innerText = 'Saving Map...';
      btnSaveMap.disabled = true;

      let summaryText = `<strong>Nodes added:</strong> ${conceptNodes.map(n => n.text).join(', ')}<br>`;
      if (conceptLinks.length > 0) {
        summaryText += `<strong>Ecosystem connections mapped:</strong><br>`;
        conceptLinks.forEach(link => {
          const from = conceptNodes.find(n => n.id === link.from).text;
          const to = conceptNodes.find(n => n.id === link.to).text;
          summaryText += `• [${from}] ➔ <em>(${link.label})</em> ➔ [${to}]<br>`;
        });
      } else {
        summaryText += `<em>No connection paths established yet.</em>`;
      }

      setTimeout(() => {
        btnSaveMap.innerText = 'Saved to Journal!';
        
        const journal = document.getElementById('student-submitted-reports');
        if (journal) {
          const div = document.createElement('div');
          div.className = 'report-log-item';
          div.style.background = 'rgba(100, 255, 218, 0.03)';
          div.style.borderLeft = '2px solid #64ffda';
          div.style.padding = '12px 16px';
          div.style.borderRadius = '0 6px 6px 0';
          div.style.marginBottom = '12px';
          div.innerHTML = `
            <div class="report-log-meta" style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 6px;">
              Saved just now by Team Delta
            </div>
            <p style="font-size: 0.95rem; color: #fff; margin: 0; font-weight: bold;">🗺️ \uD83D\uDDFA\uFE0F Systems Concept Map</p>
            <p style="font-size: 0.85rem; color: var(--color-text-light); margin-top: 4px; line-height: 1.4;">
              ${summaryText}
            </p>
          `;
          journal.insertBefore(div, journal.firstChild);
        }

        const inbox = document.getElementById('facilitator-inbox-table-body');
        if (inbox) {
          const tr = document.createElement('tr');
          tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
          tr.style.background = 'rgba(100, 255, 218, 0.02)';
          tr.innerHTML = `
            <td style="padding: 12px; font-weight: 600; color: #fff;">Team Delta (Map)</td>
            <td style="padding: 12px; font-size: 0.8rem; color: var(--color-text-light);">
              Built concept map with ${conceptNodes.length} nodes.
            </td>
            <td style="padding: 12px; font-size: 0.8rem; color: var(--color-text-muted);">
              ${conceptLinks.length} connection paths mapped.
            </td>
            <td style="padding: 12px; text-align: center;">
              <button class="btn btn-secondary btn-xs btn-review-submission" style="padding: 2px 6px;">Approve Map</button>
            </td>
          `;

          tr.querySelector('.btn-review-submission').addEventListener('click', (e) => {
            e.target.innerText = 'Approved Map!';
            e.target.disabled = true;
            e.target.style.background = 'rgba(100, 255, 218, 0.15)';
            e.target.style.color = '#64ffda';
          });

          inbox.insertBefore(tr, inbox.firstChild);
          
          const badge = document.getElementById('inbox-badge-count');
          if (badge) {
            const count = parseInt(badge.innerText || '0') + 1;
            badge.innerText = count;
            badge.classList.remove('hidden');
          }
        }

        setTimeout(() => {
          btnSaveMap.innerText = '\uD83D\uDCBE Save Map to Journal';
          btnSaveMap.disabled = false;
        }, 2000);
      }, 1000);
    });
  }

  // ==========================================================================
  // STUDENT & FACILITATOR PORTAL TOOLKIT SYSTEM
  // ==========================================================================
  const toolkitContainers = [
    { prefix: 'stud', notepadId: 'teamFieldNotesStud' },
    { prefix: 'facilitator', notepadId: 'teamFieldNotesFacil' }
  ];

  toolkitContainers.forEach(conf => {
    const parentTab = document.getElementById(`tab-${conf.prefix}-toolkit`);
    if (!parentTab) return;

    const subTabBtns = parentTab.querySelectorAll('.toolkit-tab-btn');
    const subTabContents = parentTab.querySelectorAll('.toolkit-tab-content');

    subTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        if (!tabId) return;

        subTabBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderBottomColor = 'transparent';
          b.style.color = 'var(--color-text-muted)';
        });
        btn.classList.add('active');
        btn.style.borderBottomColor = '#64ffda';
        btn.style.color = '#fff';

        subTabContents.forEach(content => {
          if (content.id === tabId) {
            content.classList.remove('hidden');
          } else {
            content.classList.add('hidden');
          }
        });

        if (tabId.endsWith('-tk-sketch')) {
          setTimeout(resizeCanvas, 50);
        }
      });
    });

    // --- Notepad: Auto-save ---
    const notepad = parentTab.querySelector('.toolkit-notepad');
    if (notepad) {
      const savedNotes = localStorage.getItem(conf.notepadId);
      if (savedNotes) {
        notepad.value = savedNotes;
      }
      notepad.addEventListener('input', () => {
        localStorage.setItem(conf.notepadId, notepad.value);
      });
    }

    // --- Sketchpad: HTML5 Canvas ---
    const canvas = parentTab.querySelector('.toolkit-canvas');
    const btnClearCanvas = parentTab.querySelector('.btn-clear-canvas');
    const btnEraserToggle = parentTab.querySelector('.btn-eraser-toggle');

    let isDrawing = false;
    let drawColor = '#ffffff';
    let brushSize = 3;
    let isEraser = false;
    let lastX = 0;
    let lastY = 0;
    let ctx = null;

    if (canvas) {
      ctx = canvas.getContext('2d');
      setTimeout(resizeCanvas, 150);
      window.addEventListener('resize', resizeCanvas);

      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);

      canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startDrawing(touch);
      });
      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        draw(touch);
      }, { passive: false });
      canvas.addEventListener('touchend', stopDrawing);
    }

    function resizeCanvas() {
      if (!canvas || !canvas.parentElement) return;
      let tempImage = null;
      if (ctx) {
        tempImage = canvas.toDataURL();
      }
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        if (tempImage) {
          const img = new Image();
          img.src = tempImage;
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
        }
      }
    }

    function startDrawing(e) {
      isDrawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
    }

    function draw(e) {
      if (!isDrawing || !ctx) return;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      if (isEraser) {
        ctx.strokeStyle = '#172a45';
        ctx.lineWidth = 20;
      } else {
        ctx.strokeStyle = drawColor;
        ctx.lineWidth = brushSize;
      }
      ctx.stroke();
      lastX = pos.x;
      lastY = pos.y;
    }

    function stopDrawing() {
      isDrawing = false;
    }

    function getPos(e) {
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    const colorBtns = parentTab.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        colorBtns.forEach(b => {
          b.style.borderColor = 'transparent';
          b.classList.remove('active');
        });
        btn.style.borderColor = '#64ffda';
        btn.classList.add('active');
        drawColor = btn.getAttribute('data-color');
        if (isEraser) {
          toggleEraser(false);
        }
      });
    });

    const brushBtns = parentTab.querySelectorAll('.brush-btn');
    brushBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        brushBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        brushSize = parseInt(btn.getAttribute('data-size'));
      });
    });

    if (btnClearCanvas && canvas && ctx) {
      btnClearCanvas.addEventListener('click', () => {
        if (confirm('Clear the entire sketch board?')) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
    }

    if (btnEraserToggle) {
      btnEraserToggle.addEventListener('click', () => {
        toggleEraser(!isEraser);
      });
    }

    function toggleEraser(enable) {
      isEraser = enable;
      if (isEraser) {
        btnEraserToggle.innerText = '🧹 Eraser: ON';
        btnEraserToggle.style.background = 'rgba(100, 255, 218, 0.15)';
        btnEraserToggle.style.borderColor = 'var(--color-accent)';
        btnEraserToggle.style.color = 'var(--color-accent)';
      } else {
        btnEraserToggle.innerText = '🧹 Eraser: OFF';
        btnEraserToggle.style.background = 'rgba(255, 255, 255, 0.05)';
        btnEraserToggle.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        btnEraserToggle.style.color = '#fff';
      }
    }

    // --- Checklist & Custom Task Engine ---
    const checklistContainer = parentTab.querySelector('.toolkit-checklist-container');
    const inputNewTask = parentTab.querySelector('.tk-new-task-input');
    const btnAddTask = parentTab.querySelector('.btn-add-tk-task');
    
    const customTasksKey = `customChecklistTasks_${conf.prefix}`;

    // Load any saved custom tasks from localStorage
    loadCustomTasks();

    // Bind original checkboxes for strike-throughs
    if (checklistContainer) {
      const defaultCheckboxes = checklistContainer.querySelectorAll('input[type="checkbox"]');
      defaultCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          updateCheckboxStyle(cb);
        });
      });
    }

    // Add Task Button Trigger
    if (btnAddTask && inputNewTask) {
      const addTask = () => {
        const text = inputNewTask.value.trim();
        if (text) {
          createChecklistItem(text, false, true);
          saveCustomTasks();
          inputNewTask.value = '';
        }
      };
      btnAddTask.addEventListener('click', addTask);
      inputNewTask.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
      });
    }

    function createChecklistItem(text, isChecked, isCustom) {
      if (!checklistContainer) return;

      const label = document.createElement('label');
      label.className = 'tk-check-label';
      label.style.display = 'flex';
      label.style.gap = '8px';
      label.style.alignItems = 'flex-start';
      label.style.fontSize = '0.95rem';
      label.style.color = 'var(--color-text-light)';
      label.style.cursor = 'pointer';
      label.style.userSelect = 'none';
      
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = isChecked;
      cb.style.marginTop = '3px';
      cb.addEventListener('change', () => {
        updateCheckboxStyle(cb);
        if (isCustom) saveCustomTasks();
      });

      const span = document.createElement('span');
      span.innerText = text;
      
      label.appendChild(cb);
      label.appendChild(span);

      // If it's a custom task, add a delete/remove cross button
      if (isCustom) {
        label.classList.add('custom-task-item');
        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = '&times;';
        btnDelete.style.background = 'none';
        btnDelete.style.border = 'none';
        btnDelete.style.color = '#ff4a4a';
        btnDelete.style.fontSize = '1.3rem';
        btnDelete.style.cursor = 'pointer';
        btnDelete.style.padding = '0 6px';
        btnDelete.style.marginLeft = 'auto';
        btnDelete.style.lineHeight = '1';
        btnDelete.style.marginTop = '-2px';
        btnDelete.title = 'Delete Task';

        btnDelete.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          label.remove();
          saveCustomTasks();
        });

        label.appendChild(btnDelete);
      }

      checklistContainer.appendChild(label);
      updateCheckboxStyle(cb); // apply strike-through if loaded as checked
    }

    function updateCheckboxStyle(cb) {
      const span = cb.nextElementSibling;
      if (span) {
        if (cb.checked) {
          span.style.textDecoration = 'line-through';
          span.style.color = 'var(--color-text-muted)';
        } else {
          span.style.textDecoration = 'none';
          span.style.color = 'var(--color-text-light)';
        }
      }
    }

    function saveCustomTasks() {
      if (!checklistContainer) return;
      const customItems = [];
      const items = checklistContainer.querySelectorAll('.custom-task-item');
      items.forEach(item => {
        const text = item.querySelector('span').innerText;
        const checked = item.querySelector('input[type="checkbox"]').checked;
        customItems.push({ text, checked });
      });
      localStorage.setItem(customTasksKey, JSON.stringify(customItems));
    }

    function loadCustomTasks() {
      const saved = localStorage.getItem(customTasksKey);
      if (saved) {
        try {
          const tasks = JSON.parse(saved);
          tasks.forEach(t => {
            createChecklistItem(t.text, t.checked, true);
          });
        } catch (e) {
          console.error("Error parsing custom tasks:", e);
        }
      }
    }
  });

  // --- Facilitator Locking Control System ---
  function syncActiveStudioVisibility() {
    let activeStudio = localStorage.getItem('activeStudioId');
    if (activeStudio !== 'studio-001' && activeStudio !== 'studio-002') {
      activeStudio = 'studio-002';
    }

    
    const target001 = document.getElementById('student-studio-001-target');
    const target002 = document.getElementById('student-studio-002-target');
    
    if (target001) {
      if (activeStudio === 'studio-001') {
        target001.classList.remove('hidden');
      } else {
        target001.classList.add('hidden');
      }
    }
    
    if (target002) {
      if (activeStudio === 'studio-002') {
        target002.classList.remove('hidden');
      } else {
        target002.classList.add('hidden');
      }
    }

    const btnS001 = document.getElementById('btn-unlock-s001');
    const btnS002 = document.getElementById('btn-unlock-s002');
    if (btnS001 && btnS002) {
      if (activeStudio === 'studio-001') {
        btnS001.style.background = '#64ffda';
        btnS001.style.color = '#0a192f';
        btnS001.style.borderColor = '#64ffda';
        
        btnS002.style.background = 'rgba(255,255,255,0.05)';
        btnS002.style.color = '#fff';
        btnS002.style.borderColor = 'rgba(255,255,255,0.1)';
      } else {
        btnS002.style.background = '#64ffda';
        btnS002.style.color = '#0a192f';
        btnS002.style.borderColor = '#64ffda';
        
        btnS001.style.background = 'rgba(255,255,255,0.05)';
        btnS001.style.color = '#fff';
        btnS001.style.borderColor = 'rgba(255,255,255,0.1)';
      }
    }
  }

  // Bind Unlock buttons
  const btnS001 = document.getElementById('btn-unlock-s001');
  const btnS002 = document.getElementById('btn-unlock-s002');
  if (btnS001) {
    btnS001.addEventListener('click', () => {
      localStorage.setItem('activeStudioId', 'studio-001');
      syncActiveStudioVisibility();
    });
  }
  if (btnS002) {
    btnS002.addEventListener('click', () => {
      localStorage.setItem('activeStudioId', 'studio-002');
      syncActiveStudioVisibility();
    });
  }

  // Run on start
  syncActiveStudioVisibility();


  // --- Student Launcher Overlay Trigger ---
  const btnLaunchStudio = document.getElementById('btn-launch-studio-overlay');
  if (btnLaunchStudio) {
    btnLaunchStudio.addEventListener('click', () => {
      const activeStudio = localStorage.getItem('activeStudioId') || 'studio-002';
      const target001 = document.getElementById('student-studio-001-target');
      const target002 = document.getElementById('student-studio-002-target');
      
      if (activeStudio === 'studio-001' && target001) {
        target001.classList.remove('hidden');
      } else if (activeStudio === 'studio-002' && target002) {
        target002.classList.remove('hidden');
      }
    });
  }


  // --- Curriculum Sub-Tab Switching Logic ---
  function switchCurriculumTab(tabName) {
    const tabBtns = document.querySelectorAll('.curriculum-tab-btn');
    const tabPanels = document.querySelectorAll('.curriculum-tab-panel');
    
    let tabFound = false;
    tabPanels.forEach(panel => {
      if (panel.getAttribute('id') === tabName) {
        panel.classList.add('active');
        tabFound = true;
      } else {
        panel.classList.remove('active');
      }
    });

    if (!tabFound && tabPanels.length > 0) {
      tabPanels[0].classList.add('active');
    }

    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-curr-tab') === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Bind Curriculum tab click events
  const tabBtns = document.querySelectorAll('.curriculum-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = btn.getAttribute('data-curr-tab');
      const hashAnchor = tabName.replace('curr-', '');
      window.location.hash = `#curriculum#${hashAnchor}`;
    });
  });



  // --- PLC Discussion Message Board ---
  const plcInput = document.getElementById('plc-message-input');
  const plcSend = document.getElementById('btn-plc-send');
  const plcFeed = document.getElementById('plc-chat-feed');

  function renderPlcFeed() {
    if (!plcFeed) return;
    // Clear custom messages only (keep the first two default ones)
    const defaults = `
      <div style="align-self: flex-start; max-width: 80%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 8px 8px 8px 0;">
        <div style="font-size: 0.75rem; color: #fbbf24; font-weight: 700; margin-bottom: 4px;">Teacher Clara (Parkview Elementary)</div>
        <p style="color: #fff; margin: 0; font-size: 0.9rem;">Our third graders had an incredible discussion during Studio 002 today! They noticed the puddles dried faster near the compacted soil path. The causal links they built were so detailed!</p>
      </div>
      <div style="align-self: flex-start; max-width: 80%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 8px 8px 8px 0;">
        <div style="font-size: 0.75rem; color: #fbbf24; font-weight: 700; margin-bottom: 4px;">Mentor Dave (Design Team)</div>
        <p style="color: #fff; margin: 0; font-size: 0.9rem;">That's excellent, Clara! Did they link compacted soil directly to puddle persistence or tree shadow dynamics?</p>
      </div>
    `;
    plcFeed.innerHTML = defaults;

    const posts = JSON.parse(localStorage.getItem('plcFeedPosts') || '[]');
    posts.forEach(post => {
      const div = document.createElement('div');
      div.style.alignSelf = 'flex-end';
      div.style.maxWidth = '80%';
      div.style.background = 'rgba(100, 255, 218, 0.05)';
      div.style.border = '1px solid rgba(100, 255, 218, 0.15)';
      div.style.padding = '12px';
      div.style.borderRadius = '8px 8px 0 8px';
      div.innerHTML = `<div style="font-size: 0.75rem; color: #64ffda; font-weight: 700; margin-bottom: 4px;">${post.author}</div><p style="color: #fff; margin: 0; font-size: 0.9rem;">${post.text}</p>`;
      plcFeed.appendChild(div);
    });
    plcFeed.scrollTop = plcFeed.scrollHeight;
  }

  function handleSendPlc() {
    if (!plcInput) return;
    const txt = plcInput.value.trim();
    if (!txt) return;

    const posts = JSON.parse(localStorage.getItem('plcFeedPosts') || '[]');
    posts.push({ author: 'You (Facilitator)', text: txt });
    localStorage.setItem('plcFeedPosts', JSON.stringify(posts));

    plcInput.value = '';
    renderPlcFeed();
  }

  if (plcSend && plcInput) {
    plcSend.addEventListener('click', handleSendPlc);
    plcInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSendPlc();
    });
  }

  renderPlcFeed();

  // --- Observation Rubric Log Saving ---
  const obsNotes = document.getElementById('observation-notes');
  const obsSaveBtn = document.getElementById('btn-save-observation');
  const obsSuccess = document.getElementById('obs-save-success');

  // Load existing log
  if (obsNotes) {
    obsNotes.value = localStorage.getItem('observationLogs') || '';
  }

  if (obsSaveBtn && obsNotes) {
    obsSaveBtn.addEventListener('click', () => {
      const txt = obsNotes.value;
      localStorage.setItem('observationLogs', txt);
      
      if (obsSuccess) {
        obsSuccess.classList.remove('hidden');
        setTimeout(() => {
          obsSuccess.classList.add('hidden');
        }, 3000);
      }
    });
  }

  // --- PD Module Detail Roadmap Selectors ---
  const pdCards = document.querySelectorAll('.pd-module-card');
  const pdTitle = document.getElementById('pd-detail-title');
  const pdObjectives = document.getElementById('pd-detail-objectives');
  const pdQuote = document.getElementById('pd-detail-quote');

  const pdContent = {
    pd1: {
      title: "Module 1: Systems Thinking Basics",
      objectives: "Understand why classrooms must focus on interconnectivity rather than isolated topics. Learn how to scaffold cause-and-effect thinking using the concept map.",
      quote: '"The concept map dashboard allows children to see how their physical observation notes link together inside a single living campus system."'
    },
    pd2: {
      title: "Module 2: Embracing Student Silences",
      objectives: "Learn to wait out 20 seconds of silence to give students the agency to initiate discovery rather than jumping in. Support peer negotiation.",
      quote: '"When the class goes silent, teachers tend to speak. Waiting is the single most powerful strategy to trigger student-led questioning."'
    },
    pd3: {
      title: "Module 3: Advanced Studio Co-Teaching",
      objectives: "Coordinate the main teacher B and A roles. Manage classroom movements, documentation, and live inbox report reviews.",
      quote: '"While one teacher focuses on group consolidation at the board, the co-teacher guides team-level inquiry, keeping the lesson dynamic."'
    }
  };

  pdCards.forEach(card => {
    card.addEventListener('click', () => {
      pdCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const pdId = card.getAttribute('data-pd-id');
      if (pdContent[pdId] && pdTitle && pdObjectives && pdQuote) {
        pdTitle.innerText = pdContent[pdId].title;
        pdObjectives.innerText = pdContent[pdId].objectives;
        pdQuote.innerText = pdContent[pdId].quote;
      }
    });
  });

});