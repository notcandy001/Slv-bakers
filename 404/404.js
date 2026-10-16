// Mobile menu toggle
(function () {
  var menu = document.getElementById('nav-menu');
  var toggle = document.getElementById('nav-toggle');
  var close = document.getElementById('nav-close');
  if (!menu) return;
  function set(open) {
    menu.classList.toggle('show-menu', open);
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  }
  if (toggle) toggle.addEventListener('click', function () { set(true); });
  if (close) close.addEventListener('click', function () { set(false); });
  document.querySelectorAll('.nav__link').forEach(function (l) {
    l.addEventListener('click', function () { set(false); });
  });
})();
