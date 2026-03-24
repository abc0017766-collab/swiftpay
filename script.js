/* =============================================
   SWIFTPAY SOLUTIONS — script.js
   ============================================= */

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Mobile menu ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  mobileMenu.style.display = 'flex';
  mobileOverlay.classList.add('open');
  mobileOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    if (!mobileMenu.classList.contains('open')) {
      mobileMenu.style.display = 'none';
      mobileOverlay.style.display = 'none';
    }
  }, 320);
}

mobileClose.addEventListener('click', closeMobile);
mobileOverlay.addEventListener('click', closeMobile);

/* ---- Floating CTA visibility ---- */
const floatingCta = document.getElementById('floatingCta');
window.addEventListener('scroll', () => {
  floatingCta.classList.toggle('visible', window.scrollY > 600);
});

/* ---- Hero form submit ---- */
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn');
  const btnText = btn.querySelector('.btn-text');
  const btnLoader = btn.querySelector('.btn-loader');

  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';

  // Simulate API call
  setTimeout(() => {
    e.target.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'flex';
    document.getElementById('formSuccess').style.flexDirection = 'column';
    document.getElementById('formSuccess').style.alignItems = 'center';
  }, 1200);
}

/* ---- Contact form submit ---- */
function submitContact(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn');
  const origText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending…';
  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'var(--c-green)';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = origText;
      btn.style.background = '';
      e.target.reset();
    }, 3000);
  }, 1000);
}

/* ---- Stat counter animation ---- */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  counters.forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

/* ---- Intersection Observer for reveals ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  /* Reveal animations */
  const sections = document.querySelectorAll(
    '.sol-card, .pos-card, .why-card, .testimonial-card, ' +
    '.contact-info, .contact-form-wrap, .guarantee-inner, ' +
    '.section-header, .stat-item, .ind-item'
  );
  sections.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    revealObserver.observe(el);
  });

  /* Stats counter */
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);

  /* Active nav link on scroll */
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const allSections = document.querySelectorAll('section[id]');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--c-white)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  allSections.forEach(s => activeObserver.observe(s));

  /* Smooth anchor for all # links */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* Parallax on hero orbs (subtle) */
  const orb1 = document.querySelector('.orb1');
  const orb2 = document.querySelector('.orb2');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (orb1) orb1.style.transform = `translateY(${y * 0.12}px)`;
    if (orb2) orb2.style.transform = `translateY(${y * -0.08}px)`;
  }, { passive: true });
});
