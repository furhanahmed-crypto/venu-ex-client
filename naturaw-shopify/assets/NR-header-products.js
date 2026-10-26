(function () {
  var COLUMNS = [
    { key: 'chips', label: 'Chips' },
    { key: 'millet mixtures', label: 'Millet Mixtures' },
  ];

  function typeKey(value) {
    return String(value || '')
      .trim()
      .toLowerCase();
  }

  function build(root) {
    var dataNode = root.querySelector('[data-nr-mega-catalog]');
    var cols = root.querySelector('[data-nr-mega-cols]');
    if (!dataNode || !cols || cols.childElementCount) return;

    var catalog = [];
    try {
      catalog = JSON.parse(dataNode.textContent);
    } catch (error) {
      return;
    }

    COLUMNS.forEach(function (column) {
      var products = catalog.filter(function (product) {
        return typeKey(product.type) === column.key;
      });

      var section = document.createElement('div');
      section.className = 'nr-mega-products__col';

      var heading = document.createElement('p');
      heading.className = 'nr-mega-products__heading';
      heading.textContent = column.label;

      var list = document.createElement('ul');
      list.className = 'nr-mega-products__list';

      products.forEach(function (product) {
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.className = 'nr-mega-products__link';
        link.href = product.url;
        link.textContent = product.title;
        item.appendChild(link);
        list.appendChild(item);
      });

      section.append(heading, list);
      cols.appendChild(section);
    });
  }

  function init() {
    document.querySelectorAll('[data-nr-mega-products]').forEach(build);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
