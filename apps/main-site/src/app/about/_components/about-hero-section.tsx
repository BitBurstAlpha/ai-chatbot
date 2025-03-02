import { Button } from '@/components/ui/button';

export function AboutHeroSection() {
  return (
    <section>
      <div className="relative">
        <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black">
              Lexi : AI The Future of Intelligent Customer Engagement
            </h1>
          </div>
          <Button size="lg">Sign Up</Button>
        </div>
      </div>
    </section>
  );
}
