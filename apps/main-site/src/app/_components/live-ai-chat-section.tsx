import { Button } from '@/components/ui/button';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import Image from 'next/image';

export function LiveAIChatSection() {
  return (
    <section className="pb-32 max-w-screen-lg mx-auto overflow-hidden relative">
      <div className="relative w-full flex">
        <div className="relative z-10 rounded-lg flex flex-col lg:flex-row items-center bg-background-brand-hovered justify-between w-full min-h-96 px-10 space-x-4">
          {/* Left Content */}
          <div className="text-center lg:text-left max-w-xl">
            <h2 className="text-white text-4xl lg:text-5xl font-bold mb-4">
              Live AI Chat. Powered by Your Data.
            </h2>
            <p className="text-text opacity-50 text-lg leading-relaxed mb-8">
              Transform customer service with AI that learns, adapts, and
              delivers human-like support—24/7
            </p>
            <Button size="lg">Sign-Up</Button>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex mt-auto overflow-hidden ">
            <div className="relative pb-[85%] w-full h-full mx-auto overflow-hidden rounded-lg">
              <Image
                className="absolute top-0 left-0 object-cover"
                src="/images/live-chat.svg"
                alt="live chat"
                fill
              />
            </div>
          </div>
        </div>

        <FlickeringGrid
          className="absolute inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
      </div>
    </section>
  );
}
