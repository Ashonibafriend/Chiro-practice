// ═══ NAVBAR SCROLL EFFECT ═══
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ═══ MOBILE MENU ═══
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const spans = mobileToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ═══ SCROLL REVEAL ANIMATIONS ═══
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ═══ UNIVERSAL COUNTER ANIMATION ═══
// Each .count-group triggers independently when scrolled into view
function animateCounters(container) {
  const items = container.querySelectorAll('[data-count]');
  // If the container itself has data-count (single element), include it
  const targets = items.length > 0 ? items : (container.hasAttribute('data-count') ? [container] : []);

  targets.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-count'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const useComma = counter.getAttribute('data-format') === 'comma';
    const decimalPlaces = counter.getAttribute('data-decimal') ? parseInt(counter.getAttribute('data-decimal')) : 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = eased * target;

      let display;
      if (decimalPlaces > 0) {
        display = current.toFixed(decimalPlaces);
      } else {
        display = Math.floor(current).toString();
        if (useComma) {
          display = Math.floor(current).toLocaleString();
        }
      }

      counter.textContent = display + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  });
}

const countGroups = document.querySelectorAll('.count-group');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

countGroups.forEach(group => countObserver.observe(group));

// ═══ SMOOTH SCROLL ═══
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ═══ BOOKING FORM ═══
const bookingForm = document.getElementById('bookingForm');
const successModal = document.getElementById('successModal');

bookingForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const btn = document.getElementById('submitBtn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    successModal.classList.add('active');
    bookingForm.reset();
  }, 1500);
});

// Close modal on overlay click
successModal.addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.remove('active');
  }
});

// ═══ PARALLAX on Hero Cards ═══
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.hero-float-card');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  cards.forEach(card => {
    card.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ═══ TYPING EFFECT on Hero ═══
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  heroTitle.style.opacity = '0';
  heroTitle.style.transform = 'translateY(30px)';
  setTimeout(() => {
    heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'translateY(0)';
  }, 300);
}

// ═══ HERO SUBTITLE FADE ═══
const heroSub = document.querySelector('.hero-subtitle');
if (heroSub) {
  heroSub.style.opacity = '0';
  heroSub.style.transform = 'translateY(20px)';
  setTimeout(() => {
    heroSub.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    heroSub.style.opacity = '1';
    heroSub.style.transform = 'translateY(0)';
  }, 600);
}

// ═══ HERO ACTIONS FADE ═══
const heroActions = document.querySelector('.hero-actions');
if (heroActions) {
  heroActions.style.opacity = '0';
  heroActions.style.transform = 'translateY(20px)';
  setTimeout(() => {
    heroActions.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    heroActions.style.opacity = '1';
    heroActions.style.transform = 'translateY(0)';
  }, 900);
}

// ═══ HERO STATS REVEAL ═══
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  heroStats.style.opacity = '0';
  heroStats.style.transform = 'translateY(15px)';
  setTimeout(() => {
    heroStats.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    heroStats.style.opacity = '1';
    heroStats.style.transform = 'translateY(0)';
  }, 1200);
}

// ═══ STICKY CTA VISIBILITY ═══
const stickyCta = document.getElementById('stickyCta');
const bookingSection = document.getElementById('booking');
window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768) {
    const bookingTop = bookingSection.getBoundingClientRect().top;
    stickyCta.style.display = bookingTop > window.innerHeight ? 'block' : 'none';
  }
});

// ═══ TILT EFFECT ON SERVICE CARDS ═══
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
});

// ═══ NAVBAR ACTIVE LINK HIGHLIGHT ═══
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link && !link.classList.contains('nav-cta')) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--primary-light)';
      } else {
        link.style.color = '';
      }
    }
  });
});

console.log('🦴 Align Chiropractic website loaded successfully!');
