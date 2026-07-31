import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/ui"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface ParishesWideHeaderProps {
  isAdmin?: boolean,
  className?: string,
}

export const ParishWideHeader = memo(
  ({ isAdmin, className }: ParishesWideHeaderProps) => {
    const t = useTranslations('parish.list.header');

    return (
      <div className={cn(
        "px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest", className
      )}>
        <div>
          <span>{t('name')}</span>
        </div>
        <div className="text-center">
          <span>{t("details")}</span>
        </div>
        <div>
          <span>{t('count')}</span>
        </div>
        <div className="text-center whitespace-nowrap">
          <span>{t('date')}</span>
        </div>
        <div className="text-center">
          <span>{t('amount')}</span>
        </div>
        {isAdmin && <div className="text-center">
          <span>{t('delete')}</span>
        </div>}
      </div>
    );
  }
)

ParishWideHeader.displayName = "ParishWideHeader"

export const ParishWideHeaderSkeleton = ({ isAdmin, className }: ParishesWideHeaderProps) => {
  const t = useTranslations('parish.list.header');

  return (
    <div className={cn(
      "px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest", className
    )}>
      <div>
        <Skeleton className="h-4 w-36" />
      </div>
      <div>
        <Skeleton className="h-4 w-16 m-auto" />
      </div>
      <div>
        <Skeleton className="h-4 w-18 m-auto" />
      </div>
      <div>
        <Skeleton className="h-4 w-40 m-auto" />
      </div>
      <div>
        <Skeleton className="h-4 w-16 m-auto" />
      </div>
    </div>
  );
}

ParishWideHeaderSkeleton.displayName = "ParishWideHeaderSkeleton"