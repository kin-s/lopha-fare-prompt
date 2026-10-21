'use client';
import { useState, useEffect } from 'react';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Wait 2.2 seconds, then fade out over 0.8 seconds
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
      {/* 1. The Matatu Background Image - Now 100% visible */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/matatu-bg.jpg')" }}
      />
      
      {/* 2. Subtle Overlay - Darkens only the very top/bottom to keep text readable without hiding the image */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B3B60]/90 via-black/30 to-[#0B3B60]/90" />

      {/* 3. The Content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Main Logo Text */}
        <div className="overflow-hidden mb-2">
          <div className="animate-premium-1 text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            LOPHA
          </div>
        </div>
        
        {/* Subtitle */}
        <div className="overflow-hidden mb-14">
          <div className="animate-premium-2 text-sm md:text-xl font-bold text-white tracking-[0.5em] uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            Travels
          </div>
        </div>
        
        {/* Smooth Circular Loader */}
        <div className="animate-premium-3 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          <p className="text-[10px] md:text-xs text-white/90 font-bold tracking-[0.2em] uppercase drop-shadow-md">
            Securing...
          </p>
        </div>
        
      </div>
    </div>
  );
}