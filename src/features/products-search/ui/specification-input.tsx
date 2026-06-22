import { cn, QUERY_PARAMS_KEYS, SearchWithClear, useSearchParam } from "@/shared"
import { useTranslations } from "next-intl"
import { memo } from "react"

interface SpecificationInputProps {
  label?: string
  className?: string
}

export const SpecificationInput = memo(({ label, className }: SpecificationInputProps) => {
  const t = useTranslations('products-search.placeholder');
  const { inputValue, setInputValue, isClient, clearInput } = useSearchParam({
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
        isClient={isClient}
        name={QUERY_PARAMS_KEYS.SPECIFICATION}
        className="bg-background border-chart-1"
        containerClassName="w-full max-w-80"
        type="text"
      />
    </div>
  )
})

SpecificationInput.displayName = "SpecificationInput"