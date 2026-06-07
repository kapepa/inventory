import { cn, Skeleton } from "@/shared"
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

CountCell.displayName = "CountCell"

export const CountCellSkeleton = ({ className }: { className?: string }) => {
  const t = useTranslations('parishe');

  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      <Skeleton className="h-5 w-8" />
      <Skeleton className="h-4 w-[75%]" />
    </div>
  )
}

CountCellSkeleton.displayName = "CountCellSkeleton"