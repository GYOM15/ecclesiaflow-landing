"use client";

import { useRef, useEffect, useState } from "react";

/* ─── Person silhouette positions (5-pointed star + center) ─── */
const PEOPLE = [
  { x: 0.49, y: 0.08, color: "#6366f1", r: 0.038 },  // Star top
  { x: 0.76, y: 0.28, color: "#14b8a6", r: 0.036 },  // Star upper-right
  { x: 0.66, y: 0.73, color: "#818cf8", r: 0.036 },  // Star lower-right
  { x: 0.34, y: 0.71, color: "#14b8a6", r: 0.036 },  // Star lower-left
  { x: 0.24, y: 0.31, color: "#2dd4bf", r: 0.036 },  // Star upper-left
  { x: 0.50, y: 0.40, color: "#6366f1", r: 0.044 },  // Center (focal)
];

/* Star pentagram + center connections */
const CONNECTIONS: [number, number][] = [
  [0, 2], [2, 4], [4, 1], [1, 3], [3, 0],  // Star lines
  [5, 0], [5, 1], [5, 2], [5, 3], [5, 4],   // Center to all
];

/* Each connection has its own pulse period (staggered so they don't sync) */
const PULSE_PERIODS = CONNECTIONS.map((_, i) => 4000 + i * 700);


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

/* Point on a quadratic bezier at parameter p (0→1) */
function quadPoint(
  x0: number, y0: number,
  cx: number, cy: number,
  x1: number, y1: number,
  p: number
) {
  const m = 1 - p;
  return {
    x: m * m * x0 + 2 * m * p * cx + p * p * x1,
    y: m * m * y0 + 2 * m * p * cy + p * p * y1,
  };
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
    const startTime = performance.now();
    let w = 0;
    let h = 0;

    function resize() {
      const rect = container!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    function render() {
      if (!ctx || w === 0 || h === 0) {
        animationId = requestAnimationFrame(render);
        return;
      }
      const t = performance.now() - startTime;

      // Clear canvas (transparent — DarkBlock provides the background)
      ctx.clearRect(0, 0, w, h);

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

      // Draw connections + traveling light pulses
      for (let ci = 0; ci < CONNECTIONS.length; ci++) {
        const [from, to] = CONNECTIONS[ci];
        const p1 = positions[from];
        const p2 = positions[to];
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const wobble = reducedMotion ? 0 : Math.sin(t * 0.0003 + from * 1.3 + to * 0.7) * 10;
        const cpx = mx + wobble;
        const cpy = my - wobble * 0.6;

        // Base connection line
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(cpx, cpy, p2.x, p2.y);
        ctx.strokeStyle = p1.color;
        ctx.globalAlpha = 0.15;
        ctx.lineWidth = 0.8 + Math.sin(t * 0.0002 + from + to) * 0.1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Traveling light pulse
        if (!reducedMotion) {
          const period = PULSE_PERIODS[ci];
          const progress = (t % period) / period;

          const pulse = quadPoint(p1.x, p1.y, cpx, cpy, p2.x, p2.y, progress);

          // Outer glow
          const glow = ctx.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, 14);
          glow.addColorStop(0, p1.color + "50");
          glow.addColorStop(0.5, p1.color + "18");
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, 14, 0, Math.PI * 2);
          ctx.fill();

          // Bright white core
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p1.color;
          ctx.globalAlpha = 0.7;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // Draw people silhouettes
      for (const pos of positions) {
        drawPerson(ctx, pos.x, pos.y, pos.r, pos.color);
      }

      if (!reducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    }

    render();

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, [reducedMotion]);

  return (
    <section className="pt-16 lg:pt-20 pb-0">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white text-center mb-6">
        Votre communauté, connectée
      </h2>
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
