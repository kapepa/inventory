import { cn } from "@/shared"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface ParishesWideHeaderProps {
  className?: string
}

export const ParishWideHeader = memo(
  ({ className }: ParishesWideHeaderProps) => {
    const t = useTranslations('parishe.list.header');

    return (

      <div className={cn(
        "px-6 py-3 text-sm font-bold text-muted-foreground uppercase tracking-widest", className
      )}>
        <div>{t('name')}</div>
        <div className="text-center">{t("details")}</div>
        <div>{t('count')}</div>
        <div className="text-center whitespace-nowrap">{t('date')}</div>
        <div className="text-center">{t('amount')}</div>
        <div className="text-center">{t('delete')}</div>
      </div>
    );
  }
)