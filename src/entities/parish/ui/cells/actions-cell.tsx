import { cn } from "@/shared/lib"
import { MobileCellLabel, Skeleton, TrashButton } from "@/shared/ui"
import { MouseEvent } from "react"

interface ActionsCellProps {
  label?: string,
  isOwner?: boolean,
  className?: string,
  onDeleteParish: () => void
}

export const ActionsCell = ({ label, isOwner, className, onDeleteParish }: ActionsCellProps) => {
  const handlerDelte = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteParish();
  }

  if (isOwner) return (
    <div className={cn("", className)}>
      {label && <MobileCellLabel className="block md:hidden">{label}</MobileCellLabel>}
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
    <div className={cn("flex flex-col items-center gap-y-2", className)}>
      <Skeleton className="h-5 w-[20%] block md:hidden" />
      <Skeleton className="size-8" />
    </div>
  )
}
ActionsCellSkeleton.displayName = "ActionsCellSkeleton"