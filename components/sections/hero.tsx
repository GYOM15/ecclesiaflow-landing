"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/decorative/gradient-text";
import { VoilesAngulaires, type Panel } from "@/components/auth/voiles-angulaires";

/* Panels shifted right to leave text area clear */
const HERO_PANELS: Panel[] = [
  { color: "#C7D2FE", angle: -28, xOff: 0.56, width: 200, speed: 0.4 },  // indigo-200
  { color: "#A5B4FC", angle: -24, xOff: 0.62, width: 180, speed: 0.6 },  // indigo-300
  { color: "#818CF8", angle: -32, xOff: 0.68, width: 220, speed: 0.35 }, // indigo-400
  { color: "#6366F1", angle: -26, xOff: 0.74, width: 250, speed: 0.5 },  // indigo-500
  { color: "#4F46E5", angle: -30, xOff: 0.80, width: 200, speed: 0.7 },  // indigo-600
  { color: "#4338CA", angle: -22, xOff: 0.72, width: 170, speed: 0.45 }, // indigo-700
  { color: "#14B8A6", angle: -20, xOff: 0.86, width: 140, speed: 0.65 }, // teal-500
];
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
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges">
      <rect x="6.5" y="1" width="3" height="14" />
      <rect x="1" y="5.5" width="14" height="3" />
    </svg>
  );
}

export function Hero() {
  const { handleSignIn } = useSocialSignIn();
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="relative overflow-hidden pt-24 pb-0 lg:pt-32 bg-white">
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
      `}</style>

      {/* Voiles angulaires background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <VoilesAngulaires bgColor="#FFFFFF" panels={HERO_PANELS} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="px-2 sm:pl-6 sm:pr-0 lg:pl-16 pb-12 lg:pb-16 max-w-2xl">
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
