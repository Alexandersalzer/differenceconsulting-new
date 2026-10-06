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

  // Menu — one dropdown at every breakpoint. The hamburger is the only
  // navigation control on the page, so aria-expanded has to track its real
  // state and focus has to return to it on close.
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    var closeBtn = menu.querySelector('.mobile-menu__close');
    var open = function () {
      menu.hidden = false;
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
      if (closeBtn) closeBtn.focus();
    };
    var close = function (returnFocus) {
      menu.hidden = true;
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
      // Only pull focus back on a deliberate close, not when following a link.
      if (returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', function () { close(true); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { close(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) close(true);
    });
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

  // Rickson: schackbilden i .turn fäster 2rem från viewportens topp medan
  // texten scrollar, och stannar inom .turn__media. Desktop only (>= 900px).
  // Byter bara klass (fixed / absolute) — webbläsaren håller bilden still,
  // så den laggar inte efter scrollen som en transform gör.
  var turnMedia = document.querySelector('.turn__media');
  var turnSticky = document.querySelector('.turn__sticky');
  if (turnMedia && turnSticky) {
    var turnDesktop = window.matchMedia('(min-width: 900px)');
    var turnState = '';
    var setTurnState = function (state) {
      if (state === turnState) return;
      turnState = state;
      turnSticky.classList.toggle('is-fixed', state === 'fixed');
      turnSticky.classList.toggle('is-bottom', state === 'bottom');
    };
    var updateTurn = function () {
      if (!turnDesktop.matches) { setTurnState(''); turnSticky.style.left = turnSticky.style.width = ''; return; }
      var offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2;
      var rect = turnMedia.getBoundingClientRect();
      var h = turnSticky.offsetHeight;
      if (rect.top > offset) setTurnState('');
      else if (rect.bottom - h < offset) setTurnState('bottom');
      else setTurnState('fixed');
      // Fixed tar bilden ur kolumnen — ge den kolumnens bredd och vänsterkant.
      turnSticky.style.left = turnState === 'fixed' ? rect.left + 'px' : '';
      turnSticky.style.width = turnState === 'fixed' ? rect.width + 'px' : '';
    };
    window.addEventListener('scroll', updateTurn, { passive: true });
    window.addEventListener('resize', updateTurn);
    updateTurn();
  }

  // Rickson / Ombyggnaden: muren och byggstenarna.
  // Muren — varje rad skalas så att den fyller exakt containerbredden
  // (desktop), eller staplas med BORING i full bredd (mobil). Byggstenarna
  // tänds en i taget.
  var brick = document.querySelector('.rk-brick:not(.rk-brick--flow)');
  var bricks = document.querySelectorAll('.rk-brick');
  if (bricks.length) {
    var brickLines = brick ? brick.querySelectorAll('.rk-brick__line') : [];
    var brickStack = window.matchMedia('(max-width: 599px)');
    var fitOne = function (block) {
      var width = block.clientWidth;
      if (!width) return;
      var lines = block.querySelectorAll('.rk-brick__line');
      var flow = block.classList.contains('rk-brick--flow');
      lines.forEach(function (line) { line.style.fontSize = '100px'; });
      if (brickStack.matches && !flow) {
        // Samma storlek för alla ord: det bredaste ordet fyller bredden.
        var widest = 0;
        block.querySelectorAll('.rk-brick__line > span').forEach(function (w) {
          var r = document.createRange(); r.selectNodeContents(w);
          widest = Math.max(widest, r.getBoundingClientRect().width);
        });
        var size = widest ? 100 * width / widest : 100;
        lines.forEach(function (line) { line.style.fontSize = size + 'px'; });
      } else {
        // Två varv: textbredd skalar inte helt linjärt med storleken
        // (kerning, avrundning), så andra varvet rättar de sista pixlarna.
        for (var pass = 0; pass < 2; pass++) {
          lines.forEach(function (line) {
            var r = document.createRange(); r.selectNodeContents(line);
            var natural = r.getBoundingClientRect().width;
            var current = parseFloat(line.style.fontSize) || 100;
            if (natural) line.style.fontSize = (current * width / natural) + 'px';
          });
        }
      }
    };
    var fitBrick = function () { bricks.forEach(fitOne); };
    var moveBrick = function () {
      if (!brick || reducedMotion || brickStack.matches) {
        brickLines.forEach(function (line) { line.style.transform = ''; });
        return;
      }
      var r = brick.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 när muren kommer in underifrån, 1 när den lämnat upptill.
      var t = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      var shift = (t - 0.5) * 6; // −3 % … +3 %, exakt i linje mitt i skärmen
      if (brickLines[0]) brickLines[0].style.transform = 'translateX(' + (-shift) + '%)';
      if (brickLines[1]) brickLines[1].style.transform = 'translateX(' + shift + '%)';
    };
    var brickTicking = false;
    var onBrickScroll = function () {
      if (brickTicking) return;
      brickTicking = true;
      window.requestAnimationFrame(function () { brickTicking = false; moveBrick(); });
    };
    var refitBrick = function () { fitBrick(); moveBrick(); };
    window.addEventListener('scroll', onBrickScroll, { passive: true });
    window.addEventListener('resize', refitBrick);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refitBrick);
    refitBrick();
  }

  // Scroll-driven word reveal: delarna i varje .reveal-seq tonar upp en i
  // taget medan blocket rör sig från 85 % till 40 % av skärmhöjden. Varje
  // del får --lit 0–1 (mjuk övergång), och is-lit när den är helt tänd.
  var seqs = document.querySelectorAll('.reveal-seq');
  if (seqs.length) {
    var lightSeqs = function () {
      var vh = window.innerHeight;
      // Längst ner på sidan kan blocket inte scrolla högre — då tänds allt.
      var atEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 2;
      seqs.forEach(function (seq) {
        var parts = seq.children, n = parts.length;
        if (reducedMotion || atEnd) { for (var i = 0; i < n; i++) { parts[i].style.setProperty('--lit', 1); parts[i].classList.add('is-lit'); } return; }
        var p = (vh * 0.85 - seq.getBoundingClientRect().top) / (vh * 0.45);
        p = Math.max(0, Math.min(1, p)) * n;
        for (var k = 0; k < n; k++) {
          var lit = Math.max(0, Math.min(1, p - k));
          parts[k].style.setProperty('--lit', lit.toFixed(3));
          parts[k].classList.toggle('is-lit', lit >= 1);
        }
      });
    };
    var seqTicking = false;
    window.addEventListener('scroll', function () {
      if (seqTicking) return;
      seqTicking = true;
      window.requestAnimationFrame(function () { seqTicking = false; lightSeqs(); });
    }, { passive: true });
    window.addEventListener('resize', lightSeqs);
    lightSeqs();
  }

  // Differencismen: meny där texten skiftar vid hover. Varje rads text
  // klonas till fältet till höger; den hovrade radens text visas där.
  document.querySelectorAll('.paths--text').forEach(function (menu) {
    var field = menu.querySelector('.paths__field--text');
    if (!field) return;
    var panels = [];
    menu.querySelectorAll('.path').forEach(function (row, i) {
      var detail = row.querySelector('.path__detail');
      if (!detail) return;
      var panel = detail.cloneNode(true);
      panel.className = 'paths__panel body stack-sm' + (i === 0 ? ' is-active' : '');
      panel.setAttribute('data-for', row.getAttribute('data-path'));
      field.appendChild(panel);
      panels.push(panel);
      var show = function () {
        panels.forEach(function (p) { p.classList.toggle('is-active', p === panel); });
      };
      row.addEventListener('mouseenter', show);
      row.addEventListener('focus', show);
    });
  });
})();
