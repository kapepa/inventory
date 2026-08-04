"use client";

import dynamic from 'next/dynamic';

export const StateMessageDynamic = dynamic(() => import('../ui/state-message').then(mod => mod.StateMessage), {
  ssr: false,
});