"use client";

import { useEffect } from "react";

/* ── Ambient star field ─────────────────────────────────────────
   Sparse, low-opacity white dots that twinkle and bulge near the
   cursor. Fixed overlay — never intercepts clicks.
   Ported directly from the Claude Design export (assets/stars.js).
   Respects prefers-reduced-motion (static low opacity, no twinkle). */

export default function StarField() {
  useEffect(() => {
    if (document.getElementById("star-field")) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const css =
      "#star-field{position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden;}" +
      ".star{position:absolute;border-radius:50%;transform:translate(-50%,-50%) scale(var(--bulge,1));opacity:0;will-change:transform,opacity;animation:star-twinkle var(--dur,6s) ease-in-out var(--delay,0s) infinite;}" +
      ".star>span{position:absolute;inset:0;border-radius:50%;}" +
      ".star .core{background:radial-gradient(circle at 50% 45%,rgba(255,255,255,.98) 0%,rgba(255,255,255,.55) 38%,rgba(255,255,255,0) 72%);box-shadow:0 0 5px 1px rgba(255,255,255,.30);}" +
      ".star .ca{mix-blend-mode:screen;opacity:.85;}" +
      ".star .ca-r{background:radial-gradient(circle,rgba(255,46,58,.92) 0%,rgba(255,46,58,0) 64%);transform:translateX(-1.2px);}" +
      ".star .ca-b{background:radial-gradient(circle,rgba(54,168,255,.92) 0%,rgba(54,168,255,0) 64%);transform:translateX(1.2px);}" +
      "@keyframes star-twinkle{0%,100%{opacity:0;}45%,55%{opacity:var(--peak,.5);}}" +
      "@media (prefers-reduced-motion: reduce){.star{animation:none;opacity:calc(var(--peak,.5) * .6);}}";

    const style = document.createElement("style");
    style.id = "star-field-style";
    style.textContent = css;
    document.head.appendChild(style);

    const field = document.createElement("div");
    field.id = "star-field";
    field.setAttribute("aria-hidden", "true");

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    interface Star extends HTMLDivElement { _cx: number; _cy: number }
    let stars: Star[] = [];

    function build() {
      field.innerHTML = "";
      stars = [];
      const area = window.innerWidth * window.innerHeight;
      const count = Math.max(16, Math.min(46, Math.round(area / 32000)));
      for (let i = 0; i < count; i++) {
        const s = document.createElement("div") as unknown as Star;
        s.className = "star";
        const size = rnd(2.8, 5);
        s.style.width = size.toFixed(2) + "px";
        s.style.height = size.toFixed(2) + "px";
        s.style.left = rnd(2, 98).toFixed(3) + "%";
        s.style.top = rnd(2, 98).toFixed(3) + "%";
        s.style.setProperty("--peak", rnd(0.32, 0.62).toFixed(2));
        const dur = rnd(4.5, 9.5);
        s.style.setProperty("--dur", dur.toFixed(2) + "s");
        s.style.setProperty("--delay", (-rnd(0, dur)).toFixed(2) + "s");
        s.innerHTML =
          '<span class="core"></span>' +
          '<span class="ca ca-r"></span>' +
          '<span class="ca ca-b"></span>';
        field.appendChild(s);
        stars.push(s);
      }
      measure();
    }

    function measure() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      stars.forEach((s) => {
        s._cx = (parseFloat(s.style.left) / 100) * w;
        s._cy = (parseFloat(s.style.top) / 100) * h;
      });
    }

    const R = 150, MAX = 2.3;
    const CLICK_R = 260, CLICK_ADD = 3.4;
    let mx = -9999, my = -9999, bx = -9999, by = -9999, boost = 0, running = false;

    function frame() {
      running = false;
      stars.forEach((s) => {
        const dx = mx - s._cx, dy = my - s._cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        let scale = 1;
        if (d < R) { const t = 1 - d / R; scale = 1 + t * t * (MAX - 1); }
        if (boost > 0.01) {
          const cdx = bx - s._cx, cdy = by - s._cy;
          const cd = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cd < CLICK_R) { const ct = 1 - cd / CLICK_R; scale += ct * ct * CLICK_ADD * boost; }
        }
        s.style.setProperty("--bulge", scale.toFixed(3));
      });
      if (boost > 0.01) { boost *= 0.88; schedule(); }
    }

    function schedule() {
      if (!running) { running = true; requestAnimationFrame(frame); }
    }

    let rt: ReturnType<typeof setTimeout>;

    function onResize() {
      clearTimeout(rt);
      rt = setTimeout(build, 200);
    }

    document.body.appendChild(field);
    build();
    window.addEventListener("resize", onResize, { passive: true });

    if (!reduce) {
      window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; schedule(); }, { passive: true });
      window.addEventListener("mouseleave", () => { mx = my = -9999; schedule(); }, { passive: true });
      window.addEventListener("pointerdown", (e) => { bx = mx = e.clientX; by = my = e.clientY; boost = 1; schedule(); }, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", onResize);
      document.getElementById("star-field")?.remove();
      document.getElementById("star-field-style")?.remove();
    };
  }, []);

  return null;
}
