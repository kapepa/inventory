import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { defaultLocale, locales } from './config';

export const routing = defineRouting({
  locales: locales as unknown as string[],
  defaultLocale: defaultLocale
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
