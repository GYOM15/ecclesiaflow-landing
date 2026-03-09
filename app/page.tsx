import { Hero } from "@/components/sections/hero";
import { TickerStrip } from "@/components/sections/ticker-strip";
import { SocialProof } from "@/components/sections/social-proof";
import { FeaturesOverview } from "@/components/sections/features-overview";
import { FeatureDeepDive } from "@/components/sections/feature-deep-dive";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Integrations } from "@/components/sections/integrations";
import { CtaSection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TickerStrip />
      <SocialProof />
      <FeaturesOverview />
      <FeatureDeepDive />
      <Stats />
      <Testimonials />
      <HowItWorks />
      <Integrations />
      <CtaSection />
    </>
  );
}
