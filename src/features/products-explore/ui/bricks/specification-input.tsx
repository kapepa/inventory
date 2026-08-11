"use client"

import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys"
import { cn } from "@/shared/lib/utils"
import { useSearchParam } from "@/shared/lib/hooks/use-search-param"
import { useTranslations } from "next-intl"
import { memo } from "react"
import { SearchWithClear } from "@/shared/ui/search-with-clear"

interface SpecificationInputProps {
  label?: string
  className?: string
}

export const SpecificationInput = memo(({ className }: SpecificationInputProps) => {
  const t = useTranslations('products-explore.placeholder');
  const { inputValue, setInputValue, clearInput } = useSearchParam({
    queryKey: QUERY_PARAMS_KEYS.SPECIFICATION,
    debounceMs: 1000,
  });

  return (
    <SearchWithClear
      placeholder={t("specification")}
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
      clearInputAction={clearInput}
      name={QUERY_PARAMS_KEYS.SPECIFICATION}
      className={cn("bg-background border-chart-1", className)}
      containerClassName="w-full max-w-80"
      type="text"
    />
  )
})

SpecificationInput.displayName = "SpecificationInput"