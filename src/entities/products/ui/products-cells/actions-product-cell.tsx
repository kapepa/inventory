"use client"

import { cn, MobileCellLabel, Skeleton, TrashButton } from "@/shared"
import { memo, MouseEvent, useCallback } from "react"

interface ActionsProductCellProps {
  label?: string,
  isOwner?: boolean,
  className?: string,
  onDeleteProduct: () => void
}

export const ActionsProductCell = memo(({ label, isOwner, onDeleteProduct, className }: ActionsProductCellProps) => {
  const handlerDelte = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteProduct();
  }, [onDeleteProduct])

  if (isOwner) return (
    <div className={cn("flex justify-center flex-col items-center", className)}>
      {label && <MobileCellLabel className="block lg:hidden">{label}</MobileCellLabel>}
      <TrashButton onClick={handlerDelte} className="size-11" />
    </div>
  )

  return (
    <div className={cn("", className)}></div>
  )
})

ActionsProductCell.displayName = "ActionsProductCell"

export const ActionsProductCellSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col justify-center items-center", className)}>
      <Skeleton className="h-3.5 w-20 block lg:hidden mb-2" />
      <Skeleton className="size-8" />
    </div>
  )
})

ActionsProductCellSkeleton.displayName = "ActionsProductCellSkeleton"

