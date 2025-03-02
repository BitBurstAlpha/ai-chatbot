import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import Image from 'next/image';

export function ElementBenefitsSection() {
  return (
    <section className="max-w-screen-lg mx-auto">
      <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex bg-[#99C9FF]/10 group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer  border-border ">
            <AnimatedShinyText className=" inline-flex items-center justify-center px-6 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Benefits</span>
            </AnimatedShinyText>
          </div>
        </div>
        {/* <Button className="rounded-full px-6 h-10">✨ Futures</Button> */}
        <h2 className="text-5xl font-black">
          Developers,Build Smarter Support Experiences
        </h2>
        <p className="opacity-50 max-w-3xl text-center mx-auto">
          With Elements, create fully customizable, AI-powered support pages
          that integrate seamlessly into your app.
        </p>
      </div>

      <div className="relative aspect-[16/4] max-w-screen-lg mx-auto mt-10 rounded-lg overflow-hidden">
        <Image
          className="opacity-60 absolute top-0 left-0 object-contain w-full"
          src="/images/element-benefit.png"
          alt="element-benefit"
          fill
        />
      </div>
    </section>
  );
}
