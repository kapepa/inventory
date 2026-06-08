import { cn, getProductPrimaryPrice } from "@/shared"
import { ProductsWithRelations } from "../../model"
import { memo } from "react"

interface ProductPricingProps {
  className?: string
  prices: ProductsWithRelations["prices"]
}

export const ProductPricing = memo(
  ({ prices, className }: ProductPricingProps) => {
    const { UAH, USD } = getProductPrimaryPrice(prices)

    return (
      <div className={cn("flex items-baseline gap-4", className)}>
        <span className="text-3xl font-bold">{UAH}</span>
        <small className="text-lg text-chart-2">{USD}</small>
      </div>
    )
  }
)

ProductPricing.displayName = "ProductPricing"