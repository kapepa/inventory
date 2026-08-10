"use client"

import { AppLocale } from "@/shared/lib/i18n/config";
import { cn } from "@/shared/lib/utils"
import { MobileCellLabel, Skeleton } from '@/shared/ui';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useTranslations } from 'next-intl';

interface RentalCellProps {
  className?: string
  startDate: Date | undefined,
  endDate: Date | undefined,
  label?: string
  locale?: AppLocale,
}

export function RentalCell({ label, locale, className, startDate, endDate }: RentalCellProps) {
  const t = useTranslations('products.products-cells.rental-cell');
  const dateLocale = locale === 'ru' ? ru : enUS;

  return (
    <div className={cn("flex flex-col justify-center items-center", className)}>
      {label && <MobileCellLabel className="block lg:hidden">{label}</MobileCellLabel>}
      <div className='flex items-end'>
        {startDate && <small className="text-xs text-sidebar-ring pr-1 min-w-6">{t("with")} </small>}
        <span className='text-chart-2 text-base whitespace-nowrap min-w-28'>
          {startDate
            ? format(startDate, 'dd / MM / yyyy', { locale: dateLocale })
            : "—"}
        </span>
      </div>
      <div className='flex items-end'>
        {startDate && <small className="text-xs text-sidebar-ring pr-1 min-w-6">{t("to")} </small>}
        <span className='text-chart-2 text-base whitespace-nowrap min-w-28'>
          {endDate
            ? format(endDate, 'dd / MM / yyyy', { locale: dateLocale })
            : "—"}
        </span>
      </div>
    </div>
  )
}

RentalCell.displayName = "RentalCell"