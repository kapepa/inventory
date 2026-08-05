import { cn } from "@/shared/lib/utils"
import { SpecificationInput, SpecificationInputSkeleton } from "./specification-input"
import { CategorySelector, CategorySelectorSkeleton } from "./category-selector"
import { useTranslations } from "next-intl"
import { memo } from "react"
import { CategoryWithTranslations } from "@/entities/category/model/types"

interface ProductsExploreProps {
  initialCategories: CategoryWithTranslations[]
  className?: string
}

export const ProductsExplore = memo(({ initialCategories, className }: ProductsExploreProps) => {
  const t = useTranslations('products-explore.labels');

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 items-center gap-3", className)}>
      <CategorySelector label={t("type")} initialCategories={initialCategories} className="flex-col lg:flex-row" />
      <SpecificationInput label={t("specification")} className="flex-col lg:flex-row" />
    </div>
  )
})

ProductsExplore.displayName = "ProductsExplore"

export const ProductsExploreSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 items-center gap-3", className)}>
      <CategorySelectorSkeleton />
      <SpecificationInputSkeleton />
    </div>
  )
}

ProductsExploreSkeleton.displayName = "ProductsExploreSkeleton"