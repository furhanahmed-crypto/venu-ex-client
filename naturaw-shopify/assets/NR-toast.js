(function () {
  var HIDE_MS = 3200;
  var root;

  function ensureRoot() {
    if (root) return root;
    root = document.createElement('div');
    root.className = 'nr-toast';
    root.setAttribute('role', 'status');
    root.setAttribute('aria-live', 'polite');
    root.hidden = true;
    document.body.appendChild(root);
    return root;
  }

  var hideTimer;

  function show(message) {
    var el = ensureRoot();
    el.textContent = message;
    el.hidden = false;
    el.classList.add('is-visible');
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(function () {
      el.classList.remove('is-visible');
      el.hidden = true;
    }, HIDE_MS);
  }

  window.NRToast = { show: show };
})();
