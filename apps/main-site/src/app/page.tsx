import { HeroSection } from './_components/hero-section';
import { FeatureSection } from './_components/feature-section';
import { Testimonials } from './_components/testimonials';
import { FAQSection } from './_components/faq';
import { Benefits } from './_components/benefits';
import { TrainSection } from './_components/train-section';
import { DemoSection } from './_components/demo-section';
import { LiveAIChatSection } from './_components/live-ai-chat-section';

import HeroCTA from './_components/cta';

export default function Home() {
  return (
    <div className="space-y-24">
      {/* color effect */}
      <div className="absolute z-0 w-[40%] h-[30%] top-0 right-0 left-0 mx-auto bg-[#1E4BAF] blur-[140px]" />
      <HeroSection />
      <FeatureSection />
      <LiveAIChatSection />
      <Benefits />
      <DemoSection />
      <TrainSection />
      <Testimonials />
      <FAQSection />
      <HeroCTA />
    </div>
  );
}
