/**
 * SCROLL REVEAL & FRAMER-MOTION STYLE ANIMATIONS
 * Chamathka Layangi - Portfolio
 */

(function () {
  // Add CSS animation rules dynamically
  const style = document.createElement('style');
  style.textContent = `
    .reveal-item {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }

    .reveal-item.revealed {
      opacity: 1;
      transform: translateY(0);
    }

    .reveal-scale {
      opacity: 0;
      transform: scale(0.92);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .reveal-scale.revealed {
      opacity: 1;
      transform: scale(1);
    }

    /* Stagger delay classes */
    .delay-100 { transition-delay: 100ms; }
    .delay-200 { transition-delay: 200ms; }
    .delay-300 { transition-delay: 300ms; }
    .delay-400 { transition-delay: 400ms; }
    .delay-500 { transition-delay: 500ms; }
  `;
  document.head.appendChild(style);

  function initScrollObserver() {
    const revealTargets = document.querySelectorAll(
      '.reveal-item, .reveal-scale, .timeline-item, .skill-card, .bento-card, .edu-card, .workshop-photo-card, .about-narrative-card'
    );

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Trigger skill progress fill animation if present
            const progressFill = entry.target.querySelector('.skill-progress-fill');
            if (progressFill) {
              const targetWidth = progressFill.getAttribute('data-width') || '85%';
              progressFill.style.width = targetWidth;
            }

            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach((el) => {
      if (!el.classList.contains('reveal-item') && !el.classList.contains('reveal-scale')) {
        el.classList.add('reveal-item');
      }
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', initScrollObserver);
})();
