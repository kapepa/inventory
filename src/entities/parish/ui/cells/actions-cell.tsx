import { cn, Skeleton, TrashButton } from "@/shared"
import { MouseEvent } from "react"
import { ParishWithRelations } from "../../model/types/types"
import { HeaderCell } from "./header-cell"

interface ActionsCellProps {
  label?: string,
  parish: ParishWithRelations
  isOwner?: boolean,
  className?: string,
  onDeleteParish?: (parish: ParishWithRelations) => void
}

export const ActionsCell = ({ label, parish, isOwner, className, onDeleteParish }: ActionsCellProps) => {
  const handlerDelte = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteParish?.(parish);
  }

  if (isOwner) return (
    <div className={cn("", className)}>
      {label && <HeaderCell className="block md:hidden">{label}</HeaderCell>}
      <div className="flex justify-center">
        <TrashButton onClick={handlerDelte} className="size-11" />
      </div>
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