"use client"

import { cn, Skeleton, TrashButton } from "@/shared"
import { memo, MouseEvent, useCallback } from "react"
import { ProductWithRelations } from "../../model"

interface ActionsProductCellProps {
  parish: ProductWithRelations
  isOwner?: boolean,
  className?: string,
  onDeleteProduct?: (parish: ProductWithRelations) => void
}

export const ActionsProductCell = memo(({ parish, isOwner, onDeleteProduct, className }: ActionsProductCellProps) => {
  const handlerDelte = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteProduct?.(parish);
  }, [onDeleteProduct])

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

