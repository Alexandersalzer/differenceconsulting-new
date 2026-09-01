/* Difference Consulting — shared interactions
   Quiet, slow, deliberate. Respects reduced-motion. */
(function () {
  // Mark that JS is running, so the CSS fade-in only applies when we can
  // actually add .is-loaded. Set first thing to avoid a flash.
  document.documentElement.classList.add('js');

  // Fade each image in once it has decoded — no half-drawn pop-in.
  var markLoaded = function (img) { img.classList.add('is-loaded'); };
  var initImages = function () {
    document.querySelectorAll('.media img, .home-feature__media img, .home-feature__frame img, .vb__figure-media img, .vc__bleed-media img, .vc__offset-media img').forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) { markLoaded(img); return; }
      img.addEventListener('load', function () { markLoaded(img); });
      img.addEventListener('error', function () { markLoaded(img); });
    });
  };
  initImages();

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
      // Fire well before the section reaches the viewport (roughly one screen
      // ahead) so the fade is done by the time it is actually on screen.
    }, { threshold: 0, rootMargin: '0px 0px 90% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Tjänster: the image field follows whichever path is hovered. Desktop only —
  // the field is display:none below 980px, so this is a no-op on mobile.
  var pathList = document.querySelector('.paths__list');
  var pathImgs = document.querySelectorAll('.paths__img');
  if (pathList && pathImgs.length) {
    var showPath = function (name) {
      pathImgs.forEach(function (img) {
        img.classList.toggle('is-active', img.getAttribute('data-for') === name);
      });
    };
    document.querySelectorAll('.path').forEach(function (a) {
      var name = a.getAttribute('data-path');
      a.addEventListener('mouseenter', function () { showPath(name); });
      // Keyboard users get the same cue.
      a.addEventListener('focus', function () { showPath(name); });
    });
  }
})();
