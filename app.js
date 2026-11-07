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