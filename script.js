/* ClarezAI_LW — Lockwood-inspired site interactions */
(function(){
  "use strict";

  // ── Hero particles: royal-blue / navy / soft-blue / white sparkles emerging
  //    from a vanishing point on the iris and rushing toward the viewer.
  //    Respects prefers-reduced-motion. (Ported from Design 2.)
  (function initHeroParticles(){
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var canvas = document.getElementById("heroParticles");
    if (!canvas) return;
    var ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    var COUNT = 100;
    var COLORS = [
      [0, 96, 192],     // royal blue (logo AI)
      [74, 144, 226],   // sky blue
      [179, 212, 240],  // soft pale blue
      [255, 255, 255]   // white sparkle
    ];
    var particles = [];

    function resize() {
      var rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function reset(p, fresh) {
      p.angle = Math.random() * Math.PI * 2;
      p.depth = fresh ? Math.random() * 0.85 : 0;
      p.speed = 0.0018 + Math.random() * 0.0055;
      p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      p.baseSize = 0.5 + Math.random() * 1.2;
    }
    function init() {
      particles.length = 0;
      for (var i = 0; i < COUNT; i++) { var p = {}; reset(p, true); particles.push(p); }
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      var ox = W * 0.55, oy = H * 0.50;
      var maxDim = Math.max(W, H);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.depth += p.speed;
        if (p.depth >= 1) { reset(p, false); }
        var t = p.depth;
        var perspective = Math.pow(t, 2.2);
        var distance = perspective * maxDim * 0.85;
        var x = ox + Math.cos(p.angle) * distance;
        var y = oy + Math.sin(p.angle) * distance;
        var radius = p.baseSize + perspective * 4;
        var alpha;
        if (t < 0.10)      alpha = t / 0.10;
        else if (t > 0.85) alpha = (1 - t) / 0.15;
        else                alpha = 1;
        alpha *= 0.8;
        if (alpha <= 0) continue;
        var c = p.color;
        var glow = radius * 5;
        var grad = ctx.createRadialGradient(x, y, 0, x, y, glow);
        grad.addColorStop(0,   "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (alpha * 0.9)  + ")");
        grad.addColorStop(0.4, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (alpha * 0.3)  + ")");
        grad.addColorStop(1,   "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, glow, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255," + (alpha * 0.95) + ")";
        ctx.beginPath(); ctx.arc(x, y, Math.max(0.5, radius * 0.45), 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(frame);
    }
    resize();
    init();
    var resizeTO;
    window.addEventListener("resize", function(){
      clearTimeout(resizeTO);
      resizeTO = setTimeout(resize, 120);
    });
    requestAnimationFrame(frame);
  })();

  // ── Peel-to-reveal cards (Why ClarezAI): tap toggles the peel on touch devices
  document.querySelectorAll(".why-card").forEach(function(card){
    card.addEventListener("click", function(){
      card.classList.toggle("is-peeled");
    });
    card.addEventListener("keydown", function(e){
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("is-peeled");
      }
    });
  });

  // ── Mobile nav toggle
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  if (toggle) {
    toggle.addEventListener("click", function(){
      nav.classList.toggle("is-open");
    });
    document.querySelectorAll(".nav__links a").forEach(function(a){
      a.addEventListener("click", function(){ nav.classList.remove("is-open"); });
    });
  }

  // ── Products dropdown — click on mobile + button, hover on desktop is CSS-only.
  //    On mobile the menu opens via data-open toggle; outside-click closes it.
  document.querySelectorAll("[data-dropdown]").forEach(function(dd){
    var btn = dd.querySelector(".nav__dropdown-toggle");
    if (!btn) return;
    btn.addEventListener("click", function(e){
      // On desktop the CSS :hover handles it; clicking just navigates to overview
      // On mobile (no hover), the click flips data-open on the wrapper
      if (window.matchMedia("(max-width: 860px)").matches) {
        e.preventDefault();
        var isOpen = dd.hasAttribute("data-open");
        if (isOpen) {
          dd.removeAttribute("data-open");
          btn.setAttribute("aria-expanded", "false");
        } else {
          dd.setAttribute("data-open", "");
          btn.setAttribute("aria-expanded", "true");
        }
      }
    });
  });
  // Outside-click closes any open dropdown on desktop too
  document.addEventListener("click", function(e){
    document.querySelectorAll("[data-dropdown][data-open]").forEach(function(dd){
      if (!dd.contains(e.target)) {
        dd.removeAttribute("data-open");
        var btn = dd.querySelector(".nav__dropdown-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // ── Scroll-reveal: fade-up elements as they enter the viewport (one-shot)
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en, i){
        if (en.isIntersecting) {
          setTimeout(function(){ en.target.classList.add("is-in"); }, Math.min(i*70, 280));
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("is-in"); });
  }

  // ── Replay observer: toggles .in-view as a section enters/leaves the
  //    viewport so the kicker-light + underline-sweep animations re-fire
  //    every time the user returns to the section.
  var replayEls = document.querySelectorAll(".replay-anim");
  if ("IntersectionObserver" in window && replayEls.length) {
    var replayIo = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) {
          en.target.classList.remove("in-view");
          // force reflow so the animation restarts cleanly
          void en.target.offsetWidth;
          en.target.classList.add("in-view");
        } else {
          en.target.classList.remove("in-view");
        }
      });
    }, { threshold: 0.3, rootMargin: "0px 0px -10% 0px" });
    replayEls.forEach(function(el){ replayIo.observe(el); });
  }

  // ── Smooth-scroll offset for sticky nav
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener("click", function(e){
      var hash = a.getAttribute("href");
      if (hash === "#" || hash.length < 2) return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      var navH = nav ? nav.offsetHeight : 0;
      var y = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
})();
