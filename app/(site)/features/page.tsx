import type { Metadata } from "next";
import { FeaturesHero } from "@/components/sections/features-hero";
import { FeaturesDetail } from "@/components/sections/features-detail";
import { FeaturesComparison } from "@/components/sections/features-comparison";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Découvrez toutes les fonctionnalités d'EcclesiaFlow : gestion des membres, communication, événements, finances et plus encore.",
};

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <FeaturesDetail />
      <FeaturesComparison />
      <CtaSection />
    </>
  );
}
