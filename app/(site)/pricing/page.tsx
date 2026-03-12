import type { Metadata } from "next";
import { PricingCards } from "@/components/sections/pricing-cards";
import { PricingComparison } from "@/components/sections/pricing-comparison";
import { PricingFaq } from "@/components/sections/pricing-faq";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Des tarifs simples et transparents pour votre église. Commencez gratuitement, évoluez quand vous êtes prêt.",
};

export default function PricingPage() {
  return (
    <div className="pt-20">
      <PricingCards />
      <PricingComparison />
      <PricingFaq />
      <CtaSection />
    </div>
  );
}
