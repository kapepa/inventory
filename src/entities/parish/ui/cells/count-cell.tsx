import { cn, Skeleton } from "@/shared"
import { useTranslations } from "next-intl";
import { HeaderCell } from "./header-cell";

interface CountCellProps {
  label?: string,
  count: number
  className?: string
}

export const CountCell = ({ label, count, className }: CountCellProps) => {
  const t = useTranslations('parishe.list.cell');
  return (
    <div className={cn("", className)}>
      {label && <HeaderCell className="block md:hidden">{label}</HeaderCell>}
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

export const CountCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      <Skeleton className="h-5 w-8" />
      <Skeleton className="h-4 w-[75%]" />
    </div>
  )
}

CountCellSkeleton.displayName = "CountCellSkeleton"