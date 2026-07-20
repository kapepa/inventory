'use client';

import { AuthenticatedUser, AuthProvider } from '@/features';
import { TooltipProvider, ModalProvider, QueryParamProvider, WebSocketProvider } from '@/shared';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { ReactNode, useMemo } from 'react';

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  initialUser: AuthenticatedUser | null;
}

export function Providers({ children, locale, messages, initialUser }: ProvidersProps) {
  const content = useMemo(() => (
    <QueryParamProvider>
      <ModalProvider>
        <TooltipProvider>
          <AuthProvider initialUser={initialUser}>
            <WebSocketProvider>
              {children}
            </WebSocketProvider>
          </AuthProvider>
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
