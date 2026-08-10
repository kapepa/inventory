"use client"

import { cn } from "@/shared/lib/utils"
import { ru, enUS } from 'date-fns/locale';
import { format } from 'date-fns';
import { useLocale, useTranslations } from "next-intl";

interface ProductRentalProps {
  className?: string,
  rental: { startDate: Date, endDate: Date }
}

export function ProductRental({ rental, className }: ProductRentalProps) {
  const locale = useLocale();
  const dateLocale = locale === 'ru' ? ru : enUS;
  const t = useTranslations('products');
  const { endDate, startDate } = rental;

  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-sidebar-ring">{t("product-details.rental")}</span>
      <div className={cn("flex", className)}>
        <div className='flex items-end'>
          {startDate && <small className="text-xs text-sidebar-ring pr-1 min-w-6">{t("product-rental.with")} </small>}
          <span className='text-chart-2 text-base whitespace-nowrap min-w-28'>
            {startDate
              ? format(startDate, 'dd / MM / yyyy', { locale: dateLocale })
              : "—"}
          </span>
        </div>
        <div className='flex items-end'>
          {startDate && <small className="text-xs text-sidebar-ring pr-1 min-w-6">{t("product-rental.to")} </small>}
          <span className='text-chart-2 text-base whitespace-nowrap min-w-28'>
            {endDate
              ? format(endDate, 'dd / MM / yyyy', { locale: dateLocale })
              : "—"}
          </span>
        </div>
      </div>
    </div>
  )
}