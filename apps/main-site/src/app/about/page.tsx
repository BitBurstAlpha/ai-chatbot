import { FeatureSection } from '../_components/feature-section';

import HeroCTA from '../_components/cta';
import { AboutHeroSection } from './_components/about-hero-section';
import { StorySection } from './_components/story-section';

export default function AboutPage() {
  return (
    <div className="space-y-24">
      {/* color effect */}
      <div className="absolute z-0 w-[40%] h-[30%] top-0 right-0 left-0 mx-auto bg-[#1E4BAF] blur-[140px]" />
      <AboutHeroSection />
      <StorySection />
      <FeatureSection />
      <HeroCTA />
    </div>
  );
}
