"use client";

import { useEffect, useRef } from "react";

/*
 * Lightweight oscilloscope-style waveform sweep drawn onto a canvas,
 * layered behind the Hero as a hardware-engineer aesthetic.
 * Pure canvas drawing (no DOM text) keeps SSR output static and
 * hydration-safe. Respects prefers-reduced-motion.
 */
export function HeroWaveform() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const streams = [
      { freq: 1, amp: 0.16, phase: 0.0, speed: 0.012, alpha: 0.5, rgb: "6,182,212" },
      { freq: 2.3, amp: 0.1, phase: 1.7, speed: 0.02, alpha: 0.35, rgb: "16,185,129" },
      { freq: 0.7, amp: 0.22, phase: 3.1, speed: 0.008, alpha: 0.3, rgb: "148,163,184" },
    ];

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;
    const draw = () => {
      if (reduce) {
        t = 120;
      }
      t += reduce ? 0 : 1;
      ctx.clearRect(0, 0, width, height);

      for (const s of streams) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const px = ((x / width) * 20 + t * s.speed + s.phase) % 20;
          const y =
            height / 2 +
            Math.sin(px * Math.PI * 2 * s.freq) * height * s.amp * Math.exp(-s.freq * 0.25);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${s.rgb},${s.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (reduce) return;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5 }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(to bottom, rgba(6,182,212,0.05) 0px, rgba(6,182,212,0.05) 1px, transparent 1px, transparent 3px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
