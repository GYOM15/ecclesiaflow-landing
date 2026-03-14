"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * WaveRibbon — Animated ribbon of flowing lines in EcclesiaFlow colors
 * (teal → indigo → violet → deep indigo)
 */

const NUM = 65;
const COLORS: [number, number, number][] = [
  [45, 212, 191],   // teal-400
  [129, 140, 248],  // indigo-400
  [124, 58, 237],   // violet-500
  [79, 70, 229],    // indigo-600
];

export default function WaveRibbon({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const wRef = useRef(0);
  const hRef = useRef(0);

  const doResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    wRef.current = rect.width;
    hRef.current = rect.height;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    doResize();

    function ribbonCenterY(sx: number) {
      const H = hRef.current;
      const rise = -H * 0.45 * Math.pow(Math.sin(sx * Math.PI * 0.8), 1.5);
      const dip = H * 0.06 * Math.sin(sx * Math.PI * 1.6);
      return H * 0.72 + rise + dip;
    }

    function ribbonWidth(sx: number) {
      const H = hRef.current;
      return 40 + sx * sx * H * 0.9;
    }

    function frame(time: number) {
      const W = wRef.current;
      const H = hRef.current;
      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(frame);
        return;
      }
      ctx!.clearRect(0, 0, W, H);
      const t = time * 0.001;

      for (let i = 0; i < NUM; i++) {
        const lineT = i / (NUM - 1);
        const offset = (lineT - 0.5) * 2;

        ctx!.beginPath();
        ctx!.lineWidth = 0.8 + (1 - Math.abs(offset)) * 0.5;

        const segs = 180;
        for (let s = 0; s <= segs; s++) {
          const sx = s / segs;
          const x = sx * W * 1.2 - W * 0.1;
          const centerY = ribbonCenterY(sx);
          const width = ribbonWidth(sx);

          const twistAmount =
            Math.sin(sx * Math.PI * 1.0 + t * 0.35) * 0.25 +
            Math.sin(sx * Math.PI * 0.5 + t * 0.2 + 1.0) * 0.15;
          const cosT = Math.cos(twistAmount);
          const yOff = cosT * offset * width * 0.5;
          const y = centerY + yOff;

          if (s === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }

        const depth = Math.abs(offset);
        const centerBoost = 1 - depth;
        const baseOpacity = 0.08 + centerBoost * 0.6;
        const bright = 0.6 + centerBoost * 0.4;

        const grad = ctx!.createLinearGradient(0, 0, W, 0);
        const [c0, c1, c2, c3] = COLORS;
        grad.addColorStop(0, `rgba(${Math.round(c0[0] * bright)},${Math.round(c0[1] * bright)},${Math.round(c0[2] * bright)},${baseOpacity * 0.3})`);
        grad.addColorStop(0.12, `rgba(${Math.round(c0[0] * bright)},${Math.round(c0[1] * bright)},${Math.round(c0[2] * bright)},${baseOpacity * 0.7})`);
        grad.addColorStop(0.35, `rgba(${Math.round(c1[0] * bright)},${Math.round(c1[1] * bright)},${Math.round(c1[2] * bright)},${baseOpacity})`);
        grad.addColorStop(0.55, `rgba(${Math.round(c2[0] * bright)},${Math.round(c2[1] * bright)},${Math.round(c2[2] * bright)},${baseOpacity})`);
        grad.addColorStop(0.8, `rgba(${Math.round(c3[0] * bright)},${Math.round(c3[1] * bright)},${Math.round(c3[2] * bright)},${baseOpacity * 0.8})`);
        grad.addColorStop(1, `rgba(${Math.round(c3[0] * bright)},${Math.round(c3[1] * bright)},${Math.round(c3[2] * bright)},${baseOpacity * 0.3})`);

        ctx!.strokeStyle = grad;
        ctx!.stroke();
      }

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
    window.addEventListener("resize", doResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", doResize);
    };
  }, [doResize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  );
}
