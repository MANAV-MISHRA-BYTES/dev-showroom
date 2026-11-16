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