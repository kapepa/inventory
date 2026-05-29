'use client';

import { TooltipProvider } from '@/shared';
import { ModalProvider } from '@/shared/ui/modal';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Kiev">
      <ModalProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </ModalProvider>
    </NextIntlClientProvider>
  );
}