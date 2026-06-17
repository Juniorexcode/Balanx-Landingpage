import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// Simple particles overlay component
const ParticlesOverlay = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, 800],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Resolve Vite assets dynamically using glob
const frameModules = import.meta.glob('/src/assets/Bank_cards_falling_frames/*.jpg', { eager: true });

export const FeaturesCardsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userCount, setUserCount] = useState("2,450,498");
  const [growth, setGrowth] = useState("+15.4%");
  const [isAtIntro, setIsAtIntro] = useState(true);

  useEffect(() => {
    let baseUsers = 2450498;
    const interval = setInterval(() => {
      baseUsers += Math.floor(Math.random() * 5);
      setUserCount(baseUsers.toLocaleString());
      setGrowth("+" + (15.4 + (Math.random() * 0.1)).toFixed(1) + "%");
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Extract and sort valid URLs to ensure no missing frames (holes)
  const imageUrls = useMemo(() => {
    return Object.keys(frameModules)
      .sort() // Ensure alphabetical order
      .map((key) => (frameModules[key] as any).default)
      .filter(Boolean);
  }, []);

  const TOTAL_FRAMES = imageUrls.length;

  // Track scroll inside the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate text fades based on scroll progress
  const introOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0], { clamp: true });
  const introY = useTransform(scrollYProgress, [0, 0.02], [0, -50]);
  const introScale = useTransform(scrollYProgress, [0, 0.02], [1, 0.95]);
  const introPointerEvents = useTransform(scrollYProgress, (v) => v > 0.02 ? "none" : "auto");
  const introDisplay = useTransform(scrollYProgress, (v) => v > 0.02 ? "none" : "flex");

  const cardOpacity1 = useTransform(scrollYProgress, [0.05, 0.15, 0.40, 0.45], [0, 1, 1, 0]);
  const cardY1 = useTransform(scrollYProgress, [0.05, 0.15, 0.40, 0.45], [50, 0, 0, -50]);

  const cardOpacity2 = useTransform(scrollYProgress, [0.10, 0.20, 0.40, 0.45], [0, 1, 1, 0]);
  const cardY2 = useTransform(scrollYProgress, [0.10, 0.20, 0.40, 0.45], [50, 0, 0, -50]);

  const cardOpacity3 = useTransform(scrollYProgress, [0.15, 0.25, 0.40, 0.45], [0, 1, 1, 0]);
  const cardY3 = useTransform(scrollYProgress, [0.15, 0.25, 0.40, 0.45], [50, 0, 0, -50]);

  const cardOpacity4 = useTransform(scrollYProgress, [0.55, 0.65, 0.90, 0.95], [0, 1, 1, 0]);
  const cardY4 = useTransform(scrollYProgress, [0.55, 0.65, 0.90, 0.95], [50, 0, 0, -50]);

  const cardOpacity5 = useTransform(scrollYProgress, [0.60, 0.70, 0.90, 0.95], [0, 1, 1, 0]);
  const cardY5 = useTransform(scrollYProgress, [0.60, 0.70, 0.90, 0.95], [50, 0, 0, -50]);

  const cardOpacity6 = useTransform(scrollYProgress, [0.65, 0.75, 0.90, 0.95], [0, 1, 1, 0]);
  const cardY6 = useTransform(scrollYProgress, [0.65, 0.75, 0.90, 0.95], [50, 0, 0, -50]);

  // Preload all frames on mount
  useEffect(() => {
    if (TOTAL_FRAMES === 0) {
      setIsLoaded(true);
      return;
    }
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;
    
    imageUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages[i] = img;
    });
  }, [imageUrls, TOTAL_FRAMES]);

  const drawImage = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = images[index];
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fit maintaining aspect ratio (object-contain equivalent) to ensure ALL cards are visible without cropping
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    // Erase bottom-right watermark on canvas (mix-blend-screen makes black transparent)
    const watermarkWidth = img.width * 0.2;
    const watermarkHeight = img.height * 0.25;
    const watermarkX = x + (img.width * 0.8) * scale;
    const watermarkY = y + (img.height * 0.75) * scale;
    
    ctx.fillStyle = "black";
    ctx.fillRect(watermarkX, watermarkY, watermarkWidth * scale, watermarkHeight * scale);
  };

  // Redraw when canvas or scroll updates
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;
    
    if (latest < 0.02 && !isAtIntro) setIsAtIntro(true);
    else if (latest >= 0.02 && isAtIntro) setIsAtIntro(false);

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latest * TOTAL_FRAMES))
    );
    requestAnimationFrame(() => drawImage(frameIndex));
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // We set canvas internal resolution to match bounds
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      if (isLoaded && images.length > 0) {
        const latest = scrollYProgress.get();
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(latest * TOTAL_FRAMES))
        );
        drawImage(frameIndex);
      }
    };

    window.addEventListener('resize', handleResize);
    // Draw initial frame once loaded
    if (isLoaded) {
      handleResize();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images, TOTAL_FRAMES, scrollYProgress]);

  return (
    <div id="features-section" ref={containerRef} className="relative w-full h-[500vh] bg-black">
      {/* Sticky container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* Full Screen Canvas Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full mix-blend-screen pointer-events-none"
          />
          {/* Ambient Glows to blend canvas edges gently */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none opacity-40" />
        </div>

        {/* Particles Effect Overlay */}
        <ParticlesOverlay />

        {/* Loading Spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
            <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4" />
            <p className="text-purple-300 font-medium tracking-wide">
              Loading cards sequence... {Math.round((loadedCount / Math.max(TOTAL_FRAMES, 1)) * 100)}%
            </p>
          </div>
        )}

        {/* Foreground Content */}
        <div className="relative z-10 w-full h-full pointer-events-none">
          
          {/* Features Title */}
          <div className="absolute top-8 left-0 w-full flex justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
              Features
            </h2>
          </div>

          {/* Introductory Mini-Dashboard (Center) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-5xl px-6">
            <motion.div
              style={{ opacity: introOpacity, y: introY, scale: introScale, pointerEvents: introPointerEvents as any, display: introDisplay as any }}
              className="flex flex-col items-center gap-8 w-full"
            >
              {/* Background Chart full screen */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] -z-10 opacity-30 pointer-events-none flex items-center justify-center">
                <svg className="w-full h-[60vh]" viewBox="0 0 1000 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="bg-chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0A0614" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="line-chart-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#d8b4fe" />
                      <stop offset="50%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <clipPath id="chart-clip">
                      {isAtIntro && (
                        <motion.rect 
                          key="chart-anim"
                          x="0" y="0" height="400" 
                          initial={{ width: 0 }} 
                          animate={{ width: 1000 }} 
                          transition={{ duration: 2.5, ease: "easeInOut" }}
                        />
                      )}
                    </clipPath>
                  </defs>
                  <g clipPath="url(#chart-clip)">
                    <path d="M0,250 C150,200 250,280 400,150 C550,20 650,220 800,100 C880,40 920,80 980,30 L980,300 L0,300 Z" fill="url(#bg-chart-grad)" />
                    
                    <g opacity="0.6">
                      {/* Column Group 1 */}
                      <line x1="110" y1="300" x2="110" y2="230" stroke="#d8b4fe" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="120" y1="300" x2="120" y2="215" stroke="#d8b4fe" strokeWidth="2" strokeDasharray="4 4" />
                      <line x1="130" y1="300" x2="130" y2="225" stroke="#d8b4fe" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                      
                      {/* Column Group 2 */}
                      <line x1="440" y1="300" x2="440" y2="120" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="450" y1="300" x2="450" y2="90" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 4" />
                      <line x1="460" y1="300" x2="460" y2="105" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                      
                      {/* Column Group 3 */}
                      <line x1="820" y1="300" x2="820" y2="95" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="830" y1="300" x2="830" y2="75" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="4 4" />
                      <line x1="840" y1="300" x2="840" y2="85" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                    </g>

                    <path d="M0,250 C150,200 250,280 400,150 C550,20 650,220 800,100 C880,40 920,80 980,30" fill="none" stroke="url(#line-chart-grad)" strokeWidth="4" filter="url(#neon-glow)" />
                    <path d="M0,250 C150,200 250,280 400,150 C550,20 650,220 800,100 C880,40 920,80 980,30" fill="none" stroke="url(#line-chart-grad)" strokeWidth="2" />
                    
                    <circle cx="980" cy="30" r="6" fill="#2dd4bf" filter="url(#neon-glow)" />
                    <circle cx="980" cy="30" r="3" fill="#ffffff" />
                  </g>
                </svg>
              </div>

              <div className="text-center">
                <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">High-Performance Issuing</h3>
                <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base font-light">Create and deploy customized virtual and physical corporate cards instantly with dynamic limits and full control.</p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full">
                {/* Left Side: Stats Widget */}
                <div className="group relative w-80 md:w-96 overflow-hidden rounded-2xl bg-[#090414]/90 backdrop-blur-3xl border border-purple-500/30 p-6 md:p-8 font-sans shadow-2xl">
                <div className="absolute -top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl transition-all duration-700 group-hover:bg-purple-500/15" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-start justify-between border-b border-purple-500/20 pb-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-400/10 border border-purple-500/20 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                          <path d="M3 10l18 0" />
                          <path d="M7 15l.01 0" />
                          <path d="M11 15l2 0" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-white md:text-lg">Custom Virtual Card</p>
                        <p className="text-xs text-white/50 flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Active & Ready
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex divide-x divide-purple-500/20">
                    <div className="flex-1 pr-6">
                      <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Limit</p>
                      <p className="text-2xl font-bold text-white tracking-tight">$15,000</p>
                      <p className="mt-1 text-[10px] font-semibold tracking-wider uppercase text-emerald-400">Available</p>
                    </div>
                    <div className="flex-1 pl-6">
                      <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Spent</p>
                      <p className="text-2xl font-bold text-white tracking-tight">$4,250</p>
                      <p className="mt-1 text-[10px] font-semibold tracking-wider uppercase text-pink-400">This period</p>
                    </div>
                  </div>
                  <div className="relative h-28 w-full mt-2">
                    <svg className="h-full w-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="aurora-gradient-v2" x1={0} y1={0} x2={0} y2={1}>
                          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <path d="M0,65 C50,20 80,80 150,70 S250,50 300,85" fill="none" stroke="#2dd4bf" strokeWidth={2.5} />
                      <path d="M0,100 L0,65 C50,20 80,80 150,70 S250,50 300,85 L300,100 Z" fill="url(#aurora-gradient-v2)" />
                    </svg>
                    <div className="absolute right-[0px] top-[85px]">
                      <div className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
                      <div className="animate-pulse absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/80" />
                    </div>
                  </div>
                  <div className="border-t border-purple-500/20 pt-5 mt-2">
                    <button className="w-full rounded-xl border border-purple-500/50 bg-purple-500/10 px-4 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                      Configure Policies
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Flip Card (Physical Card) */}
              <div className="group w-[300px] h-[190px] md:w-[340px] md:h-[215px] [perspective:1000px] text-white bg-transparent">
                <div className="relative w-full h-full text-center transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front of Card */}
                  <div className="absolute flex flex-col justify-center w-full h-full [backface-visibility:hidden] rounded-[1.25rem] bg-[#0A0614] border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    {/* Glowing orbs inside card */}
                    <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-500/30 blur-[50px] rounded-full pointer-events-none"></div>
                    <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"></div>
                    
                    <p className="absolute top-5 right-6 tracking-[0.2em] text-[10px] md:text-xs font-bold text-white/80 uppercase">BALANX</p>
                    
                    {/* Card Chip */}
                    <div className="absolute top-10 left-6">
                      <svg className="w-10 h-10 md:w-12 md:h-12 opacity-90" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="8" width="40" height="32" rx="6" fill="url(#chip-grad)" />
                        <path d="M4 16h40M4 32h40M16 8v32M32 8v32" stroke="#854d0e" strokeWidth="1.5" />
                        <rect x="18" y="16" width="12" height="16" rx="2" stroke="#854d0e" strokeWidth="1.5" />
                        <defs>
                          <linearGradient id="chip-grad" x1="4" y1="8" x2="44" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fef08a" />
                            <stop offset="1" stopColor="#ca8a04" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Contactless Icon */}
                    <div className="absolute top-[52px] left-[76px] md:left-[84px]">
                       <svg className="w-5 h-5 md:w-6 md:h-6 text-white opacity-70 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M5.5 16C3.5 13 3.5 11 5.5 8M9.5 19.5c-3.5-5-3.5-10 0-15M14 22c-4.5-6-4.5-12 0-18M18.5 24.5c-5.5-7-5.5-14 0-21" />
                       </svg>
                    </div>

                    <p className="absolute top-[90px] md:top-[105px] left-6 font-mono font-bold text-base md:text-lg tracking-[0.2em] text-white drop-shadow-md">
                      9759 2484 5269 6576
                    </p>
                    
                    <div className="absolute bottom-6 left-6 flex flex-col items-start">
                       <p className="text-[6px] md:text-[8px] font-bold text-white/50 tracking-widest mb-0.5">VALID THRU</p>
                       <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-white/90">12/24</p>
                    </div>

                    <p className="absolute bottom-6 left-[80px] md:left-[90px] font-bold text-xs md:text-sm tracking-widest text-white/90 uppercase">
                      BRUCE WAYNE
                    </p>
                    
                    {/* Mastercard Logo */}
                    <svg className="absolute bottom-5 right-5 w-10 h-10 md:w-12 md:h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                      <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                      <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
                    </svg>
                  </div>
                  
                  {/* Back of Card */}
                  <div className="absolute flex flex-col justify-center w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[1.25rem] bg-[#0A0614] border border-white/10 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    {/* Magnetic Strip */}
                    <div className="absolute top-6 md:top-8 w-full h-10 md:h-12 bg-black bg-[repeating-linear-gradient(45deg,#1a1a1a,#1a1a1a_10px,#000_10px,#000_20px)] shadow-inner"></div>
                    
                    {/* Signature Panel */}
                    <div className="absolute top-[85px] md:top-[100px] left-4 md:left-6 w-[65%] h-8 md:h-10 bg-white/90 rounded flex items-center justify-end px-3">
                       <p className="text-black font-mono font-bold text-sm italic">***</p>
                    </div>

                    {/* CVV Panel */}
                    <div className="absolute top-[85px] md:top-[100px] left-[72%] md:left-[75%] w-[20%] h-8 md:h-10 bg-white/90 rounded flex items-center justify-center">
                       <p className="text-black font-mono font-bold text-sm">456</p>
                    </div>
                    
                    <p className="absolute bottom-5 left-4 md:left-6 text-[8px] md:text-[9px] text-white/40 max-w-[80%] text-left leading-relaxed">
                      This card is issued by Balanx Financial pursuant to a license from Mastercard International Incorporated. Use of this card is governed by the cardholder agreement.
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          </div>

          {/* Intro Stats Widget (Bottom Right) */}
          <motion.div 
            style={{ opacity: introOpacity, pointerEvents: introPointerEvents as any, display: introDisplay as any }}
            className="absolute bottom-28 right-8 md:bottom-36 md:right-16 z-20 p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(168,85,247,0.25)] flex flex-col gap-2 min-w-[260px]"
          >
            <div className="flex justify-between items-center w-full mb-1">
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Registered Users</span>
              <span className="text-emerald-400 text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE
              </span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-white text-3xl font-black tracking-tighter">{userCount}</span>
              <span className="text-white/40 text-sm font-medium">TOTAL</span>
            </div>
            
            <div className="flex justify-between items-center w-full mt-2">
              <span className="text-white/50 text-xs font-medium">Growth: <span className="text-white">{growth}</span></span>
              <span className="text-purple-400 text-xs font-bold">Steady</span>
            </div>

            <div className="w-full bg-white/5 h-1.5 rounded-full mt-1 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 h-full rounded-full"
                animate={{ width: ["10%", "100%", "10%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Card 1: Security (Top Left) */}
          <motion.div
            style={{ opacity: cardOpacity1, y: cardY1 }}
            className="absolute top-16 left-6 md:top-24 md:left-16 w-[90%] max-w-sm md:max-w-md p-8 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(168,85,247,0.25)] flex flex-col items-start gap-4 pointer-events-auto"
          >
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-semibold tracking-wider text-purple-300 uppercase">
              Secure Core
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Bank-Grade Cryptography
            </h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
              Every transaction is signed using hardware-isolated private keys. Multi-party computation (MPC) and real-time anomaly detection safeguard your balance sheet against unauthorized access.
            </p>
          </motion.div>

          {/* Card 2: Transfer Optimization (Center Right) */}
          <motion.div
            style={{ opacity: cardOpacity2, y: cardY2 }}
            className="absolute top-[40%] right-6 md:right-16 w-[90%] max-w-sm md:max-w-md p-8 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(168,85,247,0.25)] flex flex-col items-start gap-4 pointer-events-auto"
          >
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs font-semibold tracking-wider text-blue-300 uppercase">
              Lightning Route
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Sub-Second Global Routing
            </h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
              Cross-border payments optimized dynamically. Our intelligent liquidity routing system checks dozens of paths simultaneously to settle international wires in a fraction of a second.
            </p>
          </motion.div>

          {/* Card 3: Card Cascades (Bottom Left) */}
          <motion.div
            style={{ opacity: cardOpacity3, y: cardY3 }}
            className="absolute bottom-16 left-6 md:bottom-24 md:left-16 w-[90%] max-w-sm md:max-w-md p-8 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(168,85,247,0.25)] flex flex-col items-start gap-4 pointer-events-auto"
          >
            <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-xs font-semibold tracking-wider text-pink-300 uppercase">
              Intelligent Cards
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Dynamic Virtual Cards
            </h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
              Instantly issue virtual debit cards with granular spending policies. Define limits per merchant, authorize automated AI-agent budgets, and freeze/unfreeze with one click.
            </p>
          </motion.div>

          {/* Card 4: Global Issuing (Top Right) */}
          <motion.div
            style={{ opacity: cardOpacity4, y: cardY4 }}
            className="absolute top-16 right-6 md:top-24 md:right-16 w-[90%] max-w-sm md:max-w-md p-8 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(168,85,247,0.25)] flex flex-col items-start gap-4 pointer-events-auto"
          >
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold tracking-wider text-emerald-300 uppercase">
              Global Scale
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Instant Global Issuing
            </h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
              Deploy virtual cards globally in milliseconds with multi-currency support and local BINs. Stop worrying about exchange rates and border restrictions.
            </p>
          </motion.div>

          {/* Card 5: Automated Reconciliation (Center Left) */}
          <motion.div
            style={{ opacity: cardOpacity5, y: cardY5 }}
            className="absolute top-[40%] left-6 md:left-16 w-[90%] max-w-sm md:max-w-md p-8 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(168,85,247,0.25)] flex flex-col items-start gap-4 pointer-events-auto"
          >
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs font-semibold tracking-wider text-cyan-300 uppercase">
              Smart Accounting
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Automated Reconciliation
            </h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
              Eliminate manual bookkeeping forever. Every single transaction is auto-categorized in real-time and synced directly to your preferred ERP system.
            </p>
          </motion.div>

          {/* Card 6: Merchant Controls (Bottom Right) */}
          <motion.div
            style={{ opacity: cardOpacity6, y: cardY6 }}
            className="absolute bottom-48 right-6 md:bottom-56 md:right-16 w-[90%] max-w-sm md:max-w-md p-8 rounded-2xl bg-purple-950/20 border border-purple-500/30 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(168,85,247,0.25)] flex flex-col items-start gap-4 pointer-events-auto"
          >
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-xs font-semibold tracking-wider text-amber-300 uppercase">
              Granular Control
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Merchant Whitelisting
            </h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
              Whitelist or block specific merchants, MCC codes, and geographic regions dynamically. Prevent rogue spending before it even attempts authorization.
            </p>
          </motion.div>

        </div>

      </div>

      {/* Fade out transition at the very bottom of the 500vh scroll container */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent to-[#0A0614] pointer-events-none z-50" />
    </div>
  );
};
