import { Icons } from '@/components/icons';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { FeatureCard } from './feature-card';

const features = [
  {
    icon: Icons.messageSquare,
    title: 'AI Chat-bot',
    description: 'Create an AI chatbot and make it an expert on your business.',
  },
  {
    icon: Icons.ticket,
    title: 'Ticket Form',
    description:
      'Create a custom ticket form to collect information from your users.',
  },
  {
    icon: Icons.inbox,
    title: 'Email Inbox',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  },
  {
    icon: Icons.helpCircle,
    title: 'FAQ & Knowledge Base',
    description:
      'Create a knowledge base for both users and support to search for answers.',
  },
  {
    icon: Icons.wifi,
    title: 'Identify knowledge gaps',
    description: 'Identify knowledge gaps, improve and retrain your AI models.',
  },
  {
    icon: Icons.code,
    title: 'SDKs, APIs & Webhooks',
    description:
      'Our solution is built to be integrated with your existing tools.',
  },
];

export function FeatureSection() {
  return (
    <section className="max-w-screen-lg mx-auto">
      <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex bg-[#99C9FF]/10 group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer  border-border ">
            <AnimatedShinyText className=" inline-flex items-center justify-center px-6 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Futures</span>
            </AnimatedShinyText>
          </div>
        </div>
        {/* <Button className="rounded-full px-6 h-10">✨ Futures</Button> */}
        <h2 className="text-5xl font-black">
          Step into the Future of Customer Engagement
        </h2>
        <p className="opacity-50 max-w-3xl text-center mx-auto">
          Harness the power of AI to create seamless, intelligent, and
          futuristic customer experiences.
        </p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
