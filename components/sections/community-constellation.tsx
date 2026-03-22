"use client";

import { useRef, useEffect, useState } from "react";
import { Users } from "lucide-react";

/* ─── Desktop: 9 silhouettes — organic spread ─── */
const PEOPLE_DESKTOP = [
  { x: 0.08, y: 0.18, r: 0.072, colL: [94, 234, 212],  col: [20, 184, 166] },
  { x: 0.30, y: 0.06, r: 0.078, colL: [165, 180, 252], col: [99, 102, 241] },
  { x: 0.52, y: 0.12, r: 0.085, colL: [94, 234, 212],  col: [20, 184, 166] },
  { x: 0.80, y: 0.05, r: 0.072, colL: [165, 180, 252], col: [99, 102, 241] },
  { x: 0.14, y: 0.50, r: 0.09,  colL: [165, 180, 252], col: [99, 102, 241] },
  { x: 0.42, y: 0.44, r: 0.098, colL: [94, 234, 212],  col: [20, 184, 166] },
  { x: 0.68, y: 0.40, r: 0.078, colL: [129, 140, 248], col: [99, 102, 241] },
  { x: 0.90, y: 0.34, r: 0.085, colL: [45, 212, 191],  col: [20, 184, 166] },
  { x: 0.50, y: 0.70, r: 0.075, colL: [165, 180, 252], col: [99, 102, 241] },
];

const CONNECTIONS_DESKTOP: [number, number][] = [
  [0, 1], [1, 2], [2, 3],
  [0, 4], [1, 4], [1, 5], [2, 5],
  [2, 6], [3, 6], [3, 7],
  [4, 5], [5, 6], [6, 7],
  [5, 8], [6, 8], [4, 8],
  [0, 5], [2, 7], [1, 6],
  [7, 8],
];

/* ─── Mobile: 7 silhouettes — hexagon + center ─── */
// Hexagon centered at (0.5, 0.5), radius ~0.35
const HEX_R = 0.32;
const HEX_CX = 0.50;
const HEX_CY = 0.48;
const PEOPLE_MOBILE = [
  // Center
  { x: HEX_CX, y: HEX_CY, r: 0.095, colL: [94, 234, 212], col: [20, 184, 166] },
  // 6 vertices at 60° intervals (starting from top)
  ...Array.from({ length: 6 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI * 2) / 6;
    const teal = i % 2 === 0;
    return {
      x: HEX_CX + Math.cos(angle) * HEX_R,
      y: HEX_CY + Math.sin(angle) * HEX_R * 1.1, // stretch Y slightly for visual balance
      r: 0.075,
      colL: teal ? [94, 234, 212] as number[] : [165, 180, 252] as number[],
      col: teal ? [20, 184, 166] as number[] : [99, 102, 241] as number[],
    };
  }),
];

// Hexagon connections: center to all + ring
const CONNECTIONS_MOBILE: [number, number][] = [
  // Center (0) to each vertex (1-6)
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  // Ring connections
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
];

/* ─── 18 decorative background circles (static, random positions) ─── */
interface Dot {
  x: number;
  y: number;
  r: number;
  color: [number, number, number];
  opacity: number;
}

/* Hand-placed dots for even distribution across the canvas */
const DOTS: Dot[] = [
  // Top area
  { x: 0.12, y: 0.08, r: 2.5, color: [99, 102, 241],  opacity: 0.07 },
  { x: 0.45, y: 0.05, r: 1.8, color: [20, 184, 166],  opacity: 0.06 },
  { x: 0.78, y: 0.10, r: 3.0, color: [99, 102, 241],  opacity: 0.05 },
  { x: 0.92, y: 0.04, r: 2.0, color: [251, 113, 133], opacity: 0.06 },
  // Upper-mid
  { x: 0.06, y: 0.30, r: 2.2, color: [20, 184, 166],  opacity: 0.08 },
  { x: 0.35, y: 0.28, r: 1.6, color: [99, 102, 241],  opacity: 0.05 },
  { x: 0.62, y: 0.25, r: 2.8, color: [20, 184, 166],  opacity: 0.06 },
  { x: 0.88, y: 0.22, r: 2.0, color: [99, 102, 241],  opacity: 0.07 },
  // Center
  { x: 0.18, y: 0.55, r: 3.2, color: [99, 102, 241],  opacity: 0.05 },
  { x: 0.55, y: 0.52, r: 1.8, color: [251, 113, 133], opacity: 0.06 },
  { x: 0.82, y: 0.48, r: 2.5, color: [20, 184, 166],  opacity: 0.07 },
  // Lower-mid
  { x: 0.10, y: 0.72, r: 2.0, color: [20, 184, 166],  opacity: 0.06 },
  { x: 0.40, y: 0.75, r: 2.8, color: [99, 102, 241],  opacity: 0.05 },
  { x: 0.70, y: 0.68, r: 1.6, color: [20, 184, 166],  opacity: 0.08 },
  { x: 0.94, y: 0.70, r: 2.2, color: [99, 102, 241],  opacity: 0.06 },
  // Bottom
  { x: 0.25, y: 0.90, r: 2.5, color: [20, 184, 166],  opacity: 0.05 },
  { x: 0.58, y: 0.92, r: 2.0, color: [99, 102, 241],  opacity: 0.07 },
  { x: 0.85, y: 0.88, r: 3.0, color: [20, 184, 166],  opacity: 0.06 },
];

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
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  const dots = DOTS;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
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
    let lastFrameTime = 0;
    const isMobileDevice = window.innerWidth < 768;
    const frameInterval = isMobileDevice ? 33 : 0; // ~30fps on mobile

    function resize() {
      const rect = container!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

      const now = performance.now();
      // Throttle on mobile
      if (frameInterval && now - lastFrameTime < frameInterval) {
        animationId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = now;

      const t = now - startTime;
      const isMobile = W < 768;
      const minDim = Math.min(W, H);

      ctx.clearRect(0, 0, W, H);

      /* ── Background dots (fewer on mobile, evenly distributed) ── */
      const mobileDotIndices = [0, 3, 5, 8, 11, 13, 15, 17]; // spread across all areas
      const activeDots = isMobile ? mobileDotIndices.map(i => dots[i]) : dots;
      for (let di = 0; di < activeDots.length; di++) {
        const dot = activeDots[di];
        ctx.beginPath();
        ctx.arc(dot.x * W, dot.y * H, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.color[0]},${dot.color[1]},${dot.color[2]},${dot.opacity})`;
        ctx.fill();
      }

      /* ── Pick layout based on screen ── */
      const people = isMobile ? PEOPLE_MOBILE : PEOPLE_DESKTOP;
      const connections = isMobile ? CONNECTIONS_MOBILE : CONNECTIONS_DESKTOP;

      /* ── Compute positions ── */
      const rScale = isMobile ? 0.9 : 1;
      const positions = people.map((p) => {
        const s = p.r * minDim * rScale;
        return {
          px: p.x * W,
          py: p.y * H,
          s,
          colL: p.colL,
          col: p.col,
        };
      });

      /* ── Connections ── */
      for (let ci = 0; ci < connections.length; ci++) {
        const [from, to] = connections[ci];
        const p1 = positions[from];
        const p2 = positions[to];

        const mx = (p1.px + p2.px) / 2;
        const my = (p1.py + p2.py) / 2;
        const wobble = (reducedMotion || isMobile)
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

          // Outer glow around particle (skip on mobile for perf)
          if (!isMobile) {
            const glowGrad = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 12);
            glowGrad.addColorStop(0, `rgba(${p1.colL[0]},${p1.colL[1]},${p1.colL[2]},0.25)`);
            glowGrad.addColorStop(0.5, `rgba(${p1.colL[0]},${p1.colL[1]},${p1.colL[2]},0.08)`);
            glowGrad.addColorStop(1, `rgba(${p1.colL[0]},${p1.colL[1]},${p1.colL[2]},0)`);
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 12, 0, Math.PI * 2);
            ctx.fill();
          }

          // Bright core
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p1.colL[0]},${p1.colL[1]},${p1.colL[2]},0.7)`;
          ctx.fill();
        }
      }

      /* ── Silhouettes: glow → shoulders → head ── */
      for (const pos of positions) {
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
  }, [reducedMotion]);

  return (
    <section className="relative py-10 md:py-24 overflow-hidden">
      {/* Crown of thorns — decorative background (left side) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/couronne-white.png"
        alt=""
        className="absolute left-[-10%] sm:left-[-4%] top-[20%] sm:top-[18%] w-[320px] sm:w-[500px] lg:w-[750px] h-auto opacity-[0.03] sm:opacity-[0.04] brightness-[3] pointer-events-none select-none"
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
        className="relative mx-auto max-w-6xl mt-8 md:mt-12 h-[220px] sm:h-[320px] md:h-[500px]"
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
