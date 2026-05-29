import { cn } from "@/shared"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface ParishesListHeaderProps {
  className?: string
}

export const ParishesListHeader = memo(
  ({ className }: ParishesListHeaderProps) => {
    const t = useTranslations('parishe');

    return (

      <div className={cn(
        "px-6 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-widest", className
      )}>
        <div>{t('list.header.name')}</div>
        <div className="text-center">{t("list.header.details")}</div>
        <div>{t('list.header.count')}</div>
        <div className="text-center whitespace-nowrap">{t('list.header.date')}</div>
        <div className="text-center">{t('list.header.amount')}</div>
        <div className="text-center">{t('list.header.delete')}</div>
      </div>
    );
  }
)