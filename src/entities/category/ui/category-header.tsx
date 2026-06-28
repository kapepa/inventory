import { cn } from "@/shared";
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