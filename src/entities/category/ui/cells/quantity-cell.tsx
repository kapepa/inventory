import { cn } from "@/shared/lib/utils";
import { MobileCellLabel } from "@/shared/ui"
import { useTranslations } from "next-intl";

interface QuantityCellProps {
  label?: string,
  count: number
  className?: string
}

export const QuantityCell = ({ label, count, className }: QuantityCellProps) => {
  const t = useTranslations('category.cells.quantity');
  return (
    <div className={cn("flex flex-col items-center lg:items-start", className)}>
      {label && <MobileCellLabel className="block lg:hidden">{label}</MobileCellLabel>}
      <div className={cn("flex flex-col items-center lg:items-start", className)}>
        <span className="text-xl text-chart-2">{count}</span>
        <small className="text-sidebar-ring text-sm">
          {count === 1 ? t("product") : t("products")}
        </small>
      </div>
    </div>
  )
}

QuantityCell.displayName = "QuantityCell"