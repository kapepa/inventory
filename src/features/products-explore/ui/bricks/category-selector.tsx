"use client"

import { memo } from "react"
import { CategoryWithTranslations } from "@/entities/category/model/types"
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys"
import { cn } from "@/shared/lib/utils"
import { useSearchParam } from "@/shared/lib/hooks/use-search-param"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { useTranslations } from "next-intl"

interface CategorySelectorProps {
  label?: string
  className?: string
  categoryId: string,
  initialCategories: CategoryWithTranslations[]
}

export const CategorySelector = memo(({ className, categoryId, initialCategories }: CategorySelectorProps) => {
  const t = useTranslations('products-explore');
  const { setInputValue, clearInput } = useSearchParam({
    queryKey: QUERY_PARAMS_KEYS.CATEGORY,
    debounceMs: 1000,
  });

  return (
    <Select
      value={categoryId}
      onValueChange={(value) => {
        if (value === "all") return clearInput();
        console.log(value)
        setInputValue(value)
      }}
    >
      <SelectTrigger
        id="category"
        className={cn("bg-background border-chart-1 w-full max-w-80 font-bold placeholder:font-bold", className)}
      >
        <SelectValue placeholder={t("placeholder.category")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">{t("category-selector.all")}</SelectItem>
          {
            initialCategories.map((categorie) => {
              const { title } = categorie.translations[0]
              return (
                <SelectItem key={categorie.id} value={categorie.id}>{title}</SelectItem>
              )
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
})

CategorySelector.displayName = "CategorySelector"