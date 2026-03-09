"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { PRICING_FAQ } from "@/lib/constants";

export function PricingFaq() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Questions fréquentes"
          subtitle="Tout ce que vous devez savoir sur EcclesiaFlow. Vous ne trouvez pas la réponse ? Contactez-nous."
        />

        <ScrollReveal>
          <Accordion items={PRICING_FAQ} />
        </ScrollReveal>
      </div>
    </section>
  );
}
