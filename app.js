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