import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton"
import { getParishLayout } from "@/widgets/parishes-list/ui/parishes-list.styles";
import { getTranslations } from "next-intl/server";

interface ParishesWideHeaderProps {
  isAdmin: boolean,
  className?: string,
}

export const ParishWideHeader = async ({ isAdmin, className }: ParishesWideHeaderProps) => {
  const t = await getTranslations('parish.list.header');
  const PARISH_LAYOUT = getParishLayout(isAdmin)

  return (
    <div className={cn(
      "px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest",
      PARISH_LAYOUT,
      className,
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


ParishWideHeader.displayName = "ParishWideHeader"

export const ParishWideHeaderSkeleton = ({ isAdmin, className }: Omit<ParishesWideHeaderProps, "locale">) => {
  const PARISH_LAYOUT = getParishLayout(isAdmin)

  return (
    <div className={cn(
      "px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest",
      PARISH_LAYOUT,
      className
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
      {isAdmin && <div className="text-center">
        <Skeleton className="h-4 w-16 m-auto" />
      </div>}
    </div>
  );
}

ParishWideHeaderSkeleton.displayName = "ParishWideHeaderSkeleton"