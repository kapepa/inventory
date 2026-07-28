import { ReactNode } from "react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";

interface BaseProvidersProps {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export function BaseProviders({ children, locale, messages }: BaseProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Kiev">
      {children}
    </NextIntlClientProvider>
  );
}