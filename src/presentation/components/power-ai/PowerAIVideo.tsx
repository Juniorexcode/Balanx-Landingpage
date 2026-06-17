import React, { useRef, useEffect } from 'react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4";

export const PowerAIVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    const fadeDuration = 0.5; // 500ms

    const updateOpacity = () => {
      if (!video) return;
      const duration = video.duration;
      const currentTime = video.currentTime;
      
      if (isNaN(duration)) {
        rafId = requestAnimationFrame(updateOpacity);
        return;
      }

      let opacity = 1;
      if (currentTime < fadeDuration) {
        opacity = currentTime / fadeDuration;
      } else if (duration - currentTime < fadeDuration) {
        opacity = (duration - currentTime) / fadeDuration;
      }

      video.style.opacity = Math.max(0, Math.min(1, opacity)).toString();
      rafId = requestAnimationFrame(updateOpacity);
    };

    const handlePlay = () => {
      rafId = requestAnimationFrame(updateOpacity);
    };

    const handleEnded = () => {
      if (!video) return;
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(console.error);
      }, 100);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);
    
    // Auto-start video with 0 opacity
    video.style.opacity = '0';
    video.play().catch(console.error);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        className="w-full h-full object-cover"
        muted
        playsInline
      />
      {/* Blurred overlay shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[984px] h-[527px] opacity-90 bg-gray-950 blur-[82px] pointer-events-none z-0" />
    </div>
  );
};
