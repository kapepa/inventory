import { getTranslations } from "next-intl/server"
import { cn } from "@/shared/lib/utils"
import { Skeleton } from "@/shared/ui/skeleton"
import { AppLocale } from "@/shared/lib/i18n/config"
import { CategoryWithTranslations } from "@/entities/category/model/types"
import { CategorySelectorSkeleton } from "./bricks/category-selector-skeleton"
import { CategorySelectorDynamic } from "./bricks/category-selector-dynamic"
import { SpecificationInputSkeleton } from "./bricks/specification-input-skeleton"
import { SpecificationInputDynamic } from "./bricks/specification-input-dynamic"

interface ProductsExploreProps {
  locale: AppLocale,
  className?: string
  categoryId: string,
  initialCategories: CategoryWithTranslations[]
}

export const ProductsExplore = async ({ locale, className, categoryId, initialCategories }: ProductsExploreProps) => {
  const t = await getTranslations({ locale, namespace: "products-explore.labels" });

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 items-center gap-3", className)}>
      <div className="flex items-center gap-2 w-full flex-col lg:flex-row">
        <label
          htmlFor="category"
          className="text-muted-foreground text-xs font-bold w-full max-w-10 text-center">
          {t("type")}:
        </label>
        <CategorySelectorDynamic
          categoryId={categoryId}
          initialCategories={initialCategories}
        />
      </div>
      <div className="flex items-center gap-2 w-full flex-col lg:flex-row">
        <label
          htmlFor="specification"
          className="text-muted-foreground text-xs font-bold w-full max-w-26 text-center"
        >
          {t("specification")}:
        </label>
        <SpecificationInputDynamic />
      </div>
    </div>
  )
}

ProductsExplore.displayName = "ProductsExplore"