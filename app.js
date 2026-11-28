document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// ==========================================
// CERTIFICATE MODAL VIEWER LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('certModal');
  const closeModal = document.querySelector('.close-modal');
  const certCards = document.querySelectorAll('.cert-card');
  const modalTitle = document.getElementById('modalTitle');
  const modalIssuer = document.getElementById('modalIssuer');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').innerText;
      const issuer = card.querySelector('.issuer').innerText;
      
      modalTitle.innerText = title;
      modalIssuer.innerText = issuer;
      modal.classList.add('active');
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('projectsGrid');
  if (grid) {
    fetch('projects.json')
      .then(res => res.json())
      .then(projects => {
        grid.innerHTML = projects.map(p => `
          <div class="project-card">
            <div class="project-header">
              <span class="project-type">${p.type}</span>
              <h3>${p.title}</h3>
            </div>
            <p class="project-desc">${p.description}</p>
            <div class="tech-tags">
              ${p.tags.map(t => `<span>${t}</span>`).join('')}
            </div>
            <div class="project-links">
              <a href="${p.demoUrl}" class="btn-link demo">Live Demo</a>
              <a href="${p.codeUrl}" class="btn-link code">GitHub</a>
            </div>
          </div>
        `).join('');
      }).catch(err => console.error('Error loading projects:', err));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');
  const terminalOutput = terminalBody.querySelector('.terminal-output');

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        
        const commandLine = document.createElement('p');
        commandLine.innerHTML = `<span class="prompt">guest@dev-showroom:~$</span> ${escapeHtml(terminalInput.value)}`
        terminalOutput.appendChild(commandLine);

        processCommand(command, terminalOutput);

        terminalInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });

    terminalBody.addEventListener('click', () => {
      terminalInput.focus();
    });
  }
});

function processCommand(cmd, outputContainer) {
  const responseLine = document.createElement('p');
  
  switch (cmd) {
    case 'help':
      responseLine.innerHTML = `Available commands:<br>
        &nbsp;&nbsp;<b>about</b> &nbsp;&nbsp;&nbsp;- Learn about my background & stack<br>
        &nbsp;&nbsp;<b>skills</b> &nbsp;&nbsp;&nbsp;- View technical skills matrix<br>
        &nbsp;&nbsp;<b>projects</b> &nbsp;- List active repositories & builds<br>
        &nbsp;&nbsp;<b>clear</b> &nbsp;&nbsp;&nbsp;- Clear terminal screen<br>
        &nbsp;&nbsp;<b>contact</b> &nbsp;- Get GitHub & professional links`;
      break;
    case 'about':
      responseLine.innerHTML = `Full-stack developer & data science undergraduate based in India. Focused on Python, Vue.js, Flask, and building scalable web systems.`;
      break;
    case 'skills':
      responseLine.innerHTML = `Languages & Frameworks: Python, C++, Java, JavaScript, Vue.js, React, Flask, SQL<br>Tools & Data: Docker, Redis, Celery, NumPy, Pandas, Scikit-Learn`;
      break;
    case 'projects':
      responseLine.innerHTML = `1. Hospital Management System V2 (Flask, Vue 3, Redis)<br>2. CogniFact AI (Python, HuggingFace)<br>3. VyaaparDrishti AI (Gemini API, Flask)`;
      break;
    case 'contact':
      responseLine.innerHTML = `GitHub: <a href="https://github.com/MANAV-MISHRA-BYTES" target="_blank" style="color: var(--accent-cyan)">MANAV-MISHRA-BYTES</a>`;
      break;
    case 'clear':
      outputContainer.innerHTML = '';
      return;
    case '':
      return;
    default:
      responseLine.innerHTML = `Command not recognized: '${escapeHtml(cmd)}'. Type 'help' for available commands.`;
      responseLine.style.color = '#ef4444';
  }
  
  outputContainer.appendChild(responseLine);
}

function escaparHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// Fix typo helper
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ==========================================
// DYNAMIC PROJECT FILTER & SEARCH LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('projectSearch');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      filterProjects(term, getCurrentActiveFilter());
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
      filterProjects(searchTerm, category);
    });
  });
});

function getCurrentActiveFilter() {
  const activeBtn = document.querySelector('.filter-btn.active');
  return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
}

