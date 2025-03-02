import { Button } from '@/components/ui/button';

export function ChatbotHeroSection() {
  return (
    <section>
      <div className="relative">
        <div className="relative max-w-screen-lg mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black">
              <span className="text-[#2563EB]">AI Chatbot:</span> Revolutionize
              Customer Engagement
            </h1>
            <p className="opacity-50 max-w-3xl text-center mx-auto">
              Automate support, generate leads, and deliver personalized
              experiences with our AI-powered chatbot.
            </p>
          </div>
          <Button size="lg">Get Started</Button>
        </div>
      </div>
    </section>
  );
}
