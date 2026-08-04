"use client";

import dynamic from 'next/dynamic';
import { CountTotalSkeleton } from './count-total-skeleton';

export const CountTotaleDynamic = dynamic(() => import('./count-total').then(mod => mod.CountTotal), {
  loading: () => <CountTotalSkeleton />,
  ssr: true,
});