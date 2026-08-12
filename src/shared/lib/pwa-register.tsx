"use client"

import { useEffect } from 'react';
import { ROUTES } from '../constants/routes';
import { AppLocale } from './i18n/config';

export const PWARegister = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      navigator.serviceWorker
        .register('/sw.js')
        // .then((registration) => { console.log('✅ Service Worker registered:', registration.scope) })
        .catch((error) => { console.error('❌ Service Worker registration failed:', error) });

      // Prefetch the offline page to cache all of its resources
      const locale: AppLocale = window.location.pathname.startsWith('/ru') ? 'ru' : 'en';
      const offlineUrl = `/${locale}${ROUTES.OFFLINE}`;

      // Create an invisible iframe to load an offline page in the background
      setTimeout(() => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = offlineUrl;
        iframe.onload = () => {
          // Remove the iframe after it loads
          setTimeout(() => iframe.remove(), 1000);
        };
        document.body.appendChild(iframe);
      }, 5000); // Wait 5 seconds after the main page loads
    }
  }, []);

  return null;
};
