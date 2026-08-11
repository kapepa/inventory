import { cn } from "@/shared/lib/utils"
import { MobileCellLabel } from "@/shared/ui/mobile-cell-label";
import { useTranslations } from "next-intl";

interface ConditionCellProps {
  className?: string
  condition: boolean,
  label?: string
}

export const ConditionCell = ({ label, condition, className }: ConditionCellProps) => {
  const t = useTranslations('products.products-cells.condition-cell');
  const conditionLabel = condition ? t("new") : t("used")

  return (
    <div className={cn("flex justify-start lg:justify-center flex-col", className)}>
      {label && <MobileCellLabel className="block lg:hidden">{label}</MobileCellLabel>}
      <span className="text-sm text-sidebar-ring">{conditionLabel}</span>
    </div>
  )
}

ConditionCell.displayName = "ConditionCell"