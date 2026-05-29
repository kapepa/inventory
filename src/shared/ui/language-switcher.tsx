"use client"

import { cn } from "../lib/utils"
import { usePathname, useRouter, useParams } from 'next/navigation';
import { AppLocale, localeNames, locales } from "../lib/i18n/config";
import { ChevronDown, GlobeIcon } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";


interface LanguageSwitcherProps {
  className?: string
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const params = useParams();
  const locale = (params?.locale as AppLocale) || 'ru';
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLocale: AppLocale) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const nextPathname = segments.join('/');
    router.push(nextPathname);
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
            <GlobeIcon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">
              {localeNames[locale]}
            </span>
            <ChevronDown className="h-4 w-4" />
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
};
