"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animation/scroll-reveal";

export function CtaSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden -mb-px">
      {/* Subtle decorative gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-[10%] w-[40%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04),transparent_70%)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[5%] w-[35%] h-[45%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)] rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
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
            <Button size="lg" variant="outline">
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
