/* Difference Consulting - shared interactions
   Quiet, slow, deliberate. Respects reduced-motion. */
(function () {
  // Mark that JS is running, so the CSS fade-in only applies when we can
  // actually add .is-loaded. Set first thing to avoid a flash.
  document.documentElement.classList.add('js');

  // Fade each image in once it has decoded - no half-drawn pop-in.
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

  // Sticky header hairline + replay the logo animation on downward scroll.
  var header = document.querySelector('.site-header');
  var logoAnim = document.querySelector('.site-header .logo__lockup');
  if (header) {
    var lastY = window.scrollY;
    var logoCooldown = false;
    var replayLogo = function () {
      if (!logoAnim || reducedMotion || logoCooldown) return;
      logoCooldown = true;
      // Restart the CSS letter animation: drop the class, force a reflow, add it back.
      logoAnim.classList.remove('is-playing');
      void logoAnim.offsetWidth;
      logoAnim.classList.add('is-playing');
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

  // Menu - one dropdown at every breakpoint. The hamburger is the only
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

  // Tjänster: the image field follows whichever path is hovered. Desktop only -
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

  // Rickson / Ombyggnaden: muren och byggstenarna.
  // Muren - varje rad skalas så att den fyller exakt containerbredden
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
      var halves = block.querySelectorAll('.rk-brick__half');
      halves.forEach(function (h) { h.style.fontSize = ''; });
      lines.forEach(function (line) { line.style.fontSize = '100px'; });
      if (brickStack.matches && !flow && halves.length) {
        // Mobil: varje halva (BRICKBY, BORINGBRICK. …) fyller bredden.
        for (var hp = 0; hp < 2; hp++) {
          halves.forEach(function (h) {
            var r = document.createRange(); r.selectNodeContents(h);
            var natural = r.getBoundingClientRect().width;
            var current = parseFloat(h.style.fontSize) || 100;
            if (natural) h.style.fontSize = (current * width / natural) + 'px';
          });
        }
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
      // Längst ner på sidan kan blocket inte scrolla högre - då tänds allt.
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

  // Sidomenyn: undersidor som dropdown. Den aktiva gruppen är öppen från
  // start. Pilen öppnar/stänger (klick), en grupp i taget utöver den
  // aktiva. På enheter med mus öppnas gruppen också vid hover.
  var menuGroups = document.querySelectorAll('.menu-group');
  if (menuGroups.length) {
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    var setOpen = function (group, open) {
      group.classList.toggle('is-open', open);
      if (!open) group.dataset.pinned = '';
      var btn = group.querySelector('.menu-group__toggle');
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    var isActive = function (group) { return !!group.querySelector('.link-row.is-current, .link-row.is-parent'); };
    var closeOthers = function (keep) {
      menuGroups.forEach(function (g) { if (g !== keep && !isActive(g)) setOpen(g, false); });
    };
    menuGroups.forEach(function (group) {
      var btn = group.querySelector('.menu-group__toggle');
      // Klick på pilen: öppen via hover/fokus → lås öppen; låst öppen → stäng;
      // stängd → öppna och lås.
      if (btn) btn.addEventListener('click', function () {
        var open = group.classList.contains('is-open');
        if (open && !group.dataset.pinned && !isActive(group)) { group.dataset.pinned = '1'; return; }
        if (open) { setOpen(group, false); return; }
        closeOthers(group);
        setOpen(group, true);
        group.dataset.pinned = '1';
      });
      // Hover med liten fördröjning (intent), så att grupper inte blinkar
      // upp och stängs när musen bara passerar över raderna.
      var hoverTimer;
      group.addEventListener('mouseenter', function () {
        if (!canHover.matches) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function () { closeOthers(group); setOpen(group, true); }, 140);
      });
      group.addEventListener('mouseleave', function () {
        clearTimeout(hoverTimer);
        if (!canHover.matches || isActive(group) || group.dataset.pinned) return;
        hoverTimer = setTimeout(function () { setOpen(group, false); }, 220);
      });
      // Tangentbord: fokus (inte klick/tryck) öppnar gruppen.
      group.addEventListener('focusin', function (e) {
        if (!e.target.matches(':focus-visible')) return;
        closeOthers(group); setOpen(group, true);
      });
    });
  }
  // Hero-logotypen: en översättning av Claude Design-filen logo-scene.jsx
  // (animations-v3). Allt ritas som en ren funktion av den författade tiden T,
  // precis som i originalet: romb → kvadrat → D → bruten D + spik → ordmärket
  // bokstav för bokstav → håll → allt tillbaka, i en loop på 13 s.
  var heroLogo = document.querySelector('.hero-logo');
  if (heroLogo) (function () {
    var stage = heroLogo.querySelector('.hero-logo__stage');
    var markEl = heroLogo.querySelector('.hero-logo__mark');
    var textEl = heroLogo.querySelector('.hero-logo__text');
    var rot = heroLogo.querySelector('.hl-rot');
    var ring = heroLogo.querySelector('.hl-ring');
    var broken = heroLogo.querySelector('.hl-broken');
    var ghosts = heroLogo.querySelectorAll('.hl-ghost');
    var spike = heroLogo.querySelector('.hl-spike');
    var letters = textEl.querySelectorAll('span');

    // Scenlistan från filen: dur = uppspelad längd, nat = författad längd.
    var SCENES = [
      ['Romb', 1.2], ['ToSquare', 1], ['ToD', 1, 1], ['ToBroken', 0.7, 0.9],
      ['SpikeIn', 1, 1], ['TextIn', 1], ['Hold', 2.8, 1.4], ['TextOut', 0.8],
      ['SpikeOut', 0.8], ['ToDBack', 0.7, 0.9], ['ToSquareBack', 1], ['ToRombBack', 1]
    ];
    var CUES = {}, sections = [], play = 0, auth = 0;
    SCENES.forEach(function (sc) {
      var nat = sc[2] || sc[1];
      sections.push({ playStart: play, dur: sc[1], authStart: auth, nat: nat });
      if (!(sc[0] in CUES)) CUES[sc[0]] = auth;
      play += sc[1]; auth += nat;
    });
    var TOTAL = play, AUTH_TOTAL = auth;
    var warp = function (t) {
      var s = sections[sections.length - 1];
      for (var i = 0; i < sections.length; i++) {
        if (t < sections[i].playStart + sections[i].dur) { s = sections[i]; break; }
      }
      var local = Math.min(Math.max(t - s.playStart, 0), s.dur);
      return Math.min(s.authStart + local * (s.nat / s.dur), AUTH_TOTAL);
    };

    var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
    var E = {
      cubicIO: function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
      cubicO: function (t) { return (--t) * t * t + 1; },
      cubicI: function (t) { return t * t * t; },
      sineIO: function (t) { return -(Math.cos(Math.PI * t) - 1) / 2; }
    };
    var anim = function (from, to, start, end, ease, T) {
      if (T <= start) return from;
      if (T >= end) return to;
      return from + (to - from) * ease((T - start) / (end - start));
    };

    var SPIKE_D = 'M2900 1474.01H2992.62C3155.22 1349.14 3335.65 1220.16 3470.81 1125.49C3671.83 971.12 3806.3 849 3806.3 849C3806.3 849 3438.95 1007.17 3219.02 1137.15C3090.88 1212.88 2961.75 1291.51 2900 1345.71V1474.01Z';
    var DX = -2197, DY = 1446;
    var SQ = { x: 3028, y: 890, w: 543, h: 515 };
    var CX = SQ.x + SQ.w / 2, CY = SQ.y + SQ.h / 2;
    var SW = 140, HW = SW / 2, MAX_ROUT = SQ.h / 2 + HW;
    var GAP = 40, MARK = 420, SCALE = MARK / 1300;
    spike.setAttribute('d', SPIKE_D);
    ghosts.forEach(function (g) { g.setAttribute('d', SPIKE_D); });

    var rr = function (x, y, w, h, rT, rB) {
      rT = clamp(rT, 0, h / 2); rB = clamp(rB, 0, h / 2);
      var top = rT <= 0.01 ? ' H' + (x + w) : ' H' + (x + w - rT) + ' A' + rT + ',' + rT + ' 0 0 1 ' + (x + w) + ',' + (y + rT);
      var bot = rB <= 0.01 ? ' V' + (y + h) : ' V' + (y + h - rB) + ' A' + rB + ',' + rB + ' 0 0 1 ' + (x + w - rB) + ',' + (y + h);
      return 'M' + x + ',' + y + top + bot + ' H' + x + ' Z';
    };
    var ringPath = function (oT, oB) {
      oT = clamp(oT, 0, MAX_ROUT); oB = clamp(oB, 0, MAX_ROUT);
      return rr(SQ.x - HW, SQ.y - HW, SQ.w + SW, SQ.h + SW, oT, oB) + ' ' +
             rr(SQ.x + HW, SQ.y + HW, SQ.w - SW, SQ.h - SW, Math.max(oT - SW, 0), Math.max(oB - SW, 0));
    };

    var textWidth = 0;
    var measure = function () {
      textWidth = textEl.scrollWidth;
      stage.style.setProperty('--hl-s', heroLogo.clientWidth / 1920);
    };

    var n = letters.length;
    var letterReveal = function (i, T) {
      var es0 = CUES.TextIn, ee0 = CUES.Hold, span = ee0 - es0;
      var d = Math.min(0.4, span * 0.5), st = (span - d) / (n - 1);
      if (T <= ee0) return anim(0, 1, es0 + i * st, es0 + i * st + d, E.cubicO, T);
      if (T <= CUES.TextOut) return 1;
      var xs0 = CUES.TextOut, xspan = CUES.SpikeOut - xs0;
      var xd = Math.min(0.4, xspan * 0.5), xst = (xspan - xd) / (n - 1);
      var xs = xs0 + (n - 1 - i) * xst;
      return anim(1, 0, xs, xs + xd, E.cubicI, T);
    };

    var render = function (T) {
      var angle = T <= CUES.ToSquare ? 405
        : T <= CUES.ToD ? anim(405, 0, CUES.ToSquare, CUES.ToD, E.cubicIO, T)
        : T <= CUES.ToRombBack ? 0
        : anim(0, 405, CUES.ToRombBack, AUTH_TOTAL, E.cubicIO, T);
      var cornerR = function (lag) {
        if (T <= CUES.ToD) return 0;
        if (T <= CUES.ToBroken) {
          var sp = CUES.ToBroken - CUES.ToD;
          return anim(0, MAX_ROUT, CUES.ToD + sp * lag, CUES.ToD + sp * (0.8 + lag), E.sineIO, T);
        }
        if (T <= CUES.ToSquareBack) return MAX_ROUT;
        if (T <= CUES.ToRombBack) {
          var sp2 = CUES.ToRombBack - CUES.ToSquareBack;
          return anim(MAX_ROUT, 0, CUES.ToSquareBack + sp2 * lag, CUES.ToSquareBack + sp2 * (0.8 + lag), E.sineIO, T);
        }
        return 0;
      };
      var cross = T <= CUES.ToBroken ? 0
        : T <= CUES.SpikeIn ? anim(0, 1, CUES.ToBroken, CUES.SpikeIn, E.cubicIO, T)
        : T <= CUES.ToDBack ? 1
        : anim(1, 0, CUES.ToDBack, CUES.ToSquareBack, E.cubicIO, T);
      var spikeT = T <= CUES.SpikeIn ? 0
        : T <= CUES.TextIn ? anim(0, 1, CUES.SpikeIn, CUES.TextIn, E.cubicO, T)
        : T <= CUES.SpikeOut ? 1
        : anim(1, 0, CUES.SpikeOut, CUES.ToDBack, E.cubicIO, T);
      var presence = T <= CUES.TextIn ? 0
        : T <= CUES.Hold ? anim(0, 1, CUES.TextIn, CUES.Hold, E.cubicO, T)
        : T <= CUES.TextOut ? 1
        : anim(1, 0, CUES.TextOut, CUES.SpikeOut, E.cubicIO, T);
      var settle = T <= CUES.ToBroken ? 1.02
        : T <= CUES.SpikeIn ? anim(1.02, 1, CUES.ToBroken, CUES.SpikeIn, E.cubicO, T) : 1;
      var breathe = 1 + 0.008 * Math.sin(T * 1.3);

      rot.setAttribute('transform', 'rotate(' + angle + ' ' + CX + ' ' + CY + ')');
      ring.setAttribute('d', ringPath(cornerR(0), cornerR(0.2)));
      ring.setAttribute('opacity', 1 - cross);
      broken.setAttribute('opacity', cross);
      broken.setAttribute('transform', 'translate(' + (CX * (1 - settle)) + ' ' + (CY * (1 - settle)) + ') scale(' + settle + ')');

      for (var gi = 1; gi <= ghosts.length; gi++) {
        var lagT = clamp(spikeT - gi * 0.07, 0, 1);
        var birth = clamp((spikeT - gi * 0.07) / 0.08, 0, 1);
        var death = 1 - clamp((T - (CUES.TextIn - 0.5 - gi * 0.09)) / 0.18, 0, 1);
        var tt = clamp(lagT + (1 - death) * 0.05, 0, 1);
        var s = 1 + gi * 0.012;
        var g = ghosts[gi - 1];
        g.setAttribute('opacity', clamp(birth * death, 0, 1) * 0.3 * (1 - gi / (ghosts.length + 1)));
        g.setAttribute('transform', 'translate(' + DX * (1 - tt) + ' ' + DY * (1 - tt) + ') translate(3353 1161) scale(' + s + ') translate(-3353 -1161)');
      }
      spike.setAttribute('opacity', clamp(spikeT * 3, 0, 1));
      spike.setAttribute('transform', 'translate(' + DX * (1 - spikeT) + ' ' + DY * (1 - spikeT) + ')');

      var offset = ((2900 + 3806.3) / 2 - 3300) * SCALE;
      var visW = (3806.3 - 2900) * SCALE;
      var shift = ((MARK / 2 - visW / 2) + offset + GAP + textWidth) / 2 * presence;
      markEl.style.transform = 'translateX(' + (-shift) + 'px) scale(' + breathe + ')';
      textEl.style.transform = 'translateY(-50%) translateX(' + (-shift) + 'px)';
      for (var i = 0; i < n; i++) {
        var r = letterReveal(i, T);
        letters[i].style.opacity = r;
        letters[i].style.transform = 'translateY(' + (1 - r) * 10 + 'px)';
      }
    };

    measure();
    window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

    // Reducerad rörelse: hela lockupen står still.
    if (reducedMotion) { render(CUES.Hold + 0.7); return; }

    // Loopen går bara när logotypen syns - ingen CPU i onödan.
    var raf = null, elapsed = 0, last = null;
    var tick = function (ts) {
      if (last !== null) elapsed = (elapsed + (ts - last) / 1000) % TOTAL;
      last = ts;
      render(warp(elapsed));
      raf = requestAnimationFrame(tick);
    };
    var start = function () { if (raf === null) { last = null; raf = requestAnimationFrame(tick); } };
    var stop = function () { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } };
    render(0);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
      }).observe(heroLogo);
    } else start();
  })();
})();
