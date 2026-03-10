"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { CrossPatternBg } from "@/components/decorative/cross-motif";

export function AboutVerse() {
  return (
    <section className="relative py-20 lg:py-28 bg-amber-50/30 overflow-hidden">
      <CrossPatternBg className="opacity-50" />

      {/* Subtle warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_70%)] rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          {/* Decorative cross above */}
          <div className="flex justify-center mb-6" aria-hidden="true">
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-amber-400/40" fill="currentColor">
              <rect x="17" y="2" width="6" height="36" rx="3" />
              <rect x="2" y="14" width="36" height="6" rx="3" />
            </svg>
          </div>

          <blockquote>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-700 leading-relaxed italic tracking-tight">
              &laquo;&nbsp;Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d&apos;eux.&nbsp;&raquo;
            </p>
            <footer className="mt-8">
              <div className="w-12 h-px bg-amber-400 mx-auto mb-4" />
              <cite className="text-base font-medium text-amber-700 not-italic">
                Matthieu 18:20
              </cite>
            </footer>
          </blockquote>

          {/* Additional context */}
          <p className="text-sm text-slate-400 mt-8 max-w-md mx-auto leading-relaxed">
            Ce verset guide notre mission : créer des outils qui rassemblent les communautés de foi et facilitent la communion fraternelle.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
