import { ROUTES } from '@/shared/constants/routes';
import { defaultLocale } from '@/shared/lib/i18n/config';
import { NotFoundActions } from '@/shared/ui';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';

export default async function GlobalNotFound() {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || defaultLocale;

  const t = await getTranslations({ locale, namespace: "not-found" });

  return (
    <html lang={locale}>
      <body className='bg-static'>
        <div className="flex flex-col h-screen overflow-hidden">
          <main className="flex-1 min-h-0 flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-6 max-w-md">
              <h1 className="text-9xl font-bold text-primary">
                {t("title")}
              </h1>
              <h2 className="text-3xl font-semibold">
                {t("subtitle")}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t("description")}
              </p>
              <div className="flex gap-4 justify-center mt-8">
                <NotFoundActions
                  backText={t("backPrevious")}
                  homeText={t("backHome")}
                  homeHref={`/${locale}${ROUTES.PARISHES}`}
                />
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}