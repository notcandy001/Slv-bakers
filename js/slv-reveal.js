/* Lightweight scroll-reveal (IntersectionObserver). Works on phones, no libraries/licences. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var SEL = [
    '.elementor-widget-heading', '.elementor-widget-text-editor', '.elementor-widget-image',
    '.elementor-widget-button', '.elementor-widget-image-carousel', '.elementor-widget-testimonial',
    '.elementor-widget-star-rating', '.elementor-widget-social-icons',
    '.wpforms-container', '.site-footer .menu', '.site-below-footer-wrap'
  ].join(',');

  var els = Array.prototype.slice.call(document.querySelectorAll(SEL))
    .filter(function (el) { return !el.closest('header, .main-header-bar, #masthead'); });

  els.forEach(function (el) {
    el.classList.add('rv');
    if (el.classList.contains('elementor-widget-image')) el.classList.add('rv-zoom');
    // small stagger among siblings inside the same container
    var sibs = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('rv'); }) : [];
    var i = Math.max(0, sibs.indexOf(el));
    el.style.setProperty('--rv-delay', Math.min(i, 4) * 90 + 'ms');
  });

  root.classList.add('rv-on');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  els.forEach(function (el) { io.observe(el); });

  // Safety net: never leave content hidden if something goes wrong
  setTimeout(function () { els.forEach(function (el) { el.classList.add('rv-in'); }); }, 8000);
})();
