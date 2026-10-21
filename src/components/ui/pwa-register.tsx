'use client';

import { useEffect } from 'react';

export function PWARegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register immediately instead of waiting for the load event
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('✅ ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((err) => {
          console.log('❌ ServiceWorker registration failed: ', err);
        });
    }
  }, []);

  return null;
}