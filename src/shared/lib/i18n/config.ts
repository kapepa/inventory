import { ru, enUS } from "date-fns/locale";
import type { Locale } from "date-fns";

export const locales = ['en', 'ru'] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'ru';

export const localeNames: Record<AppLocale, string> = {
  en: 'English',
  ru: 'Русский',
};

export const dateFnsLocales: Record<AppLocale, Locale> = {
  ru: { ...ru, code: 'ru-RU' },
  en: { ...enUS, code: 'en-US' },
};

export const oppositeLocale: Record<AppLocale, AppLocale> = {
  en: "ru",
  ru: "en"
}

