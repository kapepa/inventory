import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from "next/font/google";
import { BaseProviders } from './providers';
import { routing } from '@/shared/lib/i18n/routing';
import { AppLocale } from '@/shared/lib/i18n/config';
import { ProvidersUIClient } from './providers-client';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) notFound();

  const typedLocale = locale as AppLocale;
  setRequestLocale(typedLocale);

  const messages = await getMessages({ locale: typedLocale })

  return (
    <html lang={typedLocale} className={`${inter.className} h-full antialiased`}>
      <body className='bg-static min-w-75'>
        <BaseProviders locale={typedLocale} messages={messages}>
          <ProvidersUIClient>
            {children}
          </ProvidersUIClient>
        </BaseProviders>
      </body>
    </html>
  );
}