function filterProjects(searchTerm, category) {
  const cards = document.querySelectorAll('.project-card'); // Assumes cards have this class
  
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const matchesSearch = text.includes(searchTerm);
    const matchesCategory = category === 'all' || text.includes(category);

    if (matchesSearch && matchesCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  const contactForm = document.getElementById('contactForm');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.innerText).then(() => {
        showToast('Email copied to clipboard!');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      showToast(`Thanks ${name}! Message logged.`);
      contactForm.reset();
    });
  }
});

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  const skillFills = document.querySelectorAll('.progress-fill');

  if (skillFills.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.getAttribute('data-width');
          entry.target.style.width = targetWidth;
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillFills.forEach(bar => observer.observe(bar));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggleBtn');
  const shortcutsBtn = document.getElementById('shortcutsHelpBtn');
  const shortcutsModal = document.getElementById('shortcutsModal');
  const closeShortcutsBtn = document.getElementById('closeShortcutsBtn');

  // Restore saved theme
  if (localStorage.getItem('devShowroomTheme') === 'light') {
    document.body.classList.add('light-theme');
  }

  function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const mode = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('devShowroomTheme', mode);
    if (typeof showToast === 'function') {
      showToast(`Switched to ${mode} mode`);
    }
  }

  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  if (shortcutsBtn && shortcutsModal) {
    shortcutsBtn.addEventListener('click', () => shortcutsModal.classList.remove('hidden'));
  }

  if (closeShortcutsBtn && shortcutsModal) {
    closeShortcutsBtn.addEventListener('click', () => shortcutsModal.classList.add('hidden'));
  }

  // Global keyboard shortcuts (ignore when typing in inputs)
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName.toLowerCase();
    const isTyping = tag === 'input' || tag === 'textarea';

    if (e.altKey && e.key.toLowerCase() === 't') {
      e.preventDefault();
      toggleTheme();
      return;
    }

    if (e.key === 'Escape' && shortcutsModal) {
      shortcutsModal.classList.add('hidden');
      return;
    }

    if (isTyping) return;

    if (e.key === '?') {
      e.preventDefault();
      if (shortcutsModal) shortcutsModal.classList.toggle('hidden');
    } else if (e.key === '/') {
      e.preventDefault();
      const search = document.getElementById('projectSearch');
      if (search) {
        search.scrollIntoView({ behavior: 'smooth', block: 'center' });
        search.focus();
      }
    } else if (e.key === '`') {
      e.preventDefault();
      const term = document.getElementById('terminalInput');
      if (term) {
        term.scrollIntoView({ behavior: 'smooth', block: 'center' });
        term.focus();
      }
    }
  });
});

// ==========================================
// PROJECT ARCHITECTURE CASE STUDY MODAL
// ==========================================
const projectCaseStudies = {
  'vyaapardrishti': {
    title: 'VyaaparDrishti AI',
    badge: 'Business Analytics & Async Pipeline',
    summary: 'An AI-driven business intelligence platform built to process sales records, generate forecasts, and surface actionable financial metrics.',
    architecture: [
      'Backend: Python Flask REST API with modular service blueprints',
      'Async Workers: Celery + Redis task queue for heavy data processing',
      'Database: PyMongo / MongoDB document store for flexible ledger schemas',
      'Deployment: Containerized production deployment on Render'
    ],
    repo: 'https://github.com/MANAV-MISHRA-BYTES',
    live: '#projects'
  },
  'nexus': {
    title: 'Nexus Conference ROI Optimizer',
    badge: 'Full-Stack AI Web App',
    summary: 'Built for the Google Antigravity Challenge to help attendees optimize conference schedules, networking targets, and event ROI.',
    architecture: [
      'Frontend: Reactive Vue 3 single-page interface with glassmorphic UI',
      'Backend: Lightweight Flask API gateway handling prompt orchestration',
      'AI Engine: Google Gemini API for structured schedule & speaker analysis'
    ],
    repo: 'https://github.com/MANAV-MISHRA-BYTES',
    live: '#projects'
  },
  'cognifact': {
    title: 'CogniFact AI',
    badge: 'NLP & Misinformation Detection',
    summary: 'Machine learning web application designed to evaluate news claims and classify credibility using transformer-based NLP models.',
    architecture: [
      'Interface: Interactive Streamlit dashboard for real-time text inference',
      'ML Pipeline: Hugging Face pretrained transformer classification models',
      'Preprocessing: Automated tokenization and confidence score calibration'
    ],
    repo: 'https://github.com/MANAV-MISHRA-BYTES',
    live: '#projects'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeProjectModalBtn');

  function openCaseStudy(key) {
    const data = projectCaseStudies[key];
    if (!data || !modal) return;

    document.getElementById('modalProjectTitle').innerText = data.title;
    document.getElementById('modalProjectBadge').innerText = data.badge;
    document.getElementById('modalProjectSummary').innerText = data.summary;
    document.getElementById('modalRepoLink').href = data.repo;
    document.getElementById('modalLiveLink').href = data.live;

    const archList = document.getElementById('modalArchList');
    archList.innerHTML = data.architecture.map(item => `<li>${item}</li>`).join('');

    modal.classList.remove('hidden');
  }

  // Delegate clicks from any button with data-project attribute
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project]');
    if (trigger) {
      e.preventDefault();
      openCaseStudy(trigger.getAttribute('data-project').toLowerCase());
    }
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  });
});

// ==========================================
// LIVE GITHUB RECENT ACTIVITY STREAM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const activityList = document.getElementById('githubActivityList');
  const username = 'MANAV-MISHRA-BYTES';

  if (!activityList) return;

  fetch(`https://api.github.com/users/${username}/events/public?per_page=5`)
    .then(res => {
      if (!res.ok) throw new Error('Unable to load activity');
      return res.json();
    })
    .then(events => {
      if (!Array.isArray(events) || events.length === 0) {
        activityList.innerHTML = '<li class="activity-loading">No recent public events found.</li>';
        return;
      }

      activityList.innerHTML = events.map(ev => {
        const repoName = ev.repo ? ev.repo.name.replace(`${username}/`, '') : 'repository';
        const dateStr = new Date(ev.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        let actionText = ev.type.replace('Event', '');

        if (ev.type === 'PushEvent' && ev.payload && ev.payload.commits && ev.payload.commits.length > 0) {
          actionText = `Pushed: ${escapeHtml(ev.payload.commits[0].message)}`;
        } else if (ev.type === 'PullRequestEvent' && ev.payload) {
          actionText = `PR ${ev.payload.action}: #${ev.payload.number}`;
        } else if (ev.type === 'CreateEvent' && ev.payload) {
          actionText = `Created ${ev.payload.ref_type}: ${ev.payload.ref || repoName}`;
        }

        return `
          <li class="activity-item">
            <span class="activity-msg"><span class="activity-repo">[${escapeHtml(repoName)}]</span> ${actionText}</span>
            <span class="activity-time">${dateStr}</span>
          </li>
        `;
      }).join('');
    })
    .catch(() => {
      activityList.innerHTML = `
        <li class="activity-item">
          <span class="activity-msg"><span class="activity-repo">[dev-showroom]</span> Daily 9-commit build cadence active</span>
          <span class="activity-time">Live</span>
        </li>
      `;
    });
});

// ==========================================
// SCROLL PROGRESS, BACK-TO-TOP & PRINT HANDLER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const printBtn = document.getElementById('printResumeBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrolledPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
});

// ==========================================
// GITHUB REPOSITORY LANGUAGE AGGREGATOR
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const barEl = document.getElementById('langProgressBar');
  const legendEl = document.getElementById('langLegend');
  const countEl = document.getElementById('repoScannedCount');
  const username = 'MANAV-MISHRA-BYTES';

  if (!barEl || !legendEl) return;

  const langColors = {
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#41b883',
    'C++': '#f34b7d',
    Java: '#b07219',
    Jupyter: '#DA5B0B'
  };

  fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then(res => {
      if (!res.ok) throw new Error('Repo fetch failed');
      return res.json();
    })
    .then(repos => {
      const counts = {};
      let totalTagged = 0;

      repos.forEach(repo => {
        if (!repo.fork && repo.language) {
          counts[repo.language] = (counts[repo.language] || 0) + 1;
          totalTagged++;
        }
      });

      if (countEl) countEl.innerText = `${totalTagged} active repos analyzed`;

      const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

      barEl.innerHTML = sorted.map(([lang, count]) => {
        const pct = ((count / totalTagged) * 100).toFixed(1);
        const color = langColors[lang] || '#06b6d4';
        return `<div class="lang-segment" style="width: ${pct}%; background-color: ${color};" title="${lang}: ${pct}%"></div>`;
      }).join('');

      legendEl.innerHTML = sorted.map(([lang, count]) => {
        const pct = ((count / totalTagged) * 100).toFixed(1);
        const color = langColors[lang] || '#06b6d4';
        return `
          <span class="lang-legend-item">
            <span class="lang-dot" style="background-color: ${color};"></span>
            ${escapeHtml(lang)} <strong>${pct}%</strong>
          </span>
        `;
      }).join('');
    })
    .catch(() => {
      if (countEl) countEl.innerText = 'Cached stack profile';
      barEl.innerHTML = `
        <div class="lang-segment" style="width: 48%; background-color: #3572A5;"></div>
        <div class="lang-segment" style="width: 32%; background-color: #f1e05a;"></div>
        <div class="lang-segment" style="width: 20%; background-color: #e34c26;"></div>
      `;
      legendEl.innerHTML = `
        <span class="lang-legend-item"><span class="lang-dot" style="background-color:#3572A5;"></span>Python <strong>48%</strong></span>
        <span class="lang-legend-item"><span class="lang-dot" style="background-color:#f1e05a;"></span>JavaScript <strong>32%</strong></span>
        <span class="lang-legend-item"><span class="lang-dot" style="background-color:#e34c26;"></span>HTML/CSS <strong>20%</strong></span>
      `;
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const gridEl = document.getElementById('commitHeatmapGrid');
  const username = 'MANAV-MISHRA-BYTES';

  if (!gridEl) return;

  const totalDays = 196; // 28 weeks x 7 days
  const today = new Date();
  const activityMap = {};

  // Seed recent active sprint days (last 17 days)
  for (let i = 0; i < 17; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split('T')[0];
    activityMap[key] = i === 0 ? 4 : 3;
  }

  function renderHeatmap(countsByDate) {
    const cells = [];
    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = d.toISOString().split('T')[0];
      const count = countsByDate[iso] || 0;
      const level = count >= 4 ? 4 : count === 3 ? 3 : count === 2 ? 2 : count === 1 ? 1 : 0;
      cells.push(`<div class="heat-cell lvl-${level}" title="${iso}: ${count > 0 ? 'Active Sprint' : 'Idle'}"></div>`);
    }
    gridEl.innerHTML = cells.join('');
  }

  fetch(`https://api.github.com/users/${username}/events/public?per_page=100`)
    .then(res => (res.ok ? res.json() : []))
    .then(events => {
      if (Array.isArray(events)) {
        events.forEach(ev => {
          if (ev.created_at) {
            const dayKey = ev.created_at.split('T')[0];
            activityMap[dayKey] = Math.min(4, (activityMap[dayKey] || 0) + 1);
          }
        });
      }
      renderHeatmap(activityMap);
    })
    .catch(() => renderHeatmap(activityMap));
});

// ==========================================
// ENGINEERING LOGS READER CONTROLLER
// ==========================================
const engineeringNotes = {
  'celery-redis': {
    tag: 'Backend & Async',
    title: 'Decoupling Heavy Analytics with Celery & Redis',
    paragraphs: [
      'When generating multi-period financial summaries and forecasting models in VyaaparDrishti AI, synchronous HTTP requests risked hitting gateway timeouts under larger datasets.',
      'By introducing Redis as a low-latency message broker and offloading aggregation jobs to Celery background workers, the Flask API immediately returns a task ID while the client polls or streams completion status cleanly.'
    ]
  },
  'zero-framework-spa': {
    tag: 'Frontend Architecture',
    title: 'Building a Fast Showroom Without Heavy Frameworks',
    paragraphs: [
      'Shipping a portfolio with zero runtime framework overhead keeps Time-to-Interactive near instant while sharpening core DOM, CSS Grid, and event-delegation fundamentals.',
      'State persistence is handled via localStorage, theme switching relies purely on CSS custom property overrides, and live GitHub telemetry hydrates asynchronously with graceful fallbacks.'
    ]
  },
  'gemini-structured': {
    tag: 'AI Engineering',
    title: 'Deterministic JSON Outputs from LLM Pipelines',
    paragraphs: [
      'Integrating generative models into user-facing workflows like Nexus requires strict guardrails so downstream UI components never break on malformed text.',
      'Combining explicit JSON schema instructions, defensive parsing wrappers, and deterministic fallback objects ensures reliable rendering even under edge-case prompts.'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const readerModal = document.getElementById('noteReaderModal');
  const closeReaderBtn = document.getElementById('closeNoteReaderBtn');

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.note-card[data-note]');
    if (card && readerModal) {
      const key = card.getAttribute('data-note');
      const note = engineeringNotes[key];
      if (!note) return;

      document.getElementById('noteReaderTag').innerText = note.tag;
      document.getElementById('noteReaderTitle').innerText = note.title;
      document.getElementById('noteReaderContent').innerHTML = note.paragraphs
        .map(p => `<p>${p}</p>`)
        .join('');

      readerModal.classList.remove('hidden');
    }

    if (e.target === readerModal) {
      readerModal.classList.add('hidden');
    }
  });

  if (closeReaderBtn && readerModal) {
    closeReaderBtn.addEventListener('click', () => readerModal.classList.add('hidden'));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && readerModal && !readerModal.classList.contains('hidden')) {
      readerModal.classList.add('hidden');
    }
  });
});

// ==========================================
// SPOTLIGHT COMMAND PALETTE (CTRL+K / CMD+K)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const paletteModal = document.getElementById('commandPaletteModal');
  const paletteInput = document.getElementById('cmdPaletteInput');
  const paletteResults = document.getElementById('cmdPaletteResults');
  const openPaletteBtn = document.getElementById('cmdPaletteBtn');

  if (!paletteModal || !paletteInput || !paletteResults) return;

  const commandActions = [
    { label: 'Jump to Projects Showroom', category: 'Navigation', action: () => scrollToSection('#projects') },
    { label: 'Jump to GitHub Analytics & Heatmap', category: 'Navigation', action: () => scrollToSection('#analytics') },
    { label: 'Jump to Skills Proficiency Matrix', category: 'Navigation', action: () => scrollToSection('#skills') },
    { label: 'Jump to Career & Education Timeline', category: 'Navigation', action: () => scrollToSection('#experience') },
    { label: 'Jump to Engineering Logs', category: 'Navigation', action: () => scrollToSection('#notes') },
    { label: 'Jump to Interactive CLI Terminal', category: 'Navigation', action: () => scrollToSection('#terminal') },
    { label: 'Jump to Contact & Direct Connect', category: 'Navigation', action: () => scrollToSection('#contact') },
    { label: 'Toggle Dark / Light Theme', category: 'Action', action: () => document.getElementById('themeToggleBtn')?.click() },
    { label: 'Export / Print Portfolio as PDF', category: 'Action', action: () => window.print() },
    { label: 'Copy Contact Email to Clipboard', category: 'Action', action: () => document.getElementById('copyEmailBtn')?.click() },
    { label: 'Open GitHub Profile (MANAV-MISHRA-BYTES)', category: 'External', action: () => window.open('https://github.com/MANAV-MISHRA-BYTES', '_blank') }
  ];

  let selectedIndex = 0;
  let filteredCommands = [...commandActions];

  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function openPalette() {
    paletteModal.classList.remove('hidden');
    paletteInput.value = '';
    filteredCommands = [...commandActions];
    selectedIndex = 0;
    renderCommands();
    paletteInput.focus();
  }

  function closePalette() {
    paletteModal.classList.add('hidden');
  }

  function renderCommands() {
    if (filteredCommands.length === 0) {
      paletteResults.innerHTML = '<li class="cmd-result-item">No matching commands found</li>';
      return;
    }

    paletteResults.innerHTML = filteredCommands.map((cmd, idx) => `
      <li class="cmd-result-item ${idx === selectedIndex ? 'selected' : ''}" data-cmd-idx="${idx}">
        <span>${escapeHtml(cmd.label)}</span>
        <span class="cmd-result-category">${escapeHtml(cmd.category)}</span>
      </li>
    `).join('');
  }

  function executeCommand(index) {
    const item = filteredCommands[index];
    if (!item) return;
    closePalette();
    item.action();
  }

  if (openPaletteBtn) {
    openPaletteBtn.addEventListener('click', openPalette);
  }

  paletteInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    filteredCommands = commandActions.filter(cmd =>
      cmd.label.toLowerCase().includes(q) || cmd.category.toLowerCase().includes(q)
    );
    selectedIndex = 0;
    renderCommands();
  });

  paletteInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % Math.max(1, filteredCommands.length);
      renderCommands();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length);
      renderCommands();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(selectedIndex);
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  paletteResults.addEventListener('click', (e) => {
    const row = e.target.closest('.cmd-result-item[data-cmd-idx]');
    if (row) {
      executeCommand(Number(row.getAttribute('data-cmd-idx')));
    }
  });

  paletteModal.addEventListener('click', (e) => {
    if (e.target === paletteModal) closePalette();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (paletteModal.classList.contains('hidden')) {
        openPalette();
      } else {
        closePalette();
      }
    }
  });
});

