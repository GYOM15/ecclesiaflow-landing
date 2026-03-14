"use client";

import { useRef, useEffect, useState } from "react";

/* ─── Person silhouette positions ─── */
const PEOPLE = [
  { x: 0.12, y: 0.22, color: "#6366f1", r: 0.034 },
  { x: 0.42, y: 0.14, color: "#14b8a6", r: 0.042 },
  { x: 0.78, y: 0.25, color: "#6366f1", r: 0.038 },
  { x: 0.25, y: 0.65, color: "#14b8a6", r: 0.044 },
  { x: 0.60, y: 0.58, color: "#818cf8", r: 0.040 },
  { x: 0.88, y: 0.70, color: "#2dd4bf", r: 0.032 },
];

/* Triangulated mesh connections (source → target) */
const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 4],
  [2, 5], [3, 4], [4, 5], [0, 4], [1, 3], [3, 5],
];

/* Background dots — scattered star field */
const BG_DOTS = [
  ...Array.from({ length: 10 }, (_, i) => ({
    x: 0.05 + Math.sin(i * 2.3) * 0.4 + 0.45,
    y: 0.08 + Math.cos(i * 1.7) * 0.35 + 0.42,
    r: 2.5 + (i % 3) * 0.8,
    color: "rgba(129,140,248,0.22)",
  })),
  { x: 0.35, y: 0.45, r: 3.5, color: "rgba(244,63,94,0.20)" },
  { x: 0.72, y: 0.82, r: 3.5, color: "rgba(244,63,94,0.20)" },
];

function drawPerson(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string
) {
  // Head
  const headR = r * 0.38;
  ctx.beginPath();
  ctx.arc(cx, cy - r * 0.25, headR, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  // Shoulders
  const shoulderW = r * 0.9;
  const shoulderH = r * 0.55;
  const shoulderY = cy + r * 0.15;
  ctx.beginPath();
  ctx.ellipse(cx, shoulderY + shoulderH * 0.3, shoulderW, shoulderH, 0, Math.PI, 0);
  ctx.fill();
}

export function CommunityConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let startTime = performance.now();

    function resize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function render() {
      if (!canvas || !ctx || !container) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const t = performance.now() - startTime;

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, "#1e293b");
      bgGrad.addColorStop(1, "#0f172a");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Background dots
      for (const dot of BG_DOTS) {
        ctx.beginPath();
        ctx.arc(dot.x * w, dot.y * h, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      // Compute current positions with brownian wobble
      const positions = PEOPLE.map((p, i) => {
        const wobbleX = reducedMotion ? 0 : Math.sin(t * 0.0004 + i * 1.7) * 8 + Math.sin(t * 0.00025 + i * 2.3) * 5;
        const wobbleY = reducedMotion ? 0 : Math.cos(t * 0.00035 + i * 2.1) * 8 + Math.cos(t * 0.0002 + i * 1.5) * 5;
        return {
          x: p.x * w + wobbleX,
          y: p.y * h + wobbleY,
          color: p.color,
          r: p.r * Math.min(w, h),
        };
      });

      // Draw connections (quadratic curves with wobble)
      for (const [from, to] of CONNECTIONS) {
        const p1 = positions[from];
        const p2 = positions[to];
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const wobble = reducedMotion ? 0 : Math.sin(t * 0.0003 + from * 1.3 + to * 0.7) * 10;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(mx + wobble, my - wobble * 0.6, p2.x, p2.y);
        ctx.strokeStyle = p1.color;
        ctx.globalAlpha = 0.18;
        ctx.lineWidth = 0.8 + Math.sin(t * 0.0002 + from + to) * 0.1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw people silhouettes
      for (const pos of positions) {
        drawPerson(ctx, pos.x, pos.y, pos.r, pos.color);
      }

      // Bottom text
      ctx.font = `${Math.max(14, w * 0.018)}px system-ui, -apple-system, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(226,232,240,0.3)";
      ctx.fillText("Votre communauté, connectée", w / 2, h * 0.92);

      if (!reducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    }

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <section className="py-0 bg-slate-50">
      <div
        ref={containerRef}
        className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] overflow-hidden rounded-none"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
