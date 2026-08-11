import { cn } from "@/shared/lib/utils";
import { MobileCellLabel } from "@/shared/ui/mobile-cell-label"
import { useTranslations } from "next-intl";

interface CountCellProps {
  label?: string,
  count: number
  className?: string
}

export const CountCell = ({ label, count, className }: CountCellProps) => {
  const t = useTranslations('parish.list.cell');
  return (
    <div className={cn("", className)}>
      {label && <MobileCellLabel className="block md:hidden">{label}</MobileCellLabel>}
      <div className={cn("flex flex-col", className)}>
        <span className="text-xl text-chart-2">{count}</span>
        <small className="text-sidebar-ring text-sm">
          {count > 1 ? t("products") : t("product")}
        </small>
      </div>
    </div>
  )
}

CountCell.displayName = "CountCell"