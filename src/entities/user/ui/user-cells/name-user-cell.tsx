import { cn, Skeleton } from "@/shared";
import { memo } from "react";

interface NameUserCellProps {
  label: string
  name: string;
  className?: string;
}

export const NameUserCell = memo(({ label, name, className }: NameUserCellProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <small className="text-muted-foreground">{label}</small>
      <span>{name}</span>
    </div>
  )
})

NameUserCell.displayName = "NameUserCell"

export const NameUserCellSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center gap-y-2", className)}>
      <Skeleton className="w-10 h-4 rounded" />
      <Skeleton className="w-28 h-4 rounded" />
    </div>
  )
})

NameUserCellSkeleton.displayName = "NameUserCellSkeleton"