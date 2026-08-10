import { cn } from "@/shared/lib/utils";
import { getTranslations } from "next-intl/server";

interface CategoryHeaderProps {
  className?: string;
}

const CARD_CLASS = "grid grid-cols-[1fr_1fr] lg:grid-cols-[8fr_1fr_2fr_1fr] items-center gap-4";

export const CategoryHeader = async ({ className }: CategoryHeaderProps) => {
  const t = await getTranslations('category.header');

  return (
    <div className={cn(
      "px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest hidden lg:grid",
      CARD_CLASS,
      className,
    )}>
      <div><span>{t('name')}</span></div>
      <div><span>{t('quantity')}</span></div>
      <div className="text-center"><span>{t('date')}</span></div>
      <div className="text-center"><span>{t('delete')}</span></div>
    </div>
  );
}

CategoryHeader.displayName = 'CategoryHeader';
