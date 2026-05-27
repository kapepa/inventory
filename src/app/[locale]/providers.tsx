'use client';

import { TooltipProvider } from '@/shared';
import { ModalProvider } from '@/shared/ui/modal';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ModalProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </ModalProvider>
  );
}