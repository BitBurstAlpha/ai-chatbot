import { Benefits } from '../_components/benefits';
import HeroCTA from '../_components/cta';
import { EmailSupportHeroSection } from './_components/email-support-hero-section';

export default function EmailSupport() {
  return (
    <div className="space-y-24">
      {/* color effect */}
      <div className="absolute z-0 w-[40%] h-[30%] top-0 right-0 left-0 mx-auto bg-[#1E4BAF] blur-[140px]" />
      <EmailSupportHeroSection />
      <Benefits />
      <HeroCTA />
    </div>
  );
}
