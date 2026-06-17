import React from 'react';

const LOGOS = [
  { name: 'JPMorgan', domain: 'jpmorgan.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Bank of America', domain: 'bankofamerica.com' },
  { name: 'Goldman Sachs', domain: 'goldmansachs.com' },
  { name: 'Visa', domain: 'visa.com' },
  { name: 'Morgan Stanley', domain: 'morganstanley.com' },
  { name: 'Plaid', domain: 'plaid.com' },
];

export const PowerAIMarquee: React.FC = () => {
  const marqueeItems = [...LOGOS, ...LOGOS]; // Duplicate for seamless loop

  return (
    <div className="relative z-10 w-full pb-10 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4 overflow-hidden">
        {/* Left side text */}
        <div className="flex-shrink-0 text-foreground/50 text-sm font-geist text-center md:text-left whitespace-nowrap">
          Trusted by top financial<br />institutions globally
        </div>

        {/* Right side marquee */}
        <div className="flex-1 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div className="flex flex-row items-center gap-16 animate-marquee">
            {marqueeItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 flex-shrink-0">
                <div className="w-7 h-7 rounded-full flex items-center justify-center overflow-hidden bg-white/5 p-1 border border-white/10 relative">
                  <span className="absolute font-geist font-bold text-xs text-white opacity-50">
                    {item.name.charAt(0)}
                  </span>
                  <img 
                    src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`} 
                    alt={item.name} 
                    className="w-full h-full object-contain rounded-full relative z-10" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = '0';
                    }} 
                  />
                </div>
                <span className="font-geist font-semibold text-base text-foreground">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
