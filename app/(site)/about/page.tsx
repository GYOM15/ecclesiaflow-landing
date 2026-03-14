import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutStory } from "@/components/sections/about-story";
import { AboutValues } from "@/components/sections/about-values";
import { AboutTeam } from "@/components/sections/about-team";
import { ImageGallery } from "@/components/sections/image-gallery";
import { AboutVerse } from "@/components/sections/about-verse";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionDivider } from "@/components/decorative/section-divider";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire d'EcclesiaFlow, notre mission et l'équipe qui construit la plateforme de gestion d'église de demain.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SectionDivider />
      <AboutStory />
      <SectionDivider />
      <AboutValues />
      <SectionDivider />
      <AboutTeam />
      <SectionDivider />
      <ImageGallery variant="about" />
      <SectionDivider />
      <AboutVerse />
      <SectionDivider />
      <CtaSection />
    </>
  );
}
