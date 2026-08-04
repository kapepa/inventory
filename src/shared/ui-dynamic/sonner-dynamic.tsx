"use client";

import dynamic from 'next/dynamic';

export const ToasterDynamic = dynamic(() => import('../ui/sonner').then(mod => mod.Toaster), {
  ssr: false,
});