"use client";

import dynamic from 'next/dynamic';
import { LoaderSpin } from '@/shared';

export const RegisterFormDynamic = dynamic(
  () => import('./register-form').then(mod => mod.RegisterForm),
  {
    loading: () => (
      <div className="p-6 flex items-center justify-center min-h-75">
        <LoaderSpin className="size-10" />
      </div>
    ),
    ssr: false,
  }
);