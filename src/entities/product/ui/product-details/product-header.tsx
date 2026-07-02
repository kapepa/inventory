import { cn } from "@/shared"
import { memo } from "react"

interface ProductHeaderProps {
  className?: string
  title: string,
  specification: string | null,
}

export const ProductHeader = memo(
  ({ title, specification, className }: ProductHeaderProps) => {
    return (
      <div className={cn("", className)} >
        <h4 className="text-xl font-bold mb-2 break-all">{title}</h4>
        {specification && <p className="text-chart-2 text-sm mb-4 break-all">{specification}</p>}
      </div>
    )
  }
)

ProductHeader.displayName = "ProductHeader"