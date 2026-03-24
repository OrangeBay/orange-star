/* ===== STARFIELD ===== */
(function () {
  const layer = document.getElementById('stars-layer');
  const count = 140;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.4 + 0.6;
    s.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `top:${Math.random() * 100}%`,
      `left:${Math.random() * 100}%`,
      `--dur:${(Math.random() * 4 + 2).toFixed(1)}s`,
      `--delay:-${(Math.random() * 5).toFixed(1)}s`,
    ].join(';');
    layer.appendChild(s);
  }
})();

/* ===== SCROLL PROGRESS BAR ===== */
const progressBar = document.getElementById('progress-bar');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 48);
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* ===== HAMBURGER / MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  if (open) {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}
hamburger.addEventListener('click', () => toggleMenu(!hamburger.classList.contains('open')));
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

/* ===== INTERSECTION OBSERVER — REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

/* ===== STAT COUNTERS ===== */
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(el => counterObserver.observe(el));

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
const successMsg = document.getElementById('success-msg');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  contactForm.style.display = 'none';
  successMsg.classList.add('show');
});

/* ===== MODALS ===== */
function openModal(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  overlay.querySelector('.modal-close').focus();
}
function closeModal(overlay) {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('open-terms').addEventListener('click', e => { e.preventDefault(); openModal('modal-terms'); });
document.getElementById('open-privacy').addEventListener('click', e => { e.preventDefault(); openModal('modal-privacy'); });
document.getElementById('open-faq').addEventListener('click', e => { e.preventDefault(); openModal('modal-faq'); });

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.querySelector('.modal-close').addEventListener('click', () => closeModal(overlay));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
  }
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
