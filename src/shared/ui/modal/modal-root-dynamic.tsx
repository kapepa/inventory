"use client";

import dynamic from 'next/dynamic';

export const ModalRootDynamic = dynamic(() => import('@/shared').then(mod => mod.ModalRoot), {
  ssr: false,
});