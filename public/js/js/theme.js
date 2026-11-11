/**
 * THEME MANAGER (DARK / LIGHT MODE)
 * Chamathka Layangi - Portfolio
 */

(function () {
  const THEME_KEY = 'chamathka_portfolio_theme';
  const html = document.documentElement;

  // Initialize theme from storage or system preference
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Default to dark mode for futuristic cyber portfolio
    return 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggleIcons(theme);
  }

  function updateThemeToggleIcons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i') || btn.querySelector('svg');
      if (theme === 'light') {
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
        btn.setAttribute('title', 'Switch to Dark Mode');
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
      } else {
        btn.setAttribute('aria-label', 'Switch to Light Mode');
        btn.setAttribute('title', 'Switch to Light Mode');
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
      }
    });
  }

  window.toggleTheme = function () {
    const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);

    if (window.showToast) {
      window.showToast(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark Navy'} mode`);
    }
  };

  // Bind to DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleTheme();
      });
    });
  });
})();
