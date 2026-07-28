"use client";

import dynamic from 'next/dynamic';

export const ToasterDynamic = dynamic(() => import('./sonner').then(mod => mod.Toaster), {
  ssr: false,
});