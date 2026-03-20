"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animation/scroll-reveal";

export function CtaSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-indigo-50 via-white to-slate-50 overflow-hidden -mb-px">
      {/* Subtle decorative gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-[10%] w-[40%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04),transparent_70%)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[5%] w-[35%] h-[45%] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.04),transparent_70%)] rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
      </div>

      {/* Bookend SVG — mountains + cross */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute bottom-0 left-0 w-full h-40" viewBox="0 0 1440 160" fill="none" preserveAspectRatio="none">
          <path d="M0,160 L0,120 L180,70 L320,100 L480,45 L600,80 L720,30 L860,65 L960,40 L1080,75 L1200,50 L1340,90 L1440,60 L1440,160 Z" fill="#C7D2FE" opacity="0.18" />
          <path d="M0,160 L0,130 L240,90 L400,110 L560,75 L720,100 L880,60 L1040,95 L1200,70 L1440,100 L1440,160 Z" fill="#C7D2FE" opacity="0.10" />
        </svg>
        <svg className="absolute top-8 right-[12%] w-16 h-20" viewBox="0 0 40 50" fill="none" shapeRendering="crispEdges">
          <rect x="17" y="0" width="6" height="50" fill="#6366F1" opacity="0.18" />
          <rect x="4" y="13" width="32" height="6" fill="#6366F1" opacity="0.18" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-6">
            Prêt à transformer la gestion de votre église&nbsp;?
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Rejoignez des centaines d&apos;églises qui ont choisi EcclesiaFlow
            pour simplifier leur quotidien et se concentrer sur leur mission.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/inscription">
              <Button size="lg" variant="primary">
                Démarrer
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-indigo-300 text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50">
              Nous contacter
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
