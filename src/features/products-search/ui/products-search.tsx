"use client"

import { cn } from "@/shared"
import { memo } from "react"
import { SpecificationInput } from "./specification-input"
import { CategorySelector } from "./category-selector"
import { useTranslations } from "next-intl"
import { CategoryWithTranslations } from "@/entities"

interface ProductsSearchProps {
  initialCategories: CategoryWithTranslations[]
  className?: string
}

export const ProductsSearch = memo(({ initialCategories, className }: ProductsSearchProps) => {
  const t = useTranslations('products-search.labels');

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 items-center gap-3", className)}>
      <CategorySelector label={t("type")} initialCategories={initialCategories} className="flex-col lg:flex-row" />
      <SpecificationInput label={t("specification")} className="flex-col lg:flex-row" />
    </div>
  )
})

ProductsSearch.displayName = "ProductsSearch"