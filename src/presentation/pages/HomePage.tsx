import React from 'react';
import { PowerAISection } from '../components/power-ai/PowerAISection';
import { FeaturesCardsSection } from '../components/datacore/FeaturesCardsSection';
import { DatacoreSection } from '../components/datacore/DatacoreSection';
import { PricingSection } from '../components/pricing/PricingSection';
import { DashboardFooter } from '../components/datacore/DashboardFooter';
import { PowerAIVideo } from '../components/power-ai/PowerAIVideo';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full bg-[#0A0614] overflow-x-clip">
      {/* Power AI Section with its own absolute background video */}
      <div className="relative w-full min-h-screen">
        <PowerAIVideo />
        <PowerAISection />
      </div>

      {/* Intermediate Features Cards Section with scroll animation */}
      <FeaturesCardsSection />

      {/* Datacore Section handles its own scroll-driven animations */}
      <DatacoreSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Dashboard Footer */}
      <DashboardFooter />
    </main>
  );
};
