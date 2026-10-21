'use client';
import { useState, useEffect } from 'react';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 2200);
    const removeTimer = setTimeout(() => setIsVisible(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B3B60] transition-opacity duration-700 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Blurred Background (Fills the empty space on wide/tall screens) */}
      <img 
        src="/captain.jpg" 
        alt="Lopha Background Blur" 
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-50" 
      />

      {/* 2. Main Image (Ensures the whole matatu is visible without cropping) */}
      <img 
        src="/captain.jpg" 
        alt="Lopha Matatu" 
        className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl" 
      />
      
      {/* 3. Dark Overlay (Ensures the white text is readable against the image) */}
      <div className="absolute inset-0 bg-[#0B3B60]/60" />

      {/* 4. The Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="overflow-hidden mb-2">
          <div className="animate-premium-1 text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            LOPHA
          </div>
        </div>
        
        <div className="overflow-hidden mb-14">
          <div className="animate-premium-2 text-sm md:text-xl font-bold text-white tracking-[0.5em] uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            Travels
          </div>
        </div>
        
        <div className="animate-premium-3 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <p className="text-[10px] md:text-xs text-white/90 font-bold tracking-[0.2em] uppercase drop-shadow-md">
            Securing
          </p>
        </div>
      </div>
    </div>
  );
}