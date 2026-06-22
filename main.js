/* ============================================================
   Andrei Cîrcei — CV interactions (Swiss Editorial)
   1. Footer year
   2. Restrained reveal-on-scroll for sections
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Reveal on scroll */
  var targets = document.querySelectorAll(".band, .hero__lead, .hero__foot");
  if ("IntersectionObserver" in window && !reduceMotion) {
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach(function (el) { io.observe(el); });
  }
})();
