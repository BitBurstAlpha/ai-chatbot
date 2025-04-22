import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

import { Header } from '@/components/header/header';
import Footer from '@/components/footer/footer';
import ChatbotUI from '@/components/ai-chatbot/chat-bot-ui';

const inter = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

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
    <html lang="en">
      <body className={`${inter.variable}  antialiased`}>
        <>
          <Header />

          {children}
          <ChatbotUI />
          <Footer />
        </>
      </body>
    </html>
  );
}
