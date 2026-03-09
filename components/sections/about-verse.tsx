"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { CrossPatternBg } from "@/components/decorative/cross-motif";

export function AboutVerse() {
  return (
    <section className="relative py-20 lg:py-28 bg-amber-50/30 overflow-hidden">
      <CrossPatternBg className="opacity-50" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          {/* Decorative quote marks */}
          <div
            className="text-amber-300/40 text-[120px] leading-none font-serif mb-[-3rem]"
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <blockquote>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-700 leading-relaxed italic tracking-tight">
              Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d&apos;eux.
            </p>
            <footer className="mt-8">
              <div className="w-12 h-px bg-amber-400 mx-auto mb-4" />
              <cite className="text-base font-medium text-amber-700 not-italic">
                Matthieu 18:20
              </cite>
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}
