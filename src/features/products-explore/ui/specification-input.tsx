"use client"

import { QUERY_PARAMS_KEYS } from "@/shared/constants"
import { cn } from "@/shared/lib"
import { useSearchParam } from "@/shared/lib/hooks/use-search-param"
import { SearchWithClear, Skeleton } from "@/shared/ui"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface SpecificationInputProps {
  label?: string
  className?: string
}

export const SpecificationInput = memo(({ label, className }: SpecificationInputProps) => {
  const t = useTranslations('products-explore.placeholder');
  const { inputValue, setInputValue, clearInput } = useSearchParam({
    queryKey: QUERY_PARAMS_KEYS.SPECIFICATION,
    debounceMs: 1000,
  });

  return (
    <div className={cn("flex items-center gap-x-2 w-full", className)}>
      <label
        htmlFor="specification"
        className="text-muted-foreground text-xs font-bold"
      >
        {label}:
      </label>
      <SearchWithClear
        placeholder={t("specification")}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        clearInputAction={clearInput}
        name={QUERY_PARAMS_KEYS.SPECIFICATION}
        className="bg-background border-chart-1  placeholder:font-normal"
        containerClassName="w-full max-w-80"
        type="text"
      />
    </div>
  )
})

SpecificationInput.displayName = "SpecificationInput"

export const SpecificationInputSkeleton = ({ className }: SpecificationInputProps) => {
  return (
    <div className={cn("flex items-center gap-x-2 w-full", className)}>
      <Skeleton className="h-4 w-full max-w-20" />
      <Skeleton className="h-10 w-full max-w-80" />
    </div>
  )
}

SpecificationInputSkeleton.displayName = "SpecificationInputSkeleton"