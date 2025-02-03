import { Button } from '@/components/ui/button';
import { BorderBeam } from '@/components/ui/border-beam';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="py-32">
      <div className="relative">
        <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black">
              Transform Your Website with AI Powered Conversations
            </h1>
            <p className="opacity-50 max-w-3xl text-center mx-auto">
              Engage your visitors, automate support, and boost conversions with
              our intelligent chatbot. Designed for businesses like yours.
            </p>
          </div>
          <Button size="lg">Get Started</Button>
        </div>

        <div className="relative aspect-[16/9] max-w-screen-lg mx-auto mt-10 rounded-lg overflow-hidden">
          <Image
            className="opacity-60 absolute top-0 left-0 object-cover object-top w-full"
            src="/images/home.png"
            alt="home"
            fill
          />
          <BorderBeam />
        </div>
      </div>
    </section>
  );
}
