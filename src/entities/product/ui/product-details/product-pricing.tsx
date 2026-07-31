import { cn } from "@/shared/lib"
import { memo } from "react"

interface ProductPricingProps {
  className?: string
  prices: { UAH: string | number | undefined, USD: string | number | undefined }
}

export const ProductPricing = memo(({ prices, className }: ProductPricingProps) => {
  const { UAH, USD } = prices

  return (
    <div className={cn("flex items-baseline sm:gap-4 flex-col sm:flex-row", className)}>
      {UAH !== undefined && <span className="text-lg sm:text-3xl font-bold">{UAH}</span>}
      {USD !== undefined && <small className="text-sm sm:text-lg text-chart-2">{USD}</small>}
    </div>
  )
}
)

ProductPricing.displayName = "ProductPricing"