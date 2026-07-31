import { NextRequest } from 'next/server';
import { AppLocale, defaultLocale, locales } from './i18n/config';

export function getLocaleFromRequest(request: NextRequest): AppLocale {
  const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
  const locale = rawLocale.split(',')[0].split('-')[0].trim().toLowerCase() as AppLocale;

  return locales.includes(locale) ? locale : defaultLocale;
}