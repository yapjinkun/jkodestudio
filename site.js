// JKODE Studio — site interactivity. Theme toggle + mobile menu.
// No framework, no build step. ~60 lines of plain JS.
(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;

  // ───── Theme toggle ──────────────────────────────────────────
  // Initial value already restored by the inline blocker in <head>
  // (so we don't flash the wrong theme). This just wires the button.
  var themeBtn = document.getElementById('theme-toggle');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('jkode-theme', t); } catch (e) {}
    if (themeBtn) {
      var next = t === 'light' ? 'dark' : 'light';
      themeBtn.setAttribute('aria-label', 'Switch to ' + next + ' mode');
      themeBtn.setAttribute('title', 'Switch to ' + next + ' mode');
    }
  }
  applyTheme(root.getAttribute('data-theme') || 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = root.getAttribute('data-theme') || 'light';
      applyTheme(cur === 'light' ? 'dark' : 'light');
    });
  }

  // ───── Mobile menu ───────────────────────────────────────────
  var navMobile = document.getElementById('nav-mobile');
  var openBtn = document.getElementById('nav-open');
  var closeBtn = document.getElementById('nav-close');

  function setMenu(open) {
    if (!navMobile) return;
    navMobile.classList.toggle('is-open', open);
    navMobile.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    body.style.overflow = open ? 'hidden' : '';
  }

  if (openBtn) openBtn.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });

  // Auto-close menu on link tap
  var mobileLinks = document.querySelectorAll('[data-nav-mobile-link]');
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', function () { setMenu(false); });
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMobile && navMobile.classList.contains('is-open')) {
      setMenu(false);
    }
  });
})();
