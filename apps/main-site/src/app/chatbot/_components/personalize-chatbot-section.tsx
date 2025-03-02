import React from 'react';
import Image from 'next/image';
import { Moon, Sun, Palette, HelpCircle, Ticket } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const PersonalizeSection = () => {
  const features = [
    {
      id: 'dark-mode',
      icon: <Moon size={24} />,
      title: 'Dark Mode',
      description:
        'Enable dark mode for a sleek and eye-friendly chat experience, ideal for modern and minimalistic websites.',
    },
    {
      id: 'light-mode',
      icon: <Sun size={24} />,
      title: 'Light Mode',
      description:
        'Use light mode for a clean and bright chatbot interface, perfect for vibrant and professional designs.',
    },
    {
      id: 'custom-theme',
      icon: <Palette size={24} />,
      title: 'Custom Theme',
      description:
        'Personalize the chatbot’s appearance with custom colors, fonts, and styles to match your brand identity.',
    },
    {
      id: 'faqs',
      icon: <HelpCircle size={24} />,
      title: 'FAQs',
      description:
        'Provide quick answers to common customer queries with an easy-to-access FAQ section.',
    },
    {
      id: 'create-tickets',
      icon: <Ticket size={24} />,
      title: 'Create Tickets',
      description:
        'Allow users to create and manage support tickets directly from the chatbot for seamless customer service.',
    },
  ];

  return (
    <div className="bg-[#0B0F2B]/50  p-16  max-w-screen-lg mx-auto rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="flex justify-center text-3xl md:text-4xl text-center font-bold text-white mb-8">
          Personalize Your Chatbot
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          {/* <div>
            <div className="space-y-4">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  className="w-full bg-[#1a1b2e] hover:bg-[#22243a] transition-colors p-4 rounded-lg flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{feature.icon}</span>
                    <div className="text-left">
                      <p className="text-white font-medium">{feature.title}</p>
                      {feature.description && (
                        <p className="text-gray-400 text-sm mt-1">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight
                    className="text-gray-400 group-hover:text-white transition-colors"
                    size={20}
                  />
                </button>
              ))}
            </div>
          </div> */}

          <Accordion type="single" collapsible className="w-full">
            {features.map((feature, i) => (
              <AccordionItem
                key={feature.id}
                value={feature.id}
                className="px-4 border-0"
              >
                <div className="relative w-full h-0.5  bg-gradient-to-r from-transparent via-blue-500 to-transparent "></div>

                <AccordionTrigger>
                  <div className="flex space-x-2 items-center">
                    {feature.icon}
                    <p>{feature.title}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-text opacity-50">
                  {feature.description}
                </AccordionContent>

                {features.length - 1 === i && (
                  <div className="relative w-full h-[1px]  bg-gradient-to-r from-transparent via-blue-500 to-transparent "></div>
                )}
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right Section - Chatbot Preview */}
          <div className="relative">
            {/* Right Content */}
            <div className="flex-1 flex mt-auto overflow-hidden ">
              <div className="relative pb-[100%] w-full h-full mx-auto overflow-hidden rounded-lg">
                <Image
                  className="absolute top-0 left-0 object-cover object-top"
                  src="/images/chatbot.png"
                  alt="live chat"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizeSection;
