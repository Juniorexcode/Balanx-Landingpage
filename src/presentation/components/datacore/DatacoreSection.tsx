import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DatacoreHeroContent } from './DatacoreHeroContent';
import { DatacoreDashboardPreview } from './DatacoreDashboardPreview';
import { DatacoreEarthCanvas } from './DatacoreEarthCanvas';

const GalaxyStarsBackground = () => {
  // Generamos algunas estrellas estáticas en posiciones aleatorias
  const stars = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2,
    animationDelay: `${Math.random() * 4}s`,
  }));

  // Generamos un set de estrellas fugaces en el lado derecho/centro
  const rightShootingStars = Array.from({ length: 5 }).map((_, i) => ({
    id: `shooting-right-${i}`,
    top: `${5 + Math.random() * 30}%`,
    left: `${45 + Math.random() * 45}%`,
    animationDelay: `${Math.random() * 15 + i * 4}s`,
    duration: `${Math.random() * 2 + 5}s`,
  }));

  // Generamos estrellas fugaces que inician más a la izquierda (pero caen igual de derecha a izquierda)
  const leftShootingStars = Array.from({ length: 3 }).map((_, i) => ({
    id: `shooting-left-${i}`,
    top: `${-10 + Math.random() * 20}%`, // Más arriba
    left: `${15 + Math.random() * 25}%`, // Más a la izquierda
    animationDelay: `${Math.random() * 12 + i * 5}s`,
    duration: `${Math.random() * 2 + 5}s`,
  }));

  const shootingStars = [...rightShootingStars, ...leftShootingStars];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <style>{`
        .shooting-star {
          position: absolute;
          width: 140px;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
          opacity: 0;
          transform: rotate(145deg); /* Base rotada para evitar líneas horizontales estáticas */
          will-change: transform, opacity;
        }
        .shooting-star::before {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3.5px;
          height: 3.5px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.9), 0 0 30px 5px rgba(168, 85, 247, 0.6);
        }
        /* Animación diagonal unificada de derecha a izquierda */
        @keyframes shooting-diagonal {
          0% {
            transform: translate(350px, -250px) rotate(145deg); /* Comienza completamente fuera del marco (arriba-derecha) */
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          18% {
            opacity: 1;
          }
          25% {
            transform: translate(-1000px, 700px) rotate(145deg); /* Cruza toda la pantalla y sale por abajo-izquierda */
            opacity: 0;
          }
          100% {
            transform: translate(-1000px, 700px) rotate(145deg);
            opacity: 0;
          }
        }
        .animate-shooting-diagonal {
          animation: shooting-diagonal linear infinite;
        }
      `}</style>

      {/* Nebulosa superior izquierda */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px]" />
      {/* Nebulosa central derecha */}
      <div className="absolute top-[30%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-900/10 blur-[150px]" />
      
      {/* Estrellitas */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            animationDuration: '4s'
          }}
        />
      ))}

      {/* Estrellas Fugaces Diagonales */}
      {shootingStars.map((shooting) => (
        <div
          key={shooting.id}
          className="shooting-star animate-shooting-diagonal"
          style={{
            top: shooting.top,
            left: shooting.left,
            animationDelay: shooting.animationDelay,
            animationDuration: shooting.duration,
          }}
        />
      ))}
    </div>
  );
};

export const DatacoreSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dashboard parallax
  const dashboardY = useTransform(scrollYProgress, [0, 1], [150, -50]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-[#0A0614] flex flex-col items-center justify-start pt-24 md:pt-32 pb-[428px] mb-[-300px]">
      
      {/* Galaxy Stars Background */}
      <GalaxyStarsBackground />

      {/* Fade mask at top to prevent hard edges from glowing elements clipping against previous section */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-[#0A0614] to-transparent z-10 pointer-events-none" />

      {/* The interactive Frame-by-Frame Canvas Video */}
      <DatacoreEarthCanvas />

      {/* Content wrapper */}
      <div className="relative z-10 w-full flex flex-col items-center justify-start">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <DatacoreHeroContent />
        </motion.div>
        
        <motion.div 
          style={{ y: dashboardY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          // Reducimos el margen superior aquí para subir el dashboard sin afectar la escena 3D
          className="w-full mt-0 md:-mt-8 px-4"
        >
          <DatacoreDashboardPreview />
        </motion.div>
      </div>
    </section>
  );
};
