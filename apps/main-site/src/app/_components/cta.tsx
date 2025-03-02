import { Button } from '@/components/ui/button';
import { RetroGrid } from '@/components/ui/retro-grid';
import React from 'react';

const HeroCTA = () => {
  return (
    <div className="relative  max-w-screen-lg mb-10 mx-auto w-full bg-background-brand-hovered rounded-2xl flex flex-col items-center justify-center text-center px-4 py-24">
      <RetroGrid />

      {/* Content */}
      <div className="relative z-10 mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 w-full">
          Transform Your Customer Experience
        </h1>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          What are you waiting for? Help your users help themselves with an
          AI-powered chatbot. Get started today and see the difference.
        </p>
        <Button>Let&apos;s Go</Button>
      </div>
    </div>
  );
};

export default HeroCTA;
