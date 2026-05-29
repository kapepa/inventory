import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/shared/lib/i18n/routing';
import { Inter } from "next/font/google";
import { Providers } from './providers';
import { Toaster } from '@/shared';
import { ModalRoot } from '@/shared/ui/modal';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
  display: 'swap',
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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${inter.className} h-full antialiased`}>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
          <ModalRoot />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

