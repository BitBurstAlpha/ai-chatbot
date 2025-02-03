import { Icons } from '@/components/icons';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { BenefitCard } from './benefit-card';

const features = [
  {
    icon: Icons.grid,
    title: 'Fully customizable',
    description:
      'Customize branding, colors, logos to fit your style, brand, and tone of voice.',
  },
  {
    icon: Icons.code,
    title: 'No Code',
    description:
      'Deploy your chatbot, ticket forms, and email inbox with no coding required.',
  },
  {
    icon: Icons.plusSquare,
    title: 'Collect leads',
    description:
      'Collect user information such as name and email, and follow up with them later.',
  },
  {
    icon: Icons.webhook,
    title: 'Webhooks',
    description:
      'Connect your chatbot, ticket forms, and email inbox to your favorite tools through webhooks.',
  },
  {
    icon: Icons.terminal,
    title: 'Control with JavaScript',
    description:
      'Control the behavior of your chatbots and ticket forms using JavaScript.',
  },
  {
    icon: Icons.code,
    title: 'React Library',
    description:
      'Use our React library to embed chatbots and ticket forms in your React/Next.js app.',
  },
  {
    icon: Icons.globe,
    title: 'Hosted website',
    description:
      'Share a link to your chatbot or ticket form on your hosted website.',
  },
  {
    icon: Icons.search,
    title: 'Discover knowledge gaps',
    description:
      'See where your chatbot is missing knowledge to answer and correct it for the future.',
  },
  {
    icon: Icons.image,
    title: 'Link & image replies',
    description:
      'The chatbot replies with links and images to help users understand better.',
  },
];

export function Benefits() {
  return (
    <section className="pb-32 max-w-screen-lg mx-auto">
      <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex bg-[#99C9FF]/10 group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer  border-border ">
            <AnimatedShinyText className=" inline-flex items-center justify-center px-6 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Benefits</span>
            </AnimatedShinyText>
          </div>
        </div>
        {/* <Button className="rounded-full px-6 h-10">✨ Futures</Button> */}
        <h2 className="text-5xl max-w-screen-sm font-black mx-auto text-center">
          Everything You Need, Powered by AI
        </h2>
      </div>

      <div className="w-full py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12 relative">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${index % 3 === 1 ? 'md:relative md:z-10' : ''}`}
              >
                <BenefitCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
