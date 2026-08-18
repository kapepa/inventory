"use client";

import dynamic from 'next/dynamic';
import { CountTotalSkeleton } from './count-total-skeleton';

export const ContTotalParishDynamic = dynamic(() => import('./count-total-parish').then(mod => mod.ContTotalParish), {
  loading: () => <CountTotalSkeleton />,
  ssr: true,
});

export const ContTotalProductsDynamic = dynamic(() => import('./count-total-products').then(mod => mod.ContTotalProducts), {
  loading: () => <CountTotalSkeleton />,
  ssr: true,
});

export const ContTotalCategoriesDynamic = dynamic(() => import('./count-total-categories').then(mod => mod.ContTotalCategories), {
  loading: () => <CountTotalSkeleton />,
  ssr: true,
});

export const ContTotalUsersDynamic = dynamic(() => import('./count-total-users').then(mod => mod.ContTotalUsers), {
  loading: () => <CountTotalSkeleton />,
  ssr: true,
});