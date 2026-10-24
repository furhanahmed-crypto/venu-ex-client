(function () {
  function isInverseCard(option) {
    return (
      option.background &&
      (option.background.indexOf('--color-text') !== -1 || option.id === 3)
    );
  }

  function buildCard(option) {
    const inverse = isInverseCard(option);
    const article = document.createElement('article');
    article.className =
      'nr-three-ways__card' + (inverse ? ' nr-three-ways__card--inverse' : '');
    article.style.background = option.background;

    const body = document.createElement('div');
    body.className = 'nr-three-ways__card-body';

    const label = document.createElement('p');
    label.className = 'nr-three-ways__card-label';
    label.textContent = option.label;

    const title = document.createElement('h3');
    title.className = 'nr-three-ways__card-title';
    title.textContent = option.title;

    const desc = document.createElement('p');
    desc.className = 'nr-three-ways__card-desc';
    desc.textContent = option.description;

    const price = document.createElement('p');
    price.className = 'nr-three-ways__card-price';
    price.textContent = option.price;

    const cta = document.createElement('a');
    cta.className = 'nr-three-ways__card-cta';
    cta.href = option.url || '#';
    cta.textContent = option.cta;

    body.append(label, title, desc, price, cta);
    article.appendChild(body);

    if (option.image) {
      const media = document.createElement('div');
      media.className = 'nr-three-ways__card-media';

      const img = document.createElement('img');
      img.className = 'nr-three-ways__card-image';
      img.src = option.image;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', () => {
        media.remove();
      });

      media.appendChild(img);
      article.appendChild(media);
    }

    return article;
  }

  function initRoot(root) {
    const data = window.NRData || window.NaturawRevampData;
    const options = data && data.buyingOptions;
    if (!options || !options.length) return;

    root.innerHTML = '';
    options.forEach((option) => {
      root.appendChild(buildCard(option));
    });
  }

  function init() {
    document.querySelectorAll('[data-nr-three-ways-root]').forEach(initRoot);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
