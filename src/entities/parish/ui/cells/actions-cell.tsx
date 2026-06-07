import { cn, Skeleton, TrashButton } from "@/shared"
import { MouseEvent } from "react"
import { ParishWithRelations } from "../../model/types"

interface ActionsCellProps {
  parish: ParishWithRelations
  isOwner?: boolean,
  className?: string,
  onDeleteParish?: (parish: ParishWithRelations) => void
}

export const ActionsCell = ({ parish, isOwner, className, onDeleteParish }: ActionsCellProps) => {
  const handlerDelte = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteParish?.(parish);
  }

  if (isOwner) return (
    <div className={cn("flex justify-center", className)}>
      <TrashButton onClick={handlerDelte} className="size-11" />
    </div>
  )

  return (
    <div className={cn("flex justify-center", className)}></div>
  )
}

ActionsCell.displayName = "ActionsCell"

export const ActionsCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-center", className)}>
      <Skeleton className="size-8" />
    </div>
  )
}

ActionsCellSkeleton.displayName = "ActionsCellSkeleton"