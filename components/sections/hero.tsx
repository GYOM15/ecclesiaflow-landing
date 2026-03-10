"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/decorative/gradient-text";
import { TICKER_ITEMS } from "@/lib/constants";

const ease = [0.25, 0.1, 0.25, 1.0] as const;

/* Google "G" logo SVG */
function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* Mini cross icon for ticker */
function MiniCross({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <rect x="6.5" y="1" width="3" height="14" rx="1.5" />
      <rect x="1" y="5.5" width="14" height="3" rx="1.5" />
    </svg>
  );
}

/* ─── Crown of thorns — procedurally generated SVG paths ─── */
const CROWN_CX = 230;
const CROWN_CY = 171;

// Outer thorny ring
const crownOuter = (() => {
  const r = 90, n = 24;
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const na = ((i + 0.5) / n) * Math.PI * 2;
    const rv = r + 3 * Math.sin(i * 2.7);
    const px = CROWN_CX + rv * Math.cos(a);
    const py = CROWN_CY + rv * Math.sin(a);
    const tl = (i % 3 === 0) ? 20 : (i % 2 === 0) ? 14 : 10;
    const ta = a + ((i % 2 === 0) ? 0.06 : -0.05);
    const tx = CROWN_CX + (rv + tl) * Math.cos(ta);
    const ty = CROWN_CY + (rv + tl) * Math.sin(ta);
    const ra = a + 0.09;
    const rx = CROWN_CX + (rv - 2) * Math.cos(ra);
    const ry = CROWN_CY + (rv - 2) * Math.sin(ra);
    const mx = CROWN_CX + rv * Math.cos(na);
    const my = CROWN_CY + rv * Math.sin(na);
    if (i === 0) pts.push(`M${px.toFixed(1)},${py.toFixed(1)}`);
    pts.push(`L${tx.toFixed(1)},${ty.toFixed(1)}`, `L${rx.toFixed(1)},${ry.toFixed(1)}`, `L${mx.toFixed(1)},${my.toFixed(1)}`);
  }
  pts.push("Z");
  return pts.join(" ");
})();

// Inner thorny ring (smaller, offset)
const crownInner = (() => {
  const r = 78, n = 20;
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + 0.16;
    const na = ((i + 0.5) / n) * Math.PI * 2 + 0.16;
    const rv = r + 2 * Math.sin(i * 3.1 + 1);
    const px = CROWN_CX + rv * Math.cos(a);
    const py = CROWN_CY + rv * Math.sin(a);
    const tl = (i % 3 === 1) ? 11 : (i % 2 === 1) ? 8 : 5;
    const ta = a + ((i % 2 === 1) ? -0.07 : 0.05);
    const tx = CROWN_CX + (rv - tl) * Math.cos(ta);
    const ty = CROWN_CY + (rv - tl) * Math.sin(ta);
    const ra = a + 0.1;
    const rx = CROWN_CX + (rv + 1) * Math.cos(ra);
    const ry = CROWN_CY + (rv + 1) * Math.sin(ra);
    const mx = CROWN_CX + rv * Math.cos(na);
    const my = CROWN_CY + rv * Math.sin(na);
    if (i === 0) pts.push(`M${px.toFixed(1)},${py.toFixed(1)}`);
    pts.push(`L${tx.toFixed(1)},${ty.toFixed(1)}`, `L${rx.toFixed(1)},${ry.toFixed(1)}`, `L${mx.toFixed(1)},${my.toFixed(1)}`);
  }
  pts.push("Z");
  return pts.join(" ");
})();

// Binding lines — woven branch connections
const bindingLines = (() => {
  const rI = 79, rO = 89;
  const lines: string[] = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + 0.08;
    const x1 = CROWN_CX + rI * Math.cos(a);
    const y1 = CROWN_CY + rI * Math.sin(a);
    const x2 = CROWN_CX + rO * Math.cos(a + 0.1);
    const y2 = CROWN_CY + rO * Math.sin(a + 0.1);
    lines.push(`M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`);
  }
  return lines.join(" ");
})();

export function Hero() {
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="relative overflow-hidden pt-32 pb-0 lg:pt-44">
      {/* Background: animated subtle orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-[15%] right-[5%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04),transparent_70%)] rounded-full blur-3xl"
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.05, 0.97, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[25%] -left-[10%] w-[40%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.03),transparent_70%)] rounded-full blur-3xl"
          animate={{ x: [0, 15, -8, 0], y: [0, 10, -12, 0], scale: [1, 0.96, 1.04, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
      </div>

      {/* Cross with rotating crown of thorns */}
      <div className="absolute right-[4%] lg:right-[7%] top-[10%] w-[320px] h-[360px] lg:w-[460px] lg:h-[520px] pointer-events-none hidden lg:block" aria-hidden="true">
        <svg
          viewBox="0 0 460 520"
          fill="none"
          className="w-full h-full"
        >
          {/* Cross arms — SQUARE corners */}
          <rect x="214" y="20" width="32" height="480" fill="#6366F1" opacity="0.055" />
          <rect x="80" y="155" width="300" height="32" fill="#6366F1" opacity="0.055" />

          {/* Rotating crown of thorns */}
          <motion.g
            style={{ transformOrigin: `${CROWN_CX}px ${CROWN_CY}px` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Outer thorny ring */}
            <path d={crownOuter} fill="none" stroke="#64748b" strokeWidth="1.5" opacity="0.22" />
            {/* Inner thorny ring */}
            <path d={crownInner} fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.15" />
            {/* Woven binding lines */}
            <path d={bindingLines} fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.12" />
          </motion.g>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content — padding preserved, width constrained */}
        <div className="pl-6 lg:pl-16 pb-12 lg:pb-16 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
            <Badge variant="indigo" dot className="mb-5">Bêta ouverte — Accès anticipé</Badge>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06, ease }}
            className="text-[1.5rem] sm:text-[1.85rem] lg:text-[2.35rem] font-semibold tracking-[-0.02em] leading-[1.2] text-slate-800 mb-5">
            <GradientText from="#6366F1" to="#818CF8">Connectez, servez</GradientText>{" "}
            et faites grandir votre église avec une seule plateforme
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease }}
            className="text-base sm:text-[1.05rem] text-slate-500 leading-relaxed mb-7">
            Membres, événements, communication, finances — tout réuni dans une interface unique, moderne et pensée pour les communautés de foi.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16, ease }}
            className="flex flex-wrap gap-3">
            <Button size="lg" variant="primary">
              Commencer
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              <GoogleLogo className="h-4 w-4" />
              S&apos;inscrire avec Google
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Ticker strip — white bg, dark text, cross logos */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <div className="relative bg-white border-t border-slate-200 py-3.5 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {tickerItems.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-5">
                <MiniCross className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                <span className="text-sm font-medium text-slate-800">{item}</span>
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </motion.div>
    </section>
  );
}
