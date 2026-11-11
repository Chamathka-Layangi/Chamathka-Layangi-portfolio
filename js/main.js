/**
 * MAIN APP CONTROLLER
 * Chamathka Layangi - Portfolio
 */

(function () {
  // 1. TYPING EFFECT IN HERO SECTION
  function initTypingEffect() {
    const typingEl = document.getElementById('typingText');
    if (!typingEl) return;

    const phrases = [
      'First-Year Computing Undergraduate at SLIIT',
      'IoT Enthusiast & Hardware Prototyper',
      'Java OOP Developer & Systems Explorer',
      'Top 3 Award Winner — TerraPulse Project'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeLoop() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        typingEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 40;
      } else {
        typingEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // 2. TOAST NOTIFICATION SYSTEM
  function createToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  window.showToast = function (message, icon = '⚡') {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 400);
    }, 3800);
  };

  // 3. NAVBAR SCROLL SPY & MOBILE DRAWER
  function initNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksList = document.getElementById('navLinksList');

    // Mobile menu toggle
    if (mobileMenuBtn && navLinksList) {
      mobileMenuBtn.addEventListener('click', () => {
        navLinksList.classList.toggle('mobile-open');
        const isOpen = navLinksList.classList.contains('mobile-open');
        mobileMenuBtn.innerHTML = isOpen ? '✕' : '☰';
      });

      // Close mobile menu when link is clicked
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          navLinksList.classList.remove('mobile-open');
          if (mobileMenuBtn) mobileMenuBtn.innerHTML = '☰';
        });
      });
    }

    // Scroll spy
    window.addEventListener('scroll', () => {
      let currentSection = '';
      const scrollY = window.pageYOffset;

      sections.forEach((sec) => {
        const top = sec.offsetTop - 140;
        const height = sec.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSection = sec.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // 4. CERTIFICATE & EVENT PHOTOS LIGHTBOX MODAL
  function initLightboxModal() {
    let modal = document.getElementById('imageLightboxModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'glass-modal-backdrop';
      modal.id = 'imageLightboxModal';
      modal.innerHTML = `
        <div class="glass-modal-container" style="max-width: 820px; padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h4 id="lightboxTitle" style="font-size: 1.15rem; color: var(--accent-electric);">Preview</h4>
            <button id="lightboxCloseBtn" style="background: transparent; border: none; font-size: 1.4rem; color: var(--text-primary); cursor: pointer;">✕</button>
          </div>
          <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle); max-height: 70vh;">
            <img id="lightboxImg" src="" alt="Showcase Preview" style="width: 100%; height: auto; display: block;" />
          </div>
          <p id="lightboxCaption" style="margin-top: 14px; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;"></p>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = modal.querySelector('#lightboxCloseBtn');
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }

    window.openLightbox = function (imgSrc, title, caption) {
      const modal = document.getElementById('imageLightboxModal');
      const img = modal.querySelector('#lightboxImg');
      const titleEl = modal.querySelector('#lightboxTitle');
      const captionEl = modal.querySelector('#lightboxCaption');

      img.src = imgSrc;
      titleEl.textContent = title;
      captionEl.textContent = caption;
      modal.classList.add('open');
    };

    // Attach to certificate preview
    const certFrame = document.querySelector('.cert-preview-frame');
    if (certFrame) {
      certFrame.addEventListener('click', () => {
        const certImg = certFrame.querySelector('img');
        window.openLightbox(
          certImg ? certImg.src : 'assets/images/certificate-terrapulse.svg',
          'TerraPulse — Top 3 Winner Certificate',
          'Secured Top 3 recognition at the SLIIT Project Showcase for TerraPulse, an environmental IoT monitoring system integrating ESP32 and real-time cloud telemetry.'
        );
      });
    }

    // Attach to workshop photo cards
    const workshopCards = document.querySelectorAll('.workshop-photo-card');
    workshopCards.forEach((card) => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const strong = card.querySelector('.workshop-caption strong');
        const desc = card.querySelector('.workshop-caption');
        window.openLightbox(
          img ? img.src : '',
          strong ? strong.textContent : 'Event Showcase',
          desc ? desc.textContent : ''
        );
      });
    });
  }

  // 5. CONTACT FORM & EMAIL COPY HANDLER
  function initContactForm() {
    const contactForm = document.getElementById('portfolioContactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const subjectInput = document.getElementById('contactSubject');
        const msgInput = document.getElementById('contactMessage');
        const submitBtn = contactForm.querySelector('.form-submit-btn');

        const name = nameInput ? nameInput.value.trim() : 'Friend';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = msgInput ? msgInput.value.trim() : '';

        if (!name || !email || !message) {
          window.showToast('Please complete all required fields', '⚠️');
          return;
        }

        // Simulate sending micro-interaction
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          Transmitting Message...
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          contactForm.reset();

          window.showToast(`Thank you, ${name}! Your message has been sent. Chamathka will reply soon.`, '🚀');
        }, 1200);
      });
    }

    // Copy email chip
    const copyChips = document.querySelectorAll('.copy-email-chip');
    copyChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const email = 'chamathkalayangi@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
          window.showToast(`Copied to clipboard: ${email}`, '📋');
        }).catch(() => {
          window.showToast(`Email: ${email}`, '📋');
        });
      });
    });
  }

    // Back to Top button
  function initBackToTop() {
    const backBtn = document.getElementById('backToTopBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // Skills Category Filtering
  function initSkillsTabs() {
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        skillTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const filterGroup = tab.getAttribute('data-skill-tab');

        skillCards.forEach((card) => {
          const cardGroup = card.getAttribute('data-group');
          if (filterGroup === 'all' || cardGroup === filterGroup) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px) scale(0.96)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initNavbar();
    initLightboxModal();
    initContactForm();
    initBackToTop();
    initSkillsTabs();
  });
})();
