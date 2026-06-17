import React from 'react';
import { motion } from 'framer-motion';

export const DatacoreHeroContent: React.FC = () => {
  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 mt-32 md:mt-0">
      <motion.div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        <span className="text-sm font-medium tracking-wide text-white/80">Balanx AI Dashboard</span>
      </motion.div>

      <motion.h1
        className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 max-w-5xl text-white"
      >
        Automate repetitive. <br />
        <span className="italic font-serif text-white/90">Focus on growth.</span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl font-light"
      >
        The next-generation AI agent platform that handles balance management, 
        transfers, and predictive financial insights while you build.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <button className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]">
          Get Started Free
        </button>
        <button className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium backdrop-blur-md border border-white/10 transition-all">
          Watch 2min Demo
        </button>
      </motion.div>
    </div>
  );
};
