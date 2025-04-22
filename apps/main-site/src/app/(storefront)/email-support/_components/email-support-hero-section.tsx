import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function EmailSupportHeroSection() {
  return (
    <section>
      <div className="relative">
        <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black">
              Transform Email Management with{' '}
              <span className="text-[#2563EB]">Lexi.AI</span>
            </h1>
            <p className="opacity-50 max-w-3xl text-center mx-auto">
              Automate, prioritize, and respond to emails faster than ever with
              AI that learns and adapts to your needs.
            </p>
          </div>
          <Button size="lg">Get Started</Button>
        </div>

        <div className="relative aspect-[16/9] max-w-screen-lg mx-auto mt-10 rounded-lg overflow-hidden">
          <Image
            className="absolute top-0 left-0 object-cover object-top w-full"
            src="/images/email-support.svg"
            alt="home"
            fill
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
