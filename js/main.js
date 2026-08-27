/* Difference Consulting — shared interactions
   Quiet, slow, deliberate. Respects reduced-motion. */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky header hairline + replay the logo video on downward scroll.
  var header = document.querySelector('.site-header');
  var logoVideo = document.querySelector('.logo__video');
  if (header) {
    var lastY = window.scrollY;
    var logoCooldown = false;
    var replayLogo = function () {
      if (!logoVideo || reducedMotion || logoCooldown) return;
      logoCooldown = true;
      try { logoVideo.currentTime = 0; logoVideo.play(); } catch (e) {}
      // Let the clip finish before it can retrigger, so it re-animates cleanly.
      setTimeout(function () { logoCooldown = false; }, 1600);
    };
    var onScroll = function () {
      var y = window.scrollY;
      header.classList.toggle('scrolled', y > 60);
      if (y > lastY + 40) replayLogo(); // scrolled down a bit
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    var closeBtn = menu.querySelector('.mobile-menu__close');
    var open = function () { menu.hidden = false; document.body.style.overflow = 'hidden'; };
    var close = function () { menu.hidden = true; document.body.style.overflow = ''; };
    toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) close(); });
  }

  // Reveal on scroll
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px 15% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
