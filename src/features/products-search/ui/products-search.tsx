"use client"

import { cn } from "@/shared"
import { memo } from "react"
import { SpecificationInput } from "./specification-input"
import { CategorySelector } from "./category-selector"
import { useTranslations } from "next-intl"

interface ProductsSearchProps {
  className?: string
}

export const ProductsSearch = memo(({ className }: ProductsSearchProps) => {
  const t = useTranslations('products-search.labels');

  return (
    <div className={cn("grid grid-cols-2 items-stretch gap-x-5", className)}>
      <CategorySelector label={t("type")} />
      <SpecificationInput label={t("specification")} />
    </div>
  )
})

ProductsSearch.displayName = "ProductsSearch"