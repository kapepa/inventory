import { cn } from "@/shared/lib/utils"
import { useTranslations } from "next-intl"
import { ROUTES } from "@/shared/constants/routes"
import { Link } from "@/shared/lib/i18n/routing"
import { CategoryWithProductCount } from "../model/types"
import { TitleCell, TitleCellSkeleton } from "./cells/title-cell"
import { QuantityCell, QuantityCellSkeleton } from "./cells/quantity-cell"
import { DateCell, DateCellSkeleton } from "./cells/date-cell"
import { ActionsCell, ActionsCellSkeleton } from "./cells/actions-cell"

interface CategoryCardProps {
  className?: string,
  category: CategoryWithProductCount
  onDeleteCategory: (category: CategoryWithProductCount) => void
}

export const CategoryCard = ({ category, className, onDeleteCategory }: CategoryCardProps) => {
  const { title } = category.translations[0];
  const t = useTranslations('category.cells.label');

  return (
    <Link
      href={`${ROUTES.CATEGORIES}/${category.id}`}
      className={cn("px-4 py-2 lg:px-6 lg:py-3 gap-2 border rounded-md bg-card hover:shadow-md transition-all border-chart-1", className)}
    >
      <TitleCell className="flex-1 min-w-0 col-span-2 lg:col-span-1" title={title} />
      <QuantityCell label={t("quantity")} count={category._count.products} />
      <DateCell label={t("date")} created={category.createdAt} />
      <ActionsCell label={t("actions")} isOwner={true} onDeleteCategory={() => { onDeleteCategory(category) }} />
    </Link>
  )
}

CategoryCard.displayName = "CategoryCard"

export const CategoryCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("px-4 py-2 lg:px-6 lg:py-3.5 gap-2 border rounded-md bg-card hover:shadow-md transition-all border-chart-1 w-full", className)}>
      <TitleCellSkeleton className="col-span-2 lg:col-span-1" />
      <QuantityCellSkeleton />
      <DateCellSkeleton />
      <ActionsCellSkeleton />
    </div>
  )
}

CategoryCardSkeleton.displayName = "CategoryCardSkeleton"