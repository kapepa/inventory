import { cn, Skeleton } from "@/shared";
import { useTranslations } from "next-intl";
import { memo } from "react";

interface CategoryHeaderProps {
  className?: string;
}

export const CategoryHeader = memo(({ className }: CategoryHeaderProps) => {
  const t = useTranslations('category.header');

  return (
    <div className={cn(
      "px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest",
      className,
      "hidden lg:grid"
    )}>
      <div><span>{t('name')}</span></div>
      <div><span>{t('quantity')}</span></div>
      <div className="text-center"><span>{t('date')}</span></div>
      <div className="text-center"><span>{t('delete')}</span></div>
    </div>
  );
})

CategoryHeader.displayName = 'CategoryHeader';

export const CategoryHeaderSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn(
      "px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest",
      className,
      "hidden lg:grid"
    )}>
      <div><Skeleton className="h-5 w-40" /></div>
      <div><Skeleton className="h-5 w-24" /></div>
      <div><Skeleton className="h-5 w-20 m-auto" /></div>
      <div><Skeleton className="h-5 w-20 m-auto" /></div>
    </div>
  );
}

CategoryHeaderSkeleton.displayName = 'CategoryHeaderSkeleton';