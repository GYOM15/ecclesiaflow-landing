import type { Metadata } from "next";
import { PreviewHero } from "@/components/sections/preview-hero";
import { DashboardMockup } from "@/components/sections/dashboard-mockup";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Aperçu",
  description:
    "Découvrez l'interface d'EcclesiaFlow. Explorez le tableau de bord et voyez comment gérer votre église au quotidien.",
};

export default function PreviewPage() {
  return (
    <>
      <PreviewHero />
      <DashboardMockup />
      <CtaSection />
    </>
  );
}
