"use client"

import { cn } from "@/shared/lib/utils"
import { MobileCellLabel, Skeleton } from '@/shared/ui';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useLocale, useTranslations } from 'next-intl';

interface RentalCellProps {
  className?: string
  startDate: Date | undefined,
  endDate: Date | undefined,
  label?: string
}

export const RentalCell = ({ label, className, startDate, endDate }: RentalCellProps) => {
  const locale = useLocale();
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

export const RentalCellSkeleton = ({ className }: { className?: string }) => {

  return (
    <div className={cn("flex flex-col justify-center items-center", className)}>
      <Skeleton className="h-3.5 w-20 block lg:hidden mb-2" />
      <div className="flex flex-col items-center gap-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
      </div>
    </div>
  )
}

RentalCellSkeleton.displayName = "RentalCellSkeleton"