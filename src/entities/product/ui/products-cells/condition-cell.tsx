import { cn } from "@/shared/lib"
import { MobileCellLabel, Skeleton } from "@/shared/ui"
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

export const ConditionCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col justify-center items-center", className)}>
      <Skeleton className="h-3.5 w-20 block lg:hidden mb-2" />
      <Skeleton className="h-6 w-14" />
    </div>
  )
}

ConditionCellSkeleton.displayName = "ConditionCellSkeleton"