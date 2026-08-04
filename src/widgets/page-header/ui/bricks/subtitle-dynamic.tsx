"use client";

import dynamic from 'next/dynamic';
import { SubtitleSkeleton } from './subtitle-skeleton';

export const SubtitleDynamic = dynamic(() => import('./subtitle').then(mod => mod.Subtitle), {
  loading: () => <SubtitleSkeleton />,
  ssr: true,
});