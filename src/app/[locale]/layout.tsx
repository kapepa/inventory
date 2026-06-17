import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from "next/font/google";
import { Providers } from './providers';
import { routing, ModalRoot, Toaster } from '@/shared';


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
      <body className='bg-static'>
        <Providers locale={locale} messages={messages}>
          <div className="min-w-[320px]">
            {children}
          </div>
          <ModalRoot />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

