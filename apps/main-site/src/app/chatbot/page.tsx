import { ChatbotHeroSection } from './_components/chatbot-hero-section';
import { Benefits } from '../_components/benefits';
import { DemoSection } from '../_components/demo-section';
import { LiveAIChatSection } from '../_components/live-ai-chat-section';

import HeroCTA from '../_components/cta';
import PersonalizeSection from './_components/personalize-chatbot-section';

export default function ChatBotPage() {
  return (
    <div className="space-y-24">
      {/* color effect */}
      <div className="absolute z-0 w-[40%] h-[30%] top-0 right-0 left-0 mx-auto bg-[#1E4BAF] blur-[140px]" />
      <ChatbotHeroSection />
      <DemoSection />
      <LiveAIChatSection />
      <Benefits />
      <PersonalizeSection />
      <HeroCTA />
    </div>
  );
}
