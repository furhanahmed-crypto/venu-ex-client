(function () {
  var OPEN_CLASS = 'nr-cookie-banner--open';
  var CLOSING_CLASS = 'nr-cookie-banner--closing';
  var CLOSE_MS = 450;
  var SELECTORS =
    '#shopify-pc__banner, #shopify-pc-banner, [id*="shopify-pc"], .shopify-pc-banner, .shopify-pc__banner';

  function findBanner() {
    return document.querySelector(SELECTORS);
  }

  function isAcceptOrDecline(el) {
    if (!el || !el.closest) return null;
    var btn = el.closest('button, a, [role="button"]');
    if (!btn) return null;
    var text = (btn.textContent || '').toLowerCase().trim();
    var name = (btn.getAttribute('name') || '').toLowerCase();
    var action = (btn.getAttribute('data-action') || '').toLowerCase();
    if (
      name === 'accept' ||
      name === 'decline' ||
      action === 'accept' ||
      action === 'decline' ||
      text === 'accept' ||
      text === 'decline' ||
      btn.classList.contains('shopify-pc__banner__btn-accept') ||
      btn.classList.contains('shopify-pc__banner__btn-decline')
    ) {
      return btn;
    }
    return null;
  }

  function slideOut(banner) {
    banner.classList.remove(OPEN_CLASS);
    banner.classList.add(CLOSING_CLASS);
  }

  function bindBanner(banner) {
    if (!banner || banner.dataset.nrCookieBound === 'true') return;
    banner.dataset.nrCookieBound = 'true';
    banner.classList.remove(CLOSING_CLASS);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.add(OPEN_CLASS);
      });
    });

    banner.addEventListener(
      'click',
      function (event) {
        var btn = isAcceptOrDecline(event.target);
        if (!btn) return;
        slideOut(banner);
      },
      true
    );
  }

  function watchForBanner() {
    var existing = findBanner();
    if (existing) bindBanner(existing);

    var observer = new MutationObserver(function () {
      var node = findBanner();
      if (node) bindBanner(node);
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'hidden'],
    });

    window.setTimeout(function () {
      observer.disconnect();
    }, 20000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchForBanner);
  } else {
    watchForBanner();
  }
})();
