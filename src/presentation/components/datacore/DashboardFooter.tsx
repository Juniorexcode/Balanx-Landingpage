import React from 'react';

export const DashboardFooter: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#05030A] border-t border-white/5 pt-20 pb-12 overflow-hidden z-10">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start gap-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                B
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                Balanx
              </span>
            </div>
            <p className="text-white/40 text-sm max-w-sm font-light leading-relaxed">
              The next-generation AI agent platform handling balance management, transfers, and predictive financial insights natively.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/30 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300">
                <span className="text-xs">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/30 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300">
                <span className="text-xs">git</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/30 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300">
                <span className="text-xs">dsc</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Product
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/50 font-light">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Balances</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Intelligent Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Transfers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Power AI</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Resources
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/50 font-light">
              <li><a href="#" className="hover:text-white transition-colors duration-300">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">System Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Security Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Compliance & Trust</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/50 font-light">
              <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Press Kit</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Support</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/30 font-light">
          <p>© {new Date().getFullYear()} Balanx Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/60 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
