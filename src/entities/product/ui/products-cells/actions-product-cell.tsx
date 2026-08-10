"use client"

import { cn } from "@/shared/lib/utils"
import { MobileCellLabel, Skeleton, TrashButton } from "@/shared/ui"
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