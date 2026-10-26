(function () {
  const SELECTOR = '[data-nr-reveal]';

  function showAll() {
    document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add('is-visible'));
  }

  function init() {
    const isEditor = document.documentElement.classList.contains('shopify-design-mode');
    if (isEditor || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', showAll);
})();
