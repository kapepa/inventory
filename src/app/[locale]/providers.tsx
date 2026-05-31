'use client';

import { TooltipProvider, ModalProvider, QueryParamProvider } from '@/shared';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { ReactNode, useMemo } from 'react';

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  const content = useMemo(() => (
    <QueryParamProvider>
      <ModalProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </ModalProvider>
    </QueryParamProvider>
  ), [children]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Kiev">
      {content}
    </NextIntlClientProvider>
  );
}

Providers.displayName = 'Providers';
