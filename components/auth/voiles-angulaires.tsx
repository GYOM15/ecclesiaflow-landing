"use client";

import { useEffect, useRef } from "react";

interface Panel {
  color: string;
  angle: number;
  xOff: number;
  width: number;
  speed: number;
}

const PANELS: Panel[] = [
  { color: "#C7D2FE", angle: -28, xOff: 0.30, width: 200, speed: 0.4 },  // indigo-200
  { color: "#A5B4FC", angle: -24, xOff: 0.40, width: 180, speed: 0.6 },  // indigo-300
  { color: "#818CF8", angle: -32, xOff: 0.50, width: 220, speed: 0.35 }, // indigo-400
  { color: "#6366F1", angle: -26, xOff: 0.60, width: 250, speed: 0.5 },  // indigo-500
  { color: "#4F46E5", angle: -30, xOff: 0.70, width: 200, speed: 0.7 },  // indigo-600
  { color: "#4338CA", angle: -22, xOff: 0.55, width: 170, speed: 0.45 }, // indigo-700
  { color: "#7C3AED", angle: -35, xOff: 0.75, width: 160, speed: 0.55 }, // violet-500
  { color: "#14B8A6", angle: -20, xOff: 0.85, width: 140, speed: 0.65 }, // teal-500
];

const BG_COLOR = "#F8FAFC"; // slate-50

export function VoilesAngulaires() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // If reduced motion, draw a static frame and stop
    if (prefersReducedMotion.current) {
      drawStaticFrame(canvas, ctx);
      return;
    }

    let animationId: number;
    let startTime: number | null = null;

    function resizeCanvas() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const t = timestamp - startTime;

      if (!canvas || !ctx) return;

      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      // Clear with background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);

      // Draw each panel
      PANELS.forEach((panel, i) => {
        const x = w * panel.xOff + Math.sin(t * 0.005 * panel.speed + i * 0.8) * 60;
        const rotation = (panel.angle + Math.sin(t * 0.003 + i * 1.2) * 2) * (Math.PI / 180);
        const opacity = 0.35 + Math.sin(t * 0.004 + i * 0.6) * 0.05;

        ctx.save();
        ctx.translate(x, h / 2);
        ctx.rotate(rotation);
        ctx.globalAlpha = opacity;

        // Main panel
        ctx.fillStyle = panel.color;
        ctx.fillRect(-panel.width / 2, -h, panel.width, h * 2);

        // Dark edge bands (3px on each side)
        ctx.fillStyle = "rgba(0,0,0,0.04)";
        ctx.fillRect(-panel.width / 2, -h, 3, h * 2);
        ctx.fillRect(-panel.width / 2 + 3, -h, 3, h * 2);
        ctx.fillRect(panel.width / 2 - 6, -h, 3, h * 2);
        ctx.fillRect(panel.width / 2 - 3, -h, 3, h * 2);

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animationId = requestAnimationFrame(animate);

    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      {/* Fallback gradient for reduced motion */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-indigo-400 to-violet-500 opacity-40 motion-safe:hidden"
        aria-hidden="true"
      />
    </>
  );
}

function drawStaticFrame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, w, h);

  PANELS.forEach((panel) => {
    const x = w * panel.xOff;
    const rotation = panel.angle * (Math.PI / 180);

    ctx.save();
    ctx.translate(x, h / 2);
    ctx.rotate(rotation);
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = panel.color;
    ctx.fillRect(-panel.width / 2, -h, panel.width, h * 2);

    ctx.fillStyle = "rgba(0,0,0,0.04)";
    ctx.fillRect(-panel.width / 2, -h, 3, h * 2);
    ctx.fillRect(-panel.width / 2 + 3, -h, 3, h * 2);
    ctx.fillRect(panel.width / 2 - 6, -h, 3, h * 2);
    ctx.fillRect(panel.width / 2 - 3, -h, 3, h * 2);

    ctx.restore();
  });
}
