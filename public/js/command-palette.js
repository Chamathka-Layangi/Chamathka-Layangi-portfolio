/**
 * COMMAND PALETTE (CTRL + K / CMD + K)
 * Chamathka Layangi - Portfolio
 */

(function () {
  const COMMANDS = [
    // Navigation
    { id: 'nav-home', label: 'Go to Home / Hero Section', category: 'Navigation', icon: '🏠', action: () => scrollToSection('home') },
    { id: 'nav-about', label: 'Go to About Me & IT Journey', category: 'Navigation', icon: '👤', action: () => scrollToSection('about') },
    { id: 'nav-skills', label: 'Go to Technical Skills & IoT Sensors', category: 'Navigation', icon: '⚡', action: () => scrollToSection('skills') },
    { id: 'nav-projects', label: 'Go to Featured Projects Bento Grid', category: 'Navigation', icon: '🚀', action: () => scrollToSection('projects') },
    { id: 'nav-education', label: 'Go to Education, Awards & Workshops', category: 'Navigation', icon: '🎓', action: () => scrollToSection('education') },
    { id: 'nav-contact', label: 'Go to Contact Section & Send Message', category: 'Navigation', icon: '📬', action: () => scrollToSection('contact') },

    // Project Filters
    { id: 'filter-all', label: 'Filter Projects: View All', category: 'Projects', icon: '📁', action: () => filterCategory('all') },
    { id: 'filter-iot', label: 'Filter Projects: IoT & Embedded Systems', category: 'Projects', icon: '📡', action: () => filterCategory('iot') },
    { id: 'filter-web', label: 'Filter Projects: Web Applications', category: 'Projects', icon: '🌐', action: () => filterCategory('web') },
    { id: 'filter-java', label: 'Filter Projects: Java OOP Systems', category: 'Projects', icon: '☕', action: () => filterCategory('java') },

    // Interactive Actions & Utilities
    { id: 'action-theme', label: 'Toggle Dark / Light Theme', category: 'Preferences', icon: '🌓', action: () => window.toggleTheme && window.toggleTheme() },
    { id: 'action-email', label: 'Copy Email Address to Clipboard', category: 'Actions', icon: '📋', action: () => copyEmail() },
    { id: 'action-terrapulse', label: 'Launch TerraPulse Live Telemetry', category: 'Interactive', icon: '📊', action: () => launchTerraPulse() },
    { id: 'action-github', label: 'Open GitHub Profile', category: 'Social', icon: '🐙', action: () => window.open('https://github.com/YOUR_PROFILE', '_blank') },
    { id: 'action-linkedin', label: 'Open LinkedIn Profile', category: 'Social', icon: '💼', action: () => window.open('https://linkedin.com/in/YOUR_PROFILE', '_blank') }
  ];

  let modalEl = null;
  let searchInput = null;
  let resultsContainer = null;
  let selectedIndex = 0;
  let filteredCommands = [...COMMANDS];

  function createModal() {
    modalEl = document.createElement('div');
    modalEl.className = 'cmd-palette-modal';
    modalEl.id = 'cmdPaletteModal';
    modalEl.innerHTML = `
      <div class="cmd-palette-box">
        <div class="cmd-search-header">
          <span class="cmd-search-icon">🔍</span>
          <input type="text" class="cmd-search-input" id="cmdSearchInput" placeholder="Type a command or search sections, skills, projects..." autocomplete="off" />
          <span class="cmd-close-chip" id="cmdCloseBtn">ESC</span>
        </div>
        <ul class="cmd-results-list" id="cmdResultsList"></ul>
        <div class="cmd-footer-bar">
          <div class="cmd-hints">
            <span class="cmd-hint-item"><span>↑</span> <span>↓</span> to navigate</span>
            <span class="cmd-hint-item"><span>↵</span> to select</span>
            <span class="cmd-hint-item"><span>esc</span> to close</span>
          </div>
          <div>Chamathka Layangi • SLIIT</div>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    searchInput = modalEl.querySelector('#cmdSearchInput');
    resultsContainer = modalEl.querySelector('#cmdResultsList');

    // Event Listeners
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) closePalette();
    });

    const closeBtn = modalEl.querySelector('#cmdCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closePalette);

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      filterResults(query);
    });

    searchInput.addEventListener('keydown', handleKeyNavigation);
  }

  function renderResults() {
    if (!resultsContainer) return;

    if (filteredCommands.length === 0) {
      resultsContainer.innerHTML = `
        <li style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.95rem;">
          No matching commands found. Try searching "IoT", "Projects", "Java", or "Contact".
        </li>
      `;
      return;
    }

    let html = '';
    let currentCategory = '';

    filteredCommands.forEach((cmd, idx) => {
      if (cmd.category !== currentCategory) {
        currentCategory = cmd.category;
        html += `<li class="cmd-group-title">${currentCategory}</li>`;
      }

      const isSelected = idx === selectedIndex;
      html += `
        <li class="cmd-item ${isSelected ? 'selected' : ''}" data-index="${idx}">
          <div class="cmd-item-left">
            <div class="cmd-item-icon">${cmd.icon}</div>
            <span class="cmd-item-label">${cmd.label}</span>
          </div>
          <span class="cmd-item-category">${cmd.category}</span>
        </li>
      `;
    });

    resultsContainer.innerHTML = html;

    // Attach click listeners to items
    const items = resultsContainer.querySelectorAll('.cmd-item');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-index'), 10);
        executeCommand(idx);
      });
      item.addEventListener('mouseenter', () => {
        selectedIndex = parseInt(item.getAttribute('data-index'), 10);
        updateSelectionHighlight();
      });
    });

    scrollSelectedIntoView();
  }

  function updateSelectionHighlight() {
    const items = resultsContainer.querySelectorAll('.cmd-item');
    items.forEach((item) => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      item.classList.toggle('selected', idx === selectedIndex);
    });
  }

  function scrollSelectedIntoView() {
    const selectedItem = resultsContainer.querySelector('.cmd-item.selected');
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest' });
    }
  }

  function filterResults(query) {
    if (!query) {
      filteredCommands = [...COMMANDS];
    } else {
      filteredCommands = COMMANDS.filter((cmd) => {
        return (
          cmd.label.toLowerCase().includes(query) ||
          cmd.category.toLowerCase().includes(query) ||
          cmd.id.toLowerCase().includes(query)
        );
      });
    }
    selectedIndex = 0;
    renderResults();
  }

  function handleKeyNavigation(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        updateSelectionHighlight();
        scrollSelectedIntoView();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        updateSelectionHighlight();
        scrollSelectedIntoView();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(selectedIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    }
  }

  function executeCommand(index) {
    const cmd = filteredCommands[index];
    if (cmd && typeof cmd.action === 'function') {
      closePalette();
      setTimeout(() => {
        cmd.action();
      }, 150);
    }
  }

  function openPalette() {
    if (!modalEl) createModal();
    modalEl.classList.add('open');
    filteredCommands = [...COMMANDS];
    selectedIndex = 0;
    if (searchInput) {
      searchInput.value = '';
      renderResults();
      setTimeout(() => searchInput.focus(), 50);
    }
    document.body.style.overflow = 'hidden';
  }

  function closePalette() {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Action Helpers
  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function filterCategory(cat) {
    scrollToSection('projects');
    if (window.filterProjectsByCategory) {
      window.filterProjectsByCategory(cat);
    }
  }

  function copyEmail() {
    const email = 'chamathka.layangi@example.com';
    navigator.clipboard.writeText(email).then(() => {
      if (window.showToast) {
        window.showToast(`Email copied: ${email}`);
      }
    }).catch(() => {
      if (window.showToast) window.showToast(`Contact email: ${email}`);
    });
  }

  function launchTerraPulse() {
    scrollToSection('projects');
    const simBtn = document.querySelector('.telemetry-sim-btn');
    if (simBtn) {
      simBtn.click();
      if (window.showToast) window.showToast('TerraPulse Live Telemetry stream running!');
    }
  }

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Check for Ctrl + K or Cmd + K
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (modalEl && modalEl.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    }
  });

  // Attach to Navbar button trigger
  document.addEventListener('DOMContentLoaded', () => {
    createModal();
    const triggers = document.querySelectorAll('.cmd-palette-trigger');
    triggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPalette();
      });
    });
  });

  window.openCommandPalette = openPalette;
  window.closeCommandPalette = closePalette;
})();
