import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale: locale as string,
    messages: {
      ...(await import(`../shared/locales/${locale}/common.json`)).default,
      groups: (await import(`../shared/locales/${locale}/groups.json`)).default,
      parishe: (await import(`../shared/locales/${locale}/parishe.json`)).default,
    }
  };
});