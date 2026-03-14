"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/decorative/gradient-text";
import { TICKER_ITEMS } from "@/lib/constants";
import { useSocialSignIn } from "@/lib/hooks/use-social-signin";

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

export function Hero() {
  const { handleSignIn } = useSocialSignIn();
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="relative overflow-hidden pt-32 pb-0 lg:pt-44 bg-white">
      {/* CSS keyframe animations */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translate3d(0, 16px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hero-anim-1 {
          opacity: 0;
          animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
          will-change: transform, opacity;
        }
        .hero-anim-2 {
          opacity: 0;
          animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards;
          will-change: transform, opacity;
        }
        .hero-anim-3 {
          opacity: 0;
          animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
          will-change: transform, opacity;
        }
        .hero-anim-4 {
          opacity: 0;
          animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.55s forwards;
          will-change: transform, opacity;
        }
        .hero-anim-ticker {
          opacity: 0;
          animation: heroFadeIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards;
          will-change: opacity;
        }
        @keyframes mountainBreathe {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(var(--breathe-y)); }
        }
        @keyframes mistDrift {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(25px); }
        }
        .mountain-back {
          animation: mountainBreathe 12s ease-in-out infinite;
          --breathe-y: -8px;
        }
        .mountain-mid {
          animation: mountainBreathe 9s ease-in-out infinite;
          --breathe-y: -14px;
        }
        .mountain-front {
          animation: mountainBreathe 7s ease-in-out infinite;
          --breathe-y: -18px;
        }
        .mountain-mist {
          animation: mistDrift 12s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .mountain-back, .mountain-mid, .mountain-front, .mountain-mist {
            animation: none;
          }
        }
      `}</style>

      {/* Background: animated subtle orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-[15%] right-[5%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_70%)] rounded-full blur-3xl"
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.05, 0.97, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[25%] -left-[10%] w-[40%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_70%)] rounded-full blur-3xl"
          animate={{ x: [0, 15, -8, 0], y: [0, 10, -12, 0], scale: [1, 0.96, 1.04, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[50%] right-[15%] w-[30%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.07),transparent_70%)] rounded-full blur-3xl"
          animate={{ x: [0, -12, 8, 0], y: [0, -8, 14, 0], scale: [1, 1.03, 0.98, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[20%] w-[25%] h-[30%] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.05),transparent_70%)] rounded-full blur-3xl"
          animate={{ x: [0, 10, -6, 0], y: [0, -10, 6, 0], scale: [1, 1.04, 0.97, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
      </div>

      {/* Mountains chain + cross — right side, organic */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        <svg
          viewBox="0 0 1440 580"
          fill="none"
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 left-0 w-full h-full"
        >
          <defs>
            {/* Soft halo behind the cross */}
            <radialGradient id="crossHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </radialGradient>
            {/* Fade-out mask for the left edge (keeps right side visible for cross) */}
            <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="30%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <mask id="mountainFade">
              <rect x="0" y="0" width="1440" height="580" fill="url(#fadeLeft)" />
            </mask>
          </defs>

          {/* Halo glow behind cross intersection */}
          <circle cx="1100" cy="200" r="120" fill="url(#crossHalo)" />

          {/* Mountain chain — multiple peaks, highest summit under the cross */}
          <g mask="url(#mountainFade)">
            {/* Back range — broad, soft peaks, indigo-200 */}
            <path
              className="mountain-back"
              d="M350,580 L380,500 L450,485 L520,475 L570,480 L630,460
                 L690,465 L750,445 L800,448 L860,425 L920,415 L970,420
                 L1030,400 L1070,392 L1100,380 L1130,392 L1180,408
                 L1230,420 L1290,435 L1350,448 L1440,460 L1440,580 Z"
              fill="#C7D2FE"
              opacity="0.10"
            />

            {/* Mid range — defined peaks, main summit under cross, teal */}
            <path
              className="mountain-mid"
              d="M420,580 L450,520 L520,508 L580,500 L630,505 L700,488
                 L760,492 L820,475 L870,478 L930,458 L990,448 L1040,442
                 L1100,430 L1140,440 L1200,450 L1260,460 L1320,468
                 L1400,475 L1440,480 L1440,580 Z"
              fill="#14B8A6"
              opacity="0.07"
            />

            {/* Front range — rolling foothills, amber */}
            <path
              className="mountain-front"
              d="M490,580 L510,540 L570,532 L640,525 L690,528 L760,515
                 L820,518 L880,505 L930,508 L990,492 L1050,485 L1100,478
                 L1140,484 L1200,492 L1260,498 L1320,504 L1400,510
                 L1440,515 L1440,580 Z"
              fill="#F59E0B"
              opacity="0.05"
            />

            {/* Teal mist at the base of the mountains */}
            <path
              className="mountain-mist"
              d="M550,580 L580,548 L700,540 L820,532 L940,525 L1050,522
                 L1100,520 L1150,523 L1260,530 L1380,538 L1440,542 L1440,580 Z"
              fill="#14B8A6"
              opacity="0.04"
            />
          </g>

          {/* Cross — planted at highest peak, right side, square corners */}
          <rect x="1084" y="110" width="32" height="270" fill="#6366F1" opacity="0.10" />
          <rect x="990" y="185" width="220" height="28" fill="#6366F1" opacity="0.10" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="pl-6 lg:pl-16 pb-12 lg:pb-16 max-w-2xl">
          <div className="hero-anim-1">
            <Badge variant="indigo" dot className="mb-5 shadow-sm shadow-indigo-200/50 border-indigo-200">
              Bêta ouverte — Accès anticipé
            </Badge>
          </div>

          <h1 className="hero-anim-2 text-[1.5rem] sm:text-[1.85rem] lg:text-[2.35rem] font-semibold tracking-[-0.02em] leading-[1.2] text-slate-800 mb-5">
            <GradientText from="#6366F1" to="#818CF8">Connectez, servez</GradientText>{" "}
            et faites grandir votre église avec une seule plateforme
          </h1>

          <p className="hero-anim-3 text-base sm:text-[1.05rem] text-slate-500 leading-relaxed mb-7">
            Membres, événements, communication, finances — tout réuni dans une interface unique, moderne et pensée pour les communautés de foi.
          </p>

          <div className="hero-anim-4 flex flex-wrap gap-3">
            <Link href="/inscription">
              <Button size="lg" variant="primary">
                Commencer
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50"
              onClick={() => handleSignIn("google")}
            >
              <GoogleLogo className="h-4 w-4" />
              S&apos;inscrire avec Google
            </Button>
          </div>
        </div>
      </div>

      {/* Ticker strip */}
      <div className="hero-anim-ticker">
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
      </div>
    </section>
  );
}
