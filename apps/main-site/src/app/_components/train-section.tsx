import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import Image from 'next/image';

export function TrainSection() {
  return (
    <section className="pb-32 max-w-screen-lg mx-auto">
      <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex bg-[#99C9FF]/10 group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer  border-border ">
            <AnimatedShinyText className=" inline-flex items-center justify-center px-6 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ How it Train ✨</span>
            </AnimatedShinyText>
          </div>
        </div>
        {/* <Button className="rounded-full px-6 h-10">✨ Futures</Button> */}
        <h2 className="text-5xl max-w-screen-sm font-black mx-auto text-center">
          How We Train Our Smart AI Chat Assistant
        </h2>

        <div className="relative">
          <div className="relative aspect-[16/9] max-w-screen-lg mx-auto mt-10 overflow-hidden rounded-lg">
            <Image
              className="absolute top-0 left-0 object-cover w-full"
              src="/images/architecture.jpg"
              alt="architecture"
              fill
            />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Text Container */}
          <div className="absolute bottom-0 z-10 translate-y-1/2 left-0 right-0 px-4 py-8 text-center">
            <p className="max-w-4xl mx-auto text-gray-200 text-lg leading-relaxed">
              Our AI chatbot is powered by cutting-edge machine learning
              techniques. From natural language processing to data modeling,
              learn how we equip our chatbot with the knowledge to provide
              accurate, context-aware responses, improving over time with every
              conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
