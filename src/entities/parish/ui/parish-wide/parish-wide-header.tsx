import { cn } from "@/shared"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface ParishesWideHeaderProps {
  className?: string
}

export const ParishWideHeader = memo(
  ({ className }: ParishesWideHeaderProps) => {
    const t = useTranslations('parish.list.header');

    return (

      <div className={cn(
        "px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest", className
      )}>
        <div><span>{t('name')}</span></div>
        <div className="text-center"><span>{t("details")}</span></div>
        <div><span>{t('count')}</span></div>
        <div className="text-center whitespace-nowrap"><span>{t('date')}</span></div>
        <div className="text-center"><span>{t('amount')}</span></div>
        <div className="text-center"><span>{t('delete')}</span></div>
      </div>
    );
  }
)