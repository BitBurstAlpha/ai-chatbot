import type { Metadata } from 'next';

import { Header } from '@/components/header/header';
import Footer from '@/components/footer/footer';
import ChatbotUI from '@/components/ai-chatbot/chat-bot-ui';

export const metadata: Metadata = {
  title: 'AI Chatbot',
  description: 'AI Chatbot assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      {children}
      <ChatbotUI />
      <Footer />
    </>
  );
}
