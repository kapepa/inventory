import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  locale: locale as string,
  messages: (await import(`./shared/locales/${locale}/common.json`)).default
}));