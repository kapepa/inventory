import { cn } from "@/shared"
import { useTranslations } from "next-intl";

interface CountCellProps {
  count: number
  className?: string
}

export const CountCell = ({ count, className }: CountCellProps) => {
  const t = useTranslations('parishe');

  return (
    <div className={cn("flex flex-col", className)}>
      <span className="text-xl text-chart-2">{count}</span>
      <small className="text-sidebar-ring text-sm">
        {count > 1 ? t("list.cell.products") : t("list.cell.product")}
      </small>
    </div>
  )
}