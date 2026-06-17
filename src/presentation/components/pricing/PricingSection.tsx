import React from 'react';
import { motion } from 'framer-motion';
import './PricingSection.css';

interface PricingTicketProps {
  plan: 'Free' | 'Pro' | 'Ultra';
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  isPopular?: boolean;
  benefits: { label: string; value: string }[];
  accentColor: string;
  bgColor: string;
  bgLightColor: string;
  glowColor: string;
}

const PricingTicket: React.FC<PricingTicketProps> = ({ 
  plan, 
  title, 
  price, 
  oldPrice, 
  discount, 
  isPopular, 
  benefits, 
  accentColor, 
  bgColor,
  bgLightColor,
  glowColor
}) => {
  return (
    <div 
      className={`ticket-wrapper ${isPopular ? 'popular-ticket' : ''}`} 
      style={{ 
        '--t-accent': accentColor, 
        '--t-bg': bgColor, 
        '--t-bg-light': bgLightColor,
        '--t-accent-glow': glowColor
      } as React.CSSProperties}
    >
      {isPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#a855f7] text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] z-50 shadow-[0_0_20px_rgba(168,85,247,0.8)] border border-white/20">
          Best Offer
        </div>
      )}
      <div className="ticket">
        <div className="t-main">
          <div className="t-content">
            <div className="t-header">
              <div className="t-logo">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                BALANX
              </div>
              <div className="t-type">{plan} Tier</div>
            </div>
            
            <div className="t-title">{title}</div>
            
            <div className="t-subtitle h-16">
              {oldPrice && discount ? (
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-gray-400 line-through text-lg font-medium">{oldPrice}</span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      {discount} OFF
                    </span>
                  </div>
                  <div className="text-4xl font-black text-white">{price} <span className="text-sm font-normal text-gray-400">/mo</span></div>
                </div>
              ) : (
                <div className="text-4xl font-black text-white mt-5">{price} <span className="text-sm font-normal text-gray-400">/mo</span></div>
              )}
            </div>
            
            <div className="t-details mt-6">
              {benefits.map((b, i) => (
                <div className="t-detail-item" key={i}>
                  <span className="t-label">{b.label}</span>
                  <span className="t-value">{b.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="t-perforation">
            <div className="t-perf-line" />
          </div>
        </div>
        <div className="t-stub">
          <div className="t-barcode-container">
            <div className="t-barcode" />
            <div className="t-barcode-id">BLX-26-{plan.toUpperCase()}</div>
          </div>
          <div className="t-admit">
            <div className="t-admit-text">Access</div>
            <div className="t-admit-num">GO</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PricingSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0A0614] py-32 relative overflow-hidden flex flex-col items-center z-10" id="pricing">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-[#0A0614] to-[#0A0614] pointer-events-none -z-10"></div>
      
      {/* Decorative floating background elements - Space Theme */}
      {/* Blurred background orbs */}
      <motion.div
        className="absolute top-20 left-10 md:left-20 w-32 h-32 md:w-48 md:h-48 rounded-full border border-purple-500/20 bg-purple-500/5 blur-xl -z-10"
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-10 md:right-20 w-48 h-48 md:w-64 md:h-64 rounded-full border border-pink-500/20 bg-pink-500/5 blur-2xl -z-10"
        animate={{ y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating Rocket */}
      <motion.div
        className="absolute top-40 left-[10%] opacity-20 blur-[1px] -z-10 text-white/50"
        animate={{ y: [0, -40, 0], x: [0, 10, 0], rotate: [45, 50, 45] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
      </motion.div>

      {/* Floating Ringed Planet */}
      <motion.div
        className="absolute top-20 right-[15%] opacity-10 blur-[2px] -z-10 text-teal-400"
        animate={{ y: [0, 25, 0], rotate: [-10, 5, -10] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8"/>
          <ellipse cx="12" cy="12" rx="12" ry="4" transform="rotate(-20 12 12)"/>
        </svg>
      </motion.div>

      {/* Scattered Stars / Dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white -z-10"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            top: Math.random() * 90 + 5 + '%',
            left: Math.random() * 90 + 5 + '%',
            opacity: Math.random() * 0.3 + 0.1,
            boxShadow: `0 0 10px 2px rgba(255, 255, 255, 0.2)`
          }}
          animate={{ 
            y: [0, Math.random() * -30 - 10, 0], 
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 5 
          }}
        />
      ))}

      {/* Floating Space Rocks/Asteroids */}
      <motion.div
        className="absolute bottom-[20%] left-[5%] opacity-15 blur-[1px] -z-10 text-purple-300"
        animate={{ y: [0, 30, 0], x: [0, -15, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l7 5v10l-7 5-7-5V7z" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-[40%] right-[5%] opacity-10 blur-[1px] -z-10 text-pink-300"
        animate={{ y: [0, -20, 0], x: [0, 20, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 22 8.5 18.5 20 5.5 20 2 8.5" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <div className="text-center mb-24 px-6 relative z-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-md mb-6">
          Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Power</span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto md:text-lg">
          Unlock advanced dashboard analytics, custom card limits, and global banking benefits scaled for your business.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-10 xl:gap-16 px-6 max-w-7xl mx-auto w-full">
        <PricingTicket 
          plan="Free"
          title="Starter"
          price="$0"
          accentColor="#14b8a6"
          bgColor="#0c1214"
          bgLightColor="#121a1d"
          glowColor="rgba(20, 184, 166, 0.4)"
          benefits={[
            { label: "Virtual Cards", value: "Up to 5" },
            { label: "Dashboard", value: "Basic Analytics" },
            { label: "Transfers", value: "Standard Rate" },
            { label: "Support", value: "Community" }
          ]}
        />
        
        <PricingTicket 
          plan="Pro"
          title="Business"
          price="$40"
          oldPrice="$50"
          discount="20%"
          isPopular={true}
          accentColor="#a855f7"
          bgColor="#150a21"
          bgLightColor="#1c0f2e"
          glowColor="rgba(168, 85, 247, 0.6)"
          benefits={[
            { label: "Virtual Cards", value: "Unlimited" },
            { label: "Dashboard", value: "Real-time AI Insights" },
            { label: "Transfers", value: "Zero Fees globally" },
            { label: "Rewards", value: "2% Cashback" },
            { label: "Support", value: "24/7 Priority" }
          ]}
        />
        
        <PricingTicket 
          plan="Ultra"
          title="Enterprise"
          price="$199"
          accentColor="#ec4899"
          bgColor="#1a0a13"
          bgLightColor="#240e1a"
          glowColor="rgba(236, 72, 153, 0.4)"
          benefits={[
            { label: "Virtual Cards", value: "Unlimited + Physical" },
            { label: "Dashboard", value: "Custom API & Webhooks" },
            { label: "Transfers", value: "Institutional Rates" },
            { label: "Rewards", value: "4% Cashback + Lounge" },
            { label: "Account Manager", value: "Dedicated" }
          ]}
        />
      </div>
    </section>
  );
};
