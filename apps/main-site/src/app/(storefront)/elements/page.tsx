import HeroCTA from '../_components/cta';
import { ElementBenefitsSection } from './_components/element-benefits-section';
import { ElementHeroSection } from './_components/element-hero-section';

export default function ElementPage() {
  return (
    <div className="space-y-24">
      {/* color effect */}
      <div className="absolute z-0 w-[40%] h-[30%] top-0 right-0 left-0 mx-auto bg-[#1E4BAF] blur-[140px]" />
      <ElementHeroSection />
      <ElementBenefitsSection />
      <HeroCTA />
    </div>
  );
}