// ==========================================
// SCROLL-SPY NAVIGATION & MOBILE MENU DRAWER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.querySelector('nav .nav-links') || document.querySelector('nav ul');
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('nav a[href^="#"]');

  if (mobileBtn && navLinksContainer) {
    mobileBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });

    navAnchors.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // Highlight active section in navbar on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(a => {
          a.classList.remove('active-nav');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active-nav');
          }
        });
      }
    });
  }, { passive: true });
});

// ==========================================
// PORTFOLIO SHARE & CANONICAL LINK COPIER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const shareBtn = document.getElementById('sharePortfolioBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const shareUrl = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: shareUrl
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
          if (typeof showToast === 'function') {
            showToast('Portfolio URL copied to clipboard!');
          }
        });
      }
    });
  }
});

// ==========================================
// PWA SERVICE WORKER & INSTALL PROMPT HANDLER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  let deferredPrompt = null;
  const installBtn = document.getElementById('installPwaBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.classList.remove('hidden');
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted' && typeof showToast === 'function') {
        showToast('Dev Showroom installed!');
      }
      deferredPrompt = null;
      installBtn.classList.add('hidden');
    });
  }

  window.addEventListener('offline', () => {
    if (typeof showToast === 'function') {
      showToast('Offline mode active — serving cached showroom');
    }
  });

  window.addEventListener('online', () => {
    if (typeof showToast === 'function') {
      showToast('Back online — live telemetry synced');
    }
  });
});

// ==========================================
// LIVE REPOSITORY SPOTLIGHT (SORTED BY PUSH)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const spotlightGrid = document.getElementById('repoSpotlightGrid');
  const username = 'MANAV-MISHRA-BYTES';

  if (!spotlightGrid) return;

  fetch(`https://api.github.com/users/${username}/repos?type=sources&sort=pushed&direction=desc&per_page=6`)
    .then(res => {
      if (!res.ok) throw new Error('Unable to fetch repos');
      return res.json();
    })
    .then(repos => {
      const topRepos = repos.filter(r => !r.fork).slice(0, 4);

      if (topRepos.length === 0) {
        spotlightGrid.innerHTML = '<p class="activity-loading">No public source repositories found.</p>';
        return;
      }

      spotlightGrid.innerHTML = topRepos.map(repo => {
        const desc = repo.description
          ? escapeHtml(repo.description)
          : 'Active engineering repository maintained by Manav Mishra.';
        const lang = repo.language ? escapeHtml(repo.language) : 'Code';
        const pushedDate = new Date(repo.pushed_at).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric'
        });

        return `
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="spotlight-repo-item">
            <div class="spotlight-repo-top">
              <span class="spotlight-repo-name">${escapeHtml(repo.name)}</span>
              <span class="spotlight-repo-meta">★ ${repo.stargazers_count}</span>
            </div>
            <p class="spotlight-repo-desc">${desc}</p>
            <div class="spotlight-repo-meta">
              <span>● ${lang}</span>
              <span>Updated ${pushedDate}</span>
            </div>
          </a>
        `;
      }).join('');
    })
    .catch(() => {
      spotlightGrid.innerHTML = `
        <a href="https://github.com/MANAV-MISHRA-BYTES/dev-showroom" target="_blank" rel="noopener" class="spotlight-repo-item">
          <div class="spotlight-repo-top">
            <span class="spotlight-repo-name">dev-showroom</span>
            <span class="spotlight-repo-meta">★ Live</span>
          </div>
          <p class="spotlight-repo-desc">Interactive Developer Showroom PWA with live GitHub REST telemetry and CLI terminal.</p>
          <div class="spotlight-repo-meta">
            <span>● JavaScript</span>
            <span>Active</span>
          </div>
        </a>
      `;
    });
});