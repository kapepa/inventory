import { cn } from "@/shared/lib/utils";
import { MobileCellLabel } from "@/shared/ui/mobile-cell-label";
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useLocale } from 'next-intl';

interface DateCellProps {
  label?: string,
  created: Date,
  delivery: Date | null,
  className?: string
}

export const DateCell = ({ label, created, delivery, className }: DateCellProps) => {
  const locale = useLocale();
  const dateLocale = locale === 'ru' ? ru : enUS;

  return (
    <div className={cn("", className)}>
      {label && <MobileCellLabel className="block md:hidden whitespace-nowrap truncate w-full text-center">{label}</MobileCellLabel>}
      <div className="flex flex-col items-center">
        <small className="text-xs text-sidebar-ring">{format(created, 'dd / MM', { locale: dateLocale })}</small>
        {delivery && <span className="text-base text-chart-2 whitespace-nowrap">{format(delivery, 'dd / MMM / yyyy', { locale: dateLocale })}</span>}
      </div>
    </div>
  )
}

DateCell.displayName = "DateCell"