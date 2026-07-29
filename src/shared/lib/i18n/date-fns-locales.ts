"use client"

import { ru, enUS } from "date-fns/locale";
import type { Locale } from "date-fns";
import type { AppLocale } from "./config";

export const dateFnsLocales: Record<AppLocale, Locale> = {
  ru: { ...ru, code: 'ru-RU' },
  en: { ...enUS, code: 'en-US' },
};