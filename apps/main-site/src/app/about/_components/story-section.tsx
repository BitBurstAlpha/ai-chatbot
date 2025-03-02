import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import Image from 'next/image';

export function StorySection() {
  return (
    <section className="max-w-screen-lg mx-auto">
      <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex bg-[#99C9FF]/10 group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer  border-border ">
            <AnimatedShinyText className=" inline-flex items-center justify-center px-6 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ The Story ✨</span>
            </AnimatedShinyText>
          </div>
        </div>
        {/* <Button className="rounded-full px-6 h-10">✨ Futures</Button> */}
        <h2 className="text-5xl max-w-screen-sm font-black mx-auto text-center">
          How it all started
        </h2>

        <div className="relative">
          <div className="relative aspect-[16/9] max-w-screen-lg mx-auto mt-10 overflow-hidden rounded-lg">
            <Image
              className="absolute top-0 left-0 object-cover w-full"
              src="/images/about-img.png"
              alt="about-us"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
}
