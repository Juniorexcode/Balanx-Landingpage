import React, { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export const DatacoreEarthCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Rotate the sphere manually based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (splineAppRef.current) {
      // Find the sphere object by its exact name in Spline ("Sphere")
      const sphere = splineAppRef.current.findObjectByName('Sphere');
      if (sphere) {
        // Rotate smoothly (Math.PI * 2 gives a full rotation)
        sphere.rotation.y = latest * Math.PI * 2;
      }
    }
  });

  const onLoad = (splineApp: any) => {
    splineAppRef.current = splineApp;

    // 1. Alejar la cámara nativa de Spline (0.8) expande el área de visión y EVITA
    // categóricamente que el motor 3D recorte la esfera en los bordes (clipping).
    splineApp.setZoom(0.8);

    const sphere = splineApp.findObjectByName('Sphere');
    if (sphere) {
      // Subimos el planeta en el espacio 3D (de -768.6 a -550) para que entre
      // COMPLETAMENTE dentro de la zona de renderizado de la cámara de Spline.
      sphere.position.y = -480;
    }

    setIsLoaded(true);
  };

  return (
    <div ref={containerRef} className="absolute top-0 left-0 right-0 h-[calc(100%-300px)] z-0 pointer-events-none overflow-visible">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        // 2. Creamos un canvas GIGANTESCO (250vw). 
        // Aunque hicimos zoom out en 3D, este canvas masivo hace que el planeta 
        // se vea inmenso en pantalla (como un Domo) sin perder absolutamente nada de calidad.
        className="absolute left-1/2 top-1/2 w-[300vw] h-[300vh] min-w-[2500px] min-h-[2500px] mix-blend-screen"
        style={{
          // 3. Usamos CSS puro para centrar y bajar el planeta en 2D, ignorando las coordenadas 3D.
          // -50%, -50% lo dejaría en su posición nativa (a la izquierda).
          // Usar 0% en X: Mantiene tu centrado horizontal manual.
          // Usar -12% en Y: Compensamos la subida de la esfera en 3D bajando el canvas un poco por CSS
          // para mantener exactamente la misma altura visual que elegiste.
          transform: 'translate(-3.5%, -10%) scale(1.3)'
        }}
      >
        <Spline
          scene="/scene.splinecode"
          onLoad={onLoad}
          className="w-full h-full"
        />

        {/* Glow sutil para potenciar el aura del planeta */}
        <div className="absolute inset-0 shadow-[inset_0_-150px_200px_-50px_rgba(139,92,246,0.2)] pointer-events-none" />
      </motion.div>
    </div>
  );
};


