"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Users } from "lucide-react";

/* ─── 9 silhouettes — positions, sizes, colors ─── */
const PEOPLE = [
  { x: 0.08, y: 0.18, r: 0.072, colL: [94, 234, 212],  col: [20, 184, 166] },
  { x: 0.30, y: 0.06, r: 0.078, colL: [165, 180, 252], col: [99, 102, 241] },
  { x: 0.52, y: 0.12, r: 0.085, colL: [94, 234, 212],  col: [20, 184, 166] },
  { x: 0.80, y: 0.05, r: 0.072, colL: [165, 180, 252], col: [99, 102, 241] },
  { x: 0.14, y: 0.50, r: 0.09,  colL: [165, 180, 252], col: [99, 102, 241] },
  { x: 0.42, y: 0.44, r: 0.098, colL: [94, 234, 212],  col: [20, 184, 166] },
  { x: 0.68, y: 0.40, r: 0.078, colL: [129, 140, 248], col: [99, 102, 241] },
  { x: 0.90, y: 0.34, r: 0.085, colL: [45, 212, 191],  col: [20, 184, 166] },
  { x: 0.50, y: 0.80, r: 0.075, colL: [165, 180, 252], col: [99, 102, 241] },
];

/* Mobile: hide indices 3, 7, 8 → show 6 silhouettes */
const MOBILE_HIDDEN = new Set([3, 7, 8]);

/* ─── 20 connections — triangulated mesh ─── */
const CONNECTIONS: [number, number][] = [
  // top row
  [0, 1], [1, 2], [2, 3],
  // top → middle crossings
  [0, 4], [1, 4], [1, 5], [2, 5],
  // top → right crossings
  [2, 6], [3, 6], [3, 7],
  // middle row
  [4, 5], [5, 6], [6, 7],
  // down connections
  [5, 8], [6, 8], [4, 8],
  // long diagonals
  [0, 5], [2, 7], [1, 6],
  // right → lowest
  [7, 8],
];

/* ─── 18 decorative background circles (static, random positions) ─── */
interface Dot {
  x: number;
  y: number;
  r: number;
  color: [number, number, number];
  opacity: number;
}

function generateDots(): Dot[] {
  const dots: Dot[] = [];
  const rng = (min: number, max: number, seed: number) => {
    // Deterministic-ish with seed for SSR consistency fallback
    const v = Math.abs(Math.sin(seed * 9301 + 49297) % 1);
    return min + v * (max - min);
  };
  let s = 0;
  const push = (color: [number, number, number]) => {
    s++;
    dots.push({
      x: rng(0.05, 0.95, s * 7.3),
      y: rng(0.05, 0.95, s * 13.7),
      r: rng(1.5, 4, s * 3.1),
      color,
      opacity: rng(0.04, 0.1, s * 5.9),
    });
  };

  // 2 rose
  for (let i = 0; i < 2; i++) push([251, 113, 133]);
  // 8 indigo
  for (let i = 0; i < 8; i++) push([99, 102, 241]);
  // 8 teal
  for (let i = 0; i < 8; i++) push([20, 184, 166]);

  return dots;
}

/* ─── Quadratic bezier point at parameter p ─── */
function quadAt(
  x0: number, y0: number,
  cx: number, cy: number,
  x1: number, y1: number,
  p: number,
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

  const dots = useMemo(() => generateDots(), []);

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
    let W = 0;
    let H = 0;

    function resize() {
      const rect = container!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      W = rect.width;
      H = rect.height;
      if (W === 0 || H === 0) return;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    function render() {
      if (!ctx || W === 0 || H === 0) {
        animationId = requestAnimationFrame(render);
        return;
      }
      const t = performance.now() - startTime;
      const isMobile = W < 768;
      const minDim = Math.min(W, H);

      ctx.clearRect(0, 0, W, H);

      /* ── Background dots ── */
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x * W, dot.y * H, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.color[0]},${dot.color[1]},${dot.color[2]},${dot.opacity})`;
        ctx.fill();
      }

      /* ── Compute positions (fixed) ── */
      const rScale = isMobile ? 0.8 : 1;
      const positions = PEOPLE.map((p, i) => {
        const s = p.r * minDim * rScale;
        return {
          px: p.x * W,
          py: p.y * H,
          s,
          colL: p.colL,
          col: p.col,
          hidden: isMobile && MOBILE_HIDDEN.has(i),
        };
      });

      /* ── Connections ── */
      for (let ci = 0; ci < CONNECTIONS.length; ci++) {
        const [from, to] = CONNECTIONS[ci];
        const p1 = positions[from];
        const p2 = positions[to];
        if (p1.hidden || p2.hidden) continue;

        const mx = (p1.px + p2.px) / 2;
        const my = (p1.py + p2.py) / 2;
        const wobble = reducedMotion
          ? 0
          : Math.sin(t * 0.0003 + from * 1.3 + to * 0.7) * 8;
        const cpx = mx + wobble;
        const cpy = my - wobble * 0.6;

        // Quadratic curve connection
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.quadraticCurveTo(cpx, cpy, p2.px, p2.py);
        ctx.strokeStyle = `rgba(${p1.col[0]},${p1.col[1]},${p1.col[2]},0.22)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Traveling particle (simulates communication)
        if (!reducedMotion) {
          const period = 4000 + ci * 700;
          const progress = (t % period) / period;

          const particle = quadAt(p1.px, p1.py, cpx, cpy, p2.px, p2.py, progress);

          // Outer glow around particle
          const glowGrad = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 12);
          glowGrad.addColorStop(0, `rgba(${p1.colL[0]},${p1.colL[1]},${p1.colL[2]},0.25)`);
          glowGrad.addColorStop(0.5, `rgba(${p1.colL[0]},${p1.colL[1]},${p1.colL[2]},0.08)`);
          glowGrad.addColorStop(1, `rgba(${p1.colL[0]},${p1.colL[1]},${p1.colL[2]},0)`);
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 12, 0, Math.PI * 2);
          ctx.fill();

          // Bright core
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p1.colL[0]},${p1.colL[1]},${p1.colL[2]},0.7)`;
          ctx.fill();
        }
      }

      /* ── Silhouettes: glow → shoulders → head ── */
      for (const pos of positions) {
        if (pos.hidden) continue;
        const { px, py, s, col, colL } = pos;

        // Glow (drawn behind)
        const glowR = s * 1.2;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        glow.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},0.08)`);
        glow.addColorStop(0.5, `rgba(${col[0]},${col[1]},${col[2]},0.03)`);
        glow.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Shoulders (body — darker color, lower opacity)
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`;
        ctx.beginPath();
        ctx.moveTo(px - s * 0.65, py + s * 0.35);
        ctx.quadraticCurveTo(px - s * 0.3, py + s * 0.05, px, py + s * 0.08);
        ctx.quadraticCurveTo(px + s * 0.3, py + s * 0.05, px + s * 0.65, py + s * 0.35);
        ctx.quadraticCurveTo(px + s * 0.5, py + s * 0.6, px, py + s * 0.55);
        ctx.quadraticCurveTo(px - s * 0.5, py + s * 0.6, px - s * 0.65, py + s * 0.35);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Head (lighter color, slightly higher opacity)
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = `rgb(${colL[0]},${colL[1]},${colL[2]})`;
        ctx.beginPath();
        ctx.arc(px, py - s * 0.25, s * 0.38, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
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
  }, [reducedMotion, dots]);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Crown of thorns — decorative background (left side) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/couronne-white.png"
        alt=""
        className="hidden lg:block absolute left-[-8%] top-[18%] w-[750px] h-auto opacity-[0.04] brightness-[3] pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Badge + Title */}
      <div className="text-center pt-7 md:pt-10 relative z-10">
        <div className="inline-flex items-center gap-[5px] px-3.5 py-1 rounded-full text-xs font-medium bg-indigo-500/[0.12] text-indigo-300 border border-indigo-500/[0.18] mb-3.5">
          <Users className="w-3 h-3" />
          Communauté
        </div>
        <h2 className="text-2xl md:text-[30px] font-bold text-slate-200 leading-tight">
          Votre communauté connectée
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Chaque lien renforce votre église.
        </p>
      </div>

      {/* Canvas container */}
      <div
        ref={containerRef}
        className="relative mx-auto max-w-6xl mt-12"
        style={{ height: 500 }}
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
