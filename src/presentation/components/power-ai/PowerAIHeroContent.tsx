import React from 'react';
import { motion } from 'framer-motion';

export const PowerAIHeroContent: React.FC = () => {
  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-general font-normal text-[100px] md:text-[220px] leading-[1.02] tracking-[-0.024em]"
      >
        <span className="text-foreground">Balanx </span>
        <span 
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(to left, #6366f1, #a855f7, #fcd34d)' }}
        >
          AI
        </span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-hero-sub font-geist text-lg leading-8 max-w-md mt-[9px] opacity-80"
      >
        The most powerful AI ever deployed<br/>in modern banking and finance
      </motion.p>

      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mt-[25px] bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white rounded-full px-[29px] py-[24px] text-base font-geist transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
      >
        Open an Account
      </motion.button>
    </div>
  );
};
