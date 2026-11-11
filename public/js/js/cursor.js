/**
 * CUSTOM GLOWING MOUSE CURSOR
 * Chamathka Layangi - Portfolio
 */

(function () {
  // Check if touch device
  if (window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  // Create cursor DOM elements if not present
  let dot = document.querySelector('.custom-cursor-dot');
  let ring = document.querySelector('.custom-cursor-ring');

  if (!dot) {
    dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(dot);
  }

  if (!ring) {
    ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    document.body.appendChild(ring);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovering = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant update for the center dot
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Smooth lerp loop for the outer glowing ring
  function renderCursorRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursorRing);
  }
  requestAnimationFrame(renderCursorRing);

  // Micro-interactions on interactive elements
  function bindHoverTriggers() {
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, .tilt-card, .skill-card, .pill-card, .cmd-item, .cert-preview-frame, .workshop-photo-card, [role="button"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', bindHoverTriggers);

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '0.6';
  });

  window.rebindCursorTriggers = bindHoverTriggers;
})();
