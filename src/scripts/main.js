const initReveal = () => {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
};

const initParallax = () => {
  const orb = document.querySelector('.hero__orb');
  const grid = document.querySelector('.hero__grid');
  const hero = document.getElementById('hero');
  if (!orb || !grid || !hero) return;

  let ticking = false;
  let lastY = 0;

  window.addEventListener(
    'scroll',
    () => {
      lastY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          orb.style.transform = `translate3d(0,${lastY * 0.15}px,0)`;
          grid.style.transform = `translate3d(0,${lastY * 0.05}px,0)`;
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
};

const addSkipLink = () => {
  if (document.querySelector('.skip-link')) return;
  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.className = 'skip-link';
  skip.textContent = 'Saltar al contenido';
  skip.style.cssText =
    'position:fixed;top:-100%;left:1rem;z-index:9999;padding:0.5rem 1rem;background:#c084fc;color:#fff;border-radius:6px;font-weight:600;transition:top 0.2s';
  skip.addEventListener('focus', () => { skip.style.top = '1rem'; });
  skip.addEventListener('blur', () => { skip.style.top = '-100%'; });
  document.body.prepend(skip);
};

const initScrollTop = () => {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  const SHOW_AFTER = 0.6;

  const update = () => {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && scrolled / docHeight >= SHOW_AFTER) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initParallax();
  addSkipLink();
  initScrollTop();

  document.querySelectorAll('.reveal').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const delay = el.style.transitionDelay || '0s';
      setTimeout(() => el.classList.add('visible'), parseFloat(delay) * 1000 + 50);
    }
  });
});