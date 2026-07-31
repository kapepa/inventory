"use client"

import { CategoryWithTranslations } from "@/entities/category/model/types"
import { QUERY_PARAMS_KEYS } from "@/shared/constants"
import { cn } from "@/shared/lib"
import { useMounted } from "@/shared/lib/hooks"
import { useSearchParam } from "@/shared/lib/hooks/use-search-param"
import { Skeleton } from "@/shared/ui"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface CategorySelectorProps {
  label?: string
  initialCategories: CategoryWithTranslations[]
  className?: string
}

export const CategorySelector = memo(({ label, initialCategories, className }: CategorySelectorProps) => {
  const t = useTranslations('products-explore');
  const mounted = useMounted();
  const { inputValue, setInputValue, clearInput } = useSearchParam({
    queryKey: QUERY_PARAMS_KEYS.CATEGORY,
    debounceMs: 1000,
  });

  return (
    <div className={cn("flex items-center gap-x-2 w-full", className)}>
      <label htmlFor="category" className="text-muted-foreground text-xs font-bold">
        {label}:
      </label>
      <Select
        value={mounted ? inputValue : ""}
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


export const CategorySelectorSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-x-2 w-full", className)}>
      <Skeleton className="h-4 w-full max-w-20" />
      <Skeleton className="h-10 w-full max-w-80" />
    </div>
  )
}

CategorySelectorSkeleton.displayName = "CategorySelectorSkeleton"