import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';

export const PowerAINavbar: React.FC = () => {
  return (
    <div className="relative z-20 w-full">
      <nav className="w-full py-5 px-8 flex flex-row items-center justify-between font-geist text-foreground/90">
        {/* Left: logo image */}
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <span className="font-geist font-bold text-white text-lg leading-none">B</span>
          </div>
          <span className="font-geist font-bold text-xl text-foreground tracking-tight">
            alanx
          </span>
        </div>

        {/* Center: nav items */}
        <div className="hidden md:flex flex-row items-center gap-8 text-sm">
          <Link 
            to="features-section" 
            smooth={true} 
            duration={800} 
            className="cursor-pointer hover:text-white transition-colors duration-200"
          >
            Features
          </Link>
          <button className="hover:text-white transition-colors duration-200">
            Solutions
          </button>
          <Link 
            to="pricing" 
            smooth={true} 
            duration={800} 
            className="cursor-pointer hover:text-white transition-colors duration-200"
          >
            Plans
          </Link>
          <button className="flex items-center gap-1 hover:text-white transition-colors duration-200">
            Learning <ChevronDown size={14} />
          </button>
          <Link 
            to="dashboard-section" 
            smooth={true} 
            duration={800} 
            className="cursor-pointer hover:text-white transition-colors duration-200"
          >
            Dashboard
          </Link>
        </div>

        {/* Right: Sign Up */}
        <div className="flex items-center">
          <button className="bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-2 text-sm transition-all duration-200 backdrop-blur-sm border border-white/5">
            Sign Up
          </button>
        </div>
      </nav>
      {/* 1px divider line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent mt-[3px]" />
    </div>
  );
};
