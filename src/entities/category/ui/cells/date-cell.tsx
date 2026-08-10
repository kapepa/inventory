import { cn } from "@/shared/lib/utils";
import { MobileCellLabel } from '@/shared/ui';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useLocale } from 'next-intl';

interface DateCellProps {
  label?: string,
  created: Date | null,
  className?: string
}

export const DateCell = ({ label, created, className }: DateCellProps) => {
  const locale = useLocale();
  const dateLocale = locale === 'ru' ? ru : enUS;

  return (
    <div className={cn("flex flex-col self-baseline lg:self-auto", className)}>
      {label && <MobileCellLabel className="block lg:hidden whitespace-nowrap truncate w-full text-center">{label}</MobileCellLabel>}
      <div className="flex flex-col items-center">
        {created && <span className="text-base text-chart-2 whitespace-nowrap">{format(created, 'dd / MMM / yyyy', { locale: dateLocale })}</span>}
      </div>
    </div>
  )
}

DateCell.displayName = "DateCell"