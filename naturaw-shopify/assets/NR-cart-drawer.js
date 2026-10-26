/**
 * Ensures header cart icon opens the drawer (never navigates to /cart).
 * Delegated fallback + re-bind after section AJAX updates.
 */
(function () {
  function openDrawer(trigger) {
    var drawer = document.querySelector('cart-drawer');
    if (!drawer || typeof drawer.open !== 'function') return false;
    drawer.open(trigger || document.getElementById('cart-icon-bubble'));
    return true;
  }

  document.addEventListener(
    'click',
    function (event) {
      var icon = event.target.closest('#cart-icon-bubble');
      if (!icon) return;
      if (!document.querySelector('cart-drawer')) return;
      event.preventDefault();
      event.stopPropagation();
      openDrawer(icon);
    },
    true
  );

  function rebind() {
    var drawer = document.querySelector('cart-drawer');
    if (drawer && typeof drawer.setHeaderCartIconAccessibility === 'function') {
      drawer.setHeaderCartIconAccessibility();
    }
  }

  if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
    subscribe(PUB_SUB_EVENTS.cartUpdate, function () {
      window.setTimeout(rebind, 0);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rebind);
  } else {
    rebind();
  }
})();
