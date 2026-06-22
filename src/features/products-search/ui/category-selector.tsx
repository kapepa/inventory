"use client"

import { CategoryWithTranslations } from "@/entities"
import { cn, QUERY_PARAMS_KEYS, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, useSearchParam } from "@/shared"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface CategorySelectorProps {
  label?: string
  initialCategories: CategoryWithTranslations[]
  className?: string
}

export const CategorySelector = memo(({ label, initialCategories, className }: CategorySelectorProps) => {
  const t = useTranslations('products-search');
  const { inputValue, setInputValue, isClient, clearInput } = useSearchParam({
    queryKey: QUERY_PARAMS_KEYS.CATEGORY,
    debounceMs: 1000,
  });

  return (
    <div className={cn("flex items-center gap-x-2 w-full", className)}>
      <label htmlFor="category" className="text-muted-foreground text-xs font-bold">
        {label}:
      </label>
      <Select
        value={isClient ? inputValue : ""}
        onValueChange={(value) => {
          if (value === "all") return clearInput();
          setInputValue(value)
        }}
      >
        <SelectTrigger
          id="category"
          className="bg-background border-chart-1 w-full max-w-80"
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
    </div>
  )
})

CategorySelector.displayName = "CategorySelector"