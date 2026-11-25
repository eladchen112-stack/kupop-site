// Top menu on narrow screens: opens and closes the panel. Loaded in <head> so the
// "js" class is set before the first paint and the header never jumps.
(function () {
  document.documentElement.classList.add('js');

  function init() {
    var button = document.getElementById('nav-btn');
    var menu = document.getElementById('nav-menu');
    if (!button || !menu) return;

    function isOpen() { return button.getAttribute('aria-expanded') === 'true'; }
    function set(open) {
      button.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('open', open);
    }
    function closeIfOutside(event) {
      if (isOpen() && !button.contains(event.target) && !menu.contains(event.target)) set(false);
    }

    button.addEventListener('click', function () { set(!isOpen()); });
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) set(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !isOpen()) return;
      set(false);
      button.focus();
    });
    document.addEventListener('click', closeIfOutside);
    // Tabbing past the last link (or back past the button) closes the panel.
    document.addEventListener('focusin', closeIfOutside);
    var wide = matchMedia('(min-width:720px)');
    if (wide.addEventListener) wide.addEventListener('change', function () { set(false); });
    // Back to a page the browser kept in memory: start closed.
    addEventListener('pageshow', function () { set(false); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
