"use client";

import { useEffect, useRef } from "react";

const GAP = 28; // px between dots
const REACH = 160; // px radius of the pointer highlight

/**
 * Decorative hero background: a dot grid that lights up around the pointer and
 * an accent glow that eases toward it. Pure canvas, no animation library.
 * Only redraws while something is moving; static when the user prefers
 * reduced motion.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    const host = canvas?.closest("section");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !glow || !host || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let raf = 0;
    let active = false; // pointer is over the hero
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    const moveGlow = () => {
      glow.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
    };

    const draw = () => {
      const css = getComputedStyle(document.documentElement);
      const base = css.getPropertyValue("--fg").trim() || "#fff";
      const accent = css.getPropertyValue("--accent").trim() || "#f0a";

      ctx.clearRect(0, 0, width, height);
      for (let x = GAP / 2; x < width; x += GAP) {
        for (let y = GAP / 2; y < height; y += GAP) {
          const near = active
            ? Math.max(0, 1 - Math.hypot(x - pos.x, y - pos.y) / REACH)
            : 0;
          ctx.globalAlpha = 0.14 + near * 0.75;
          ctx.fillStyle = near > 0.04 ? accent : base;
          ctx.beginPath();
          ctx.arc(x, y, 1 + near * 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      moveGlow();
      draw();
      const settled =
        Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (reduceMotion.matches) return;
      const rect = host.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      active = true;
      kick();
    };

    const onLeave = () => {
      active = false;
      kick();
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!active) {
        // Resting spot for the glow: behind the terminal.
        target.x = pos.x = width * 0.78;
        target.y = pos.y = height * 0.4;
      }
      moveGlow();
      draw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full [mask-image:radial-gradient(ellipse_42%_58%_at_30%_50%,transparent_25%,black_85%)]"
      />
      <div
        ref={glowRef}
        className="absolute top-0 left-0 size-130 rounded-full bg-radial from-accent/16 to-transparent to-65%"
      />
    </div>
  );
}
