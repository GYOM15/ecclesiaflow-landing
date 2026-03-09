"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { CrossPatternBg } from "@/components/decorative/cross-motif";

export function CtaSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
        aria-hidden="true"
      />
      <CrossPatternBg className="opacity-30" />

      {/* Decorative orbs */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
            Prêt à transformer la gestion de votre église&nbsp;?
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Rejoignez des centaines d&apos;églises qui ont choisi EcclesiaFlow
            pour simplifier leur quotidien et se concentrer sur leur mission.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg"
            >
              Démarrer gratuitement
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              Parler à un conseiller
            </Button>
          </div>
          <p className="text-sm text-slate-400 mt-5">
            Aucune carte de crédit requise &middot; Essai gratuit de 14 jours
            &middot; Annulation à tout moment
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
