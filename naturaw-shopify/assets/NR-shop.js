(function () {
  var TAB_TYPES = {
    chips: 'chips',
    'millet mixtures': 'millet mixtures',
  };

  function normalizeType(value) {
    return String(value || '')
      .trim()
      .toLowerCase();
  }

  function parseCatalog(sectionEl) {
    var node = sectionEl.querySelector('[data-nr-shop-catalog]');
    if (!node) return [];
    try {
      return JSON.parse(node.textContent);
    } catch (e) {
      console.warn('[NR Shop] Could not parse product catalog', e);
      return [];
    }
  }

  function getSpinnerHtml(sectionEl) {
    var tpl = sectionEl.querySelector('[data-nr-shop-spinner]');
    return tpl ? tpl.innerHTML.trim() : '';
  }

  function buildCard(product, sectionId, spinnerHtml) {
    var article = document.createElement('article');
    article.className = 'nr-shop__card';
    article.dataset.productId = String(product.id);

    if (product.image) {
      var media = document.createElement('div');
      media.className = 'nr-shop__card-media';
      var img = document.createElement('img');
      img.className = 'nr-shop__card-image';
      img.src = product.image;
      img.alt = product.imageAlt || product.title;
      img.loading = 'lazy';
      img.decoding = 'async';
      media.appendChild(img);
      article.appendChild(media);
    }

    var body = document.createElement('div');
    body.className = 'nr-shop__card-body';

    var title = document.createElement('h3');
    title.className = 'nr-shop__card-title';
    var link = document.createElement('a');
    link.href = product.url;
    link.textContent = product.title;
    title.appendChild(link);

    var meta = document.createElement('p');
    meta.className = 'nr-shop__card-meta';
    meta.textContent = product.weight || '';

    var price = document.createElement('p');
    price.className = 'nr-shop__card-price';
    price.textContent = product.priceFormatted || '';

    body.append(title, meta, price);

    var formId = 'nr-shop-form-' + product.id + '-' + sectionId;
    var productForm = document.createElement('product-form');
    productForm.className = 'nr-shop__product-form';
    productForm.dataset.sectionId = sectionId;
    productForm.dataset.nrShop = 'true';

    var soldOut = !product.available;
    var cartAddUrl =
      (window.routes && window.routes.cart_add_url) || '/cart/add';
    productForm.innerHTML =
      '<form method="post" action="' +
      cartAddUrl +
      '" id="' +
      formId +
      '" class="form" novalidate="novalidate" data-type="add-to-cart-form">' +
      '<input type="hidden" name="id" value="' +
      product.variantId +
      '" class="product-variant-id"' +
      (soldOut ? ' disabled' : '') +
      '>' +
      '<button type="submit" name="add" class="nr-shop__atc"' +
      (soldOut ? ' disabled' : '') +
      ' aria-live="polite">' +
      '<span>' +
      (soldOut ? 'Sold out' : 'Add to cart') +
      '</span>' +
      spinnerHtml +
      '</button></form>';

    body.appendChild(productForm);
    article.appendChild(body);
    return article;
  }

  function renderGrid(sectionEl, catalog, activeTab, sectionId, spinnerHtml) {
    var grid = sectionEl.querySelector('[data-nr-shop-grid]');
    var empty = sectionEl.querySelector('[data-nr-shop-empty]');
    if (!grid) return;

    var typeKey = TAB_TYPES[activeTab];
    var items = catalog.filter(function (p) {
      return normalizeType(p.type) === typeKey;
    });

    grid.innerHTML = '';
    grid.className = 'nr-shop__grid';

    if (!items.length) {
      if (empty) {
        empty.hidden = false;
        empty.classList.remove('hidden');
      }
      return;
    }

    if (empty) {
      empty.hidden = true;
      empty.classList.add('hidden');
    }

    items.forEach(function (product) {
      grid.appendChild(buildCard(product, sectionId, spinnerHtml));
    });
  }

  function setActiveTab(sectionEl, tabKey) {
    sectionEl.querySelectorAll('[data-nr-shop-tab]').forEach(function (btn) {
      var isActive = btn.dataset.nrShopTab === tabKey;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    sectionEl.dataset.nrShopActiveTab = tabKey;
  }

  function initSection(sectionEl) {
    var catalog = parseCatalog(sectionEl);
    var sectionId = sectionEl.dataset.sectionId || '';
    var spinnerHtml = getSpinnerHtml(sectionEl);
    var activeTab = 'chips';

    renderGrid(sectionEl, catalog, activeTab, sectionId, spinnerHtml);
    setActiveTab(sectionEl, activeTab);

    sectionEl.querySelectorAll('[data-nr-shop-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tabKey = btn.dataset.nrShopTab;
        if (!tabKey || tabKey === activeTab) return;
        activeTab = tabKey;
        setActiveTab(sectionEl, activeTab);
        renderGrid(sectionEl, catalog, activeTab, sectionId, spinnerHtml);
      });
    });

    if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
      subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
        if (!event || event.source !== 'product-form') return;
        var variantId = String(event.productVariantId || '');
        if (!variantId) return;
        var inSection = sectionEl.querySelector(
          '.nr-shop__product-form input[name="id"][value="' + variantId + '"]'
        );
        if (!inSection) return;
        if (window.NRToast && typeof window.NRToast.show === 'function') {
          window.NRToast.show('Item added to cart');
        }
      });
    }
  }

  function init() {
    document.querySelectorAll('[data-nr-shop]').forEach(initSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
