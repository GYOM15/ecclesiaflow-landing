import { Hero } from "@/components/sections/hero";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";
import { SocialProof } from "@/components/sections/social-proof";
import { FeaturesOverview } from "@/components/sections/features-overview";
import { FeatureDeepDive } from "@/components/sections/feature-deep-dive";
import { ImageScatter } from "@/components/sections/image-scatter";
import { Integrations } from "@/components/sections/integrations";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { ImageGallery } from "@/components/sections/image-gallery";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionDivider } from "@/components/decorative/section-divider";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Dashboard behind Social Proof — layered overlap */}
      <div className="relative">
        <div className="relative z-0">
          <DashboardShowcase />
          {/* Gradient fade at the bottom of the dashboard */}
          <div className="absolute bottom-0 left-0 right-0 h-32 lg:h-40 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-10" />
        </div>
        <div className="relative z-20 -mt-24 lg:-mt-32">
          <SocialProof />
        </div>
      </div>

      <SectionDivider />
      <FeaturesOverview />
      <SectionDivider />
      <ImageScatter />
      <SectionDivider />
      <FeatureDeepDive />
      <SectionDivider />
      <Integrations />
      <SectionDivider />
      <Stats />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <ImageGallery variant="home" />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <CtaSection />
    </>
  );
}
