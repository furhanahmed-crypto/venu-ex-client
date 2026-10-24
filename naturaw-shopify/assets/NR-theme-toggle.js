(function () {
  const STORAGE_KEY = 'naturaw-theme';

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {
      /* ignore */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function syncToggleIcons(isDark) {
    document.querySelectorAll('.naturaw-theme-icon--moon').forEach((el) => {
      el.hidden = isDark;
    });
    document.querySelectorAll('.naturaw-theme-icon--sun').forEach((el) => {
      el.hidden = !isDark;
    });
  }

  function syncHeaderTokenColors() {
    const text = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
    if (!text) return;

    document
      .querySelectorAll('.shopify-section-group-header-group .header-localization .localization-form__select')
      .forEach((el) => {
        el.style.setProperty('color', text, 'important');
        el.querySelectorAll('span').forEach((span) => {
          span.style.setProperty('color', text, 'important');
        });
      });
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* ignore */
    }
    syncToggleIcons(isDark);
    document.querySelectorAll('[data-naturaw-theme-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });
    requestAnimationFrame(syncHeaderTokenColors);
  }

  function init() {
    applyTheme(getPreferredTheme());
    document.querySelectorAll('[data-naturaw-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(next);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
