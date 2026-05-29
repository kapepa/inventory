export const locales = ['en', 'ru'] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'ru';

export const localeNames: Record<AppLocale, string> = {
  en: 'English',
  ru: 'Русский',
};
