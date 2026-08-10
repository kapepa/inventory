import { cn } from "@/shared/lib/utils"
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