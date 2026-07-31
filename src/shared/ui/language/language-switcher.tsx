"use client"

import { cn } from "../../lib/utils"
import { usePathname, useRouter } from '../../lib/i18n/routing';
import { AppLocale, localeNames, locales } from "../../lib/i18n/config";
import { ChevronDown, GlobeIcon } from "lucide-react";
import { Button } from "../button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dropdown-menu";
import { memo, useEffect } from "react";
import { STORAGE_KEYS } from "../../constants";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../skeleton";

interface LanguageSwitcherProps {
  className?: string
  locale: AppLocale
  pathname: string
  searchParams: string
}

const LanguageSwitcherInner = memo(({ className, locale, pathname, searchParams }: LanguageSwitcherProps) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.LOCALE, locale);
    }
  }, [locale]);

  const handleChange = (newLocale: AppLocale) => {
    localStorage.setItem(STORAGE_KEYS.LOCALE, newLocale);
    const pathnameWithQuery = searchParams ? `${pathname}?${searchParams}` : pathname;
    router.replace(pathnameWithQuery, { locale: newLocale });
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 cursor-pointer"
            aria-label={locale === 'ru' ? 'Выбрать язык' : 'Select language'}
          >
            <GlobeIcon className="h-4 w-4" aria-hidden="true" aria-label="Language" />
            <span>
              {localeNames[locale]}
            </span>
            <ChevronDown className="h-4 w-4" aria-label="Down" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="min-w-28">
          {locales.map((l) => (
            <DropdownMenuItem
              key={l}
              onClick={() => handleChange(l)}
              className={cn(
                'cursor-pointer',
                l === locale && 'bg-chart-1 font-medium'
              )}
            >
              {localeNames[l]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

export const LanguageSwitcher = ({ className }: Omit<LanguageSwitcherProps, 'locale' | 'pathname' | 'searchParams'>) => {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();

  return <LanguageSwitcherInner className={className} locale={locale} pathname={pathname} searchParams={searchParams} />;
};

export const LanguageSwitcherSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("w-28 h-7", className)} />
  )
}
