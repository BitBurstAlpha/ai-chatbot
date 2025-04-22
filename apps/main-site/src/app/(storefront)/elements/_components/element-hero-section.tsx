import { Button } from '@/components/ui/button';

import Image from 'next/image';

export function ElementHeroSection() {
  return (
    <section>
      <div className="relative">
        <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black">
              Unleash
              <span className="text-[#2563EB]"> AI-Powered</span> Support with
              Elements
            </h1>
          </div>
          <Button size="lg">How it works</Button>
        </div>

        <div className="relative aspect-[16/6] max-w-screen-lg mx-auto mt-10 rounded-lg overflow-hidden">
          <Image
            className="opacity-60 absolute top-0 left-0 object-cover object-left w-full"
            src="/images/element-img.png"
            alt="home"
            fill
          />
        </div>
      </div>
    </section>
  );
}
