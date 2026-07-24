import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from "next/font/google";
import { Providers } from './providers';
import { routing, ModalRoot, Toaster } from '@/shared';
import { getSessionUserCached } from '@/features/server';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  icons: {
    icon: '/svgs/shield-user.svg',
  },
};

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

  setRequestLocale(locale);

  const [messages, user] = await Promise.all([getMessages({ locale }), getSessionUserCached()])

  return (
    <html lang={locale} className={`${inter.className} h-full antialiased`}>
      <body className='bg-static'>
        <Providers locale={locale} messages={messages} initialUser={user}>
          <div className="min-w-75">
            {children}
          </div>
          <ModalRoot />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

