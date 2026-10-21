'use client';
import { useState, useEffect } from 'react';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2.2 seconds (giving time for animations to play)
    const fadeTimer = setTimeout(() => setIsFading(true), 2200);
    // Remove entirely after 2.7 seconds
    const removeTimer = setTimeout(() => setIsVisible(false), 2700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#141414] transition-opacity duration-500 ease-in-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Glowing Background Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lopha-mint rounded-full blur-[100px] animate-glow pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Main Logo Text */}
        <div className="overflow-hidden mb-2">
          <div className="animate-premium-1 text-5xl md:text-6xl font-bold tracking-tighter text-white">
            LOPHA
          </div>
        </div>
        
        {/* Subtitle */}
        <div className="overflow-hidden mb-10">
          <div className="animate-premium-2 text-sm md:text-base font-semibold text-lopha-mint tracking-[0.4em] uppercase">
            Travels
          </div>
        </div>
        
        {/* Modern SVG Circular Loader */}
        <div className="animate-premium-3 flex flex-col items-center gap-4">
          <svg className="w-10 h-10 text-lopha-mint animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="16" opacity="0.3"/>
            <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className="text-xs text-gray-500 font-medium tracking-widest uppercase">
            Initializing
          </p>
        </div>
        
      </div>
    </div>
  );
}