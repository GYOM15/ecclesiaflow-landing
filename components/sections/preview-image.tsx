"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animation/scroll-reveal";

export function PreviewImage() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      {/* Full-width aligned to left vertical line */}
      <div className="pl-[max(1rem,calc((100vw-80rem)/2+1.5rem))] pr-4 sm:pr-6 lg:pr-8">
        <ScrollReveal>
          <div className="relative rounded-sm overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,0,0,0.08),0_4px_20px_-4px_rgba(0,0,0,0.04)] border border-slate-200 max-h-[420px] lg:max-h-[520px]">
            {/* Gradient border highlight — top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent pointer-events-none z-10" aria-hidden="true" />
            <Image
              src="/images/integrations-preview.jpg"
              alt="Mur des Lamentations, Jérusalem, Israël"
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
              unoptimized
            />
            {/* Dark overlay + legend */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-20">
              <p className="text-base sm:text-lg font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                Mur des Lamentations — Jérusalem, Israël
              </p>
              <p className="text-xs sm:text-sm text-white/70 mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                Un lieu de prière millénaire
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
