"use client";

import dynamic from 'next/dynamic';

export const ModalRootDynamic = dynamic(() => import('./modal-root').then(mod => mod.ModalRoot), {
  ssr: false,
});