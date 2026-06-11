import { getRequestConfig } from 'next-intl/server';
import { routing } from '../shared/lib/i18n/routing';
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale: locale as string,
    messages: {
      ...(await import(`../shared/lib/i18n/locales/${locale}/common.json`)).default,
      groups: (await import(`../shared/lib/i18n/locales/${locale}/groups.json`)).default,
      parishe: (await import(`../shared/lib/i18n/locales/${locale}/parishe.json`)).default,
      sidebar: (await import(`../shared/lib/i18n/locales/${locale}/sidebar.json`)).default,
      header: (await import(`../shared/lib/i18n/locales/${locale}/header.json`)).default,
      metadata: (await import(`../shared/lib/i18n/locales/${locale}/metadata.json`)).default,
      "add-product": (await import(`../shared/lib/i18n/locales/${locale}/add-product.json`)).default,
      "add-parish": (await import(`../shared/lib/i18n/locales/${locale}/add-parish.json`)).default,
      "parishes-search": (await import(`../shared/lib/i18n/locales/${locale}/parishes-search.json`)).default,
      "parishes-page": (await import(`../shared/lib/i18n/locales/${locale}/parishes-page.json`)).default,
      "groups-page": (await import(`../shared/lib/i18n/locales/${locale}/groups-page.json`)).default,
    }
  };
});