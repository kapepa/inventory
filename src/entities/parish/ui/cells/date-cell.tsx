import { cn, Skeleton } from "@/shared"
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useLocale } from 'next-intl';

interface DateCellProps {
  created: Date,
  delivery: Date | null,
  className?: string
}

export const DateCell = ({ created, delivery, className }: DateCellProps) => {
  const locale = useLocale();
  const dateLocale = locale === 'ru' ? ru : enUS;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <small className="text-xs text-sidebar-ring">{format(created, 'dd / MM', { locale: dateLocale })}</small>
      {delivery && <span className="text-base text-chart-2">{format(delivery, 'dd / MMM / yyyy', { locale: dateLocale })}</span>}
    </div>
  )
}

DateCell.displayName = "DateCell"

export const DateCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center gap-y-2", className)}>
      <Skeleton className="h-4 w-[50%]" />
      <Skeleton className="h-5 w-[75%]" />
    </div>
  )
}

DateCellSkeleton.displayName = "DateCellSkeleton"