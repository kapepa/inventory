"use client"

import { cn, Skeleton, TrashButton } from "@/shared"
import { memo, MouseEvent } from "react"
import { ProductsWithRelations } from "../../model"

interface ActionsProductCellProps {
  parish: ProductsWithRelations
  isOwner?: boolean,
  className?: string,
  onDeleteActions?: (parish: ProductsWithRelations) => void
}

export const ActionsProductCell = memo(({ parish, isOwner, onDeleteActions, className }: ActionsProductCellProps) => {
  const handlerDelte = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteActions?.(parish);
  }

  if (isOwner) return (
    <div className={cn("flex justify-center", className)}>
      <TrashButton onClick={handlerDelte} className="size-11" />
    </div>
  )

  return (
    <div className={cn("flex justify-center", className)}></div>
  )
})

ActionsProductCell.displayName = "ActionsProductCell"

export const ActionsProductCellSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <Skeleton className="size-8" />
    </div>
  )
})

ActionsProductCellSkeleton.displayName = "ActionsProductCellSkeleton"

