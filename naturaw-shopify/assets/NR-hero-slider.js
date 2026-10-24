(function () {
  const INTERVAL_MS = 3000;
  const EASING = 'cubic-bezier(0.45, 0, 0.15, 1)';

  function initHeroSlider(section) {
    const viewport = section.querySelector('[data-nr-hero-track]');
    const track = section.querySelector('[data-nr-hero-slider-track]');
    if (!viewport || !track) return;

    const slides = Array.from(track.querySelectorAll('[data-nr-hero-slide]'));
    if (slides.length <= 1) return;

    const dots = Array.from(section.querySelectorAll('[data-nr-hero-dot]'));

    let index = slides.findIndex((s) => s.classList.contains('is-active'));
    if (index < 0) index = 0;

    let timer = null;
    let paused = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    track.style.transition = reduceMotion
      ? 'none'
      : `transform 0.75s ${EASING}`;

    function setTrackOffset(i) {
      track.style.transform = `translate3d(-${i * 100}%, 0, 0)`;
    }

    function setActive(nextIndex) {
      if (nextIndex < 0 || nextIndex >= slides.length) return;
      if (nextIndex === index && slides[nextIndex].classList.contains('is-active')) return;

      slides[index].classList.remove('is-active');
      slides[index].setAttribute('aria-hidden', 'true');

      slides[nextIndex].classList.add('is-active');
      slides[nextIndex].setAttribute('aria-hidden', 'false');

      setTrackOffset(nextIndex);
      index = nextIndex;

      dots.forEach((dot, i) => {
        const selected = i === index;
        dot.classList.toggle('is-active', selected);
        dot.setAttribute('aria-selected', selected ? 'true' : 'false');
        dot.tabIndex = selected ? 0 : -1;
      });
    }

    function next() {
      setActive((index + 1) % slides.length);
    }

    function startAutoplay() {
      stopAutoplay();
      if (paused || reduceMotion) return;
      timer = window.setInterval(next, INTERVAL_MS);
    }

    function stopAutoplay() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        setActive(i);
        startAutoplay();
      });
    });

    section.addEventListener('mouseenter', () => {
      paused = true;
      stopAutoplay();
    });
    section.addEventListener('mouseleave', () => {
      paused = false;
      startAutoplay();
    });
    section.addEventListener('focusin', () => {
      paused = true;
      stopAutoplay();
    });
    section.addEventListener('focusout', (e) => {
      if (!section.contains(e.relatedTarget)) {
        paused = false;
        startAutoplay();
      }
    });

    setTrackOffset(index);
    setActive(index);
    startAutoplay();
  }

  function init() {
    document.querySelectorAll('[data-nr-hero-root]').forEach(initHeroSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
