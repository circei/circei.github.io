/* ============================================================
   Andrei Circei — CV interactions
   1. Generative oscilloscope "signal" trace behind the hero
   2. Reveal-on-scroll for sections
   3. Footer year
   ============================================================ */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Reveal on scroll ---- */
  const revealTargets = document.querySelectorAll(".band, .hero__inner");
  if ("IntersectionObserver" in window && !reduceMotion) {
    revealTargets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  }

  /* ---- Hero signal trace ---- */
  const canvas = document.querySelector(".hero__signal");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const COLORS = {
    accent: "#E6A14B",
    teal: "#4FA38C",
    grid: "#1B2D30",
  };

  let w = 0,
    h = 0,
    dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduceMotion) drawStatic();
  }

  // A summed set of travelling sine waves — reads as an instrument trace.
  const waves = [
    { amp: 0.16, freq: 1.4, speed: 0.55, phase: 0 },
    { amp: 0.09, freq: 3.1, speed: -0.9, phase: 1.2 },
    { amp: 0.05, freq: 6.7, speed: 1.6, phase: 2.7 },
  ];

  function signalAt(x, t) {
    // x in [0,1]; returns offset in [-1,1]-ish
    let y = 0;
    for (const wv of waves) {
      y += wv.amp * Math.sin((x * wv.freq * Math.PI * 2) + wv.phase + t * wv.speed);
    }
    // envelope so the trace settles toward the edges
    const env = Math.sin(x * Math.PI);
    return y * (0.55 + 0.45 * env);
  }

  function drawGrid() {
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    const step = Math.max(48, w / 16);
    ctx.beginPath();
    for (let x = 0; x <= w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = 0; y <= h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
  }

  function drawTrace(t, color, offset, lineWidth, alpha) {
    const mid = h * 0.5;
    const scale = h * 0.32;
    ctx.beginPath();
    const steps = Math.max(80, Math.floor(w / 6));
    for (let i = 0; i <= steps; i++) {
      const x = i / steps;
      const px = x * w;
      const py = mid + signalAt(x, t + offset) * scale;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    const t = now * 0.0006;
    ctx.clearRect(0, 0, w, h);
    drawGrid();
    drawTrace(t, COLORS.teal, 0.6, 1.5, 0.35);
    drawTrace(t, COLORS.accent, 0, 2.2, 0.95);
    rafId = requestAnimationFrame(frame);
  }

  function drawStatic() {
    ctx.clearRect(0, 0, w, h);
    drawGrid();
    drawTrace(0.4, COLORS.teal, 0.6, 1.5, 0.3);
    drawTrace(0.4, COLORS.accent, 0, 2.2, 0.9);
  }

  let rafId = null;
  resize();
  window.addEventListener("resize", resize, { passive: true });

  if (!reduceMotion) {
    rafId = requestAnimationFrame(frame);
    // Pause when the hero scrolls out of view to save cycles.
    if ("IntersectionObserver" in window) {
      const heroIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && rafId === null) {
            rafId = requestAnimationFrame(frame);
          } else if (!e.isIntersecting && rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        });
      });
      heroIO.observe(canvas);
    }
  }
})();
