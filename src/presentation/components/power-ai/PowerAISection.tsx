import React from 'react';
import { PowerAINavbar } from './PowerAINavbar';
import { PowerAIHeroContent } from './PowerAIHeroContent';
import { PowerAIMarquee } from './PowerAIMarquee';

export const PowerAISection: React.FC = () => {
  return (
    <section id="power-ai-section" className="relative min-h-screen flex flex-col bg-transparent overflow-hidden">
      <PowerAINavbar />
      <PowerAIHeroContent />
      <PowerAIMarquee />
    </section>
  );
};
