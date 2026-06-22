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
    <div className={cn("grid grid-cols-2 items-center", className)}>
      <CategorySelector label={t("type")} initialCategories={initialCategories} />
      <SpecificationInput label={t("specification")} />
    </div>
  )
})

ProductsSearch.displayName = "ProductsSearch"