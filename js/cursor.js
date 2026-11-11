/**
 * SOFT AMBIENT BACKGROUND CURSOR GLOW
 * Translucent electric blue gradient follower that floats behind the standard mouse pointer
 * Chamathka Layangi - Portfolio
 */

(function () {
  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  // Get or dynamically create the ambient background glow element
  let glowEl = document.getElementById('cursorAmbientGlow');
  if (!glowEl) {
    glowEl = document.createElement('div');
    glowEl.className = 'cursor-ambient-glow';
    glowEl.id = 'cursorAmbientGlow';
    glowEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glowEl);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;
  let isVisible = false;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      glowEl.style.opacity = '1';
    }
  }, { passive: true });

  // Smooth lerp loop for the trailing ambient gradient glow
  function renderAmbientGlow() {
    if (isVisible) {
      glowX += (mouseX - glowX) * 0.14;
      glowY += (mouseY - glowY) * 0.14;

      glowEl.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderAmbientGlow);
  }
  requestAnimationFrame(renderAmbientGlow);

  // Fade out when cursor leaves the browser window
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    glowEl.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    glowEl.style.opacity = '1';
  });
})();
