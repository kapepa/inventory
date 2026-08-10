import { cn } from "@/shared/lib/utils";
import { MobileCellLabel, TrashButton } from "@/shared/ui";
import { MouseEvent } from "react"

interface ActionsCellProps {
  label?: string,
  isOwner?: boolean,
  className?: string,
  onDeleteCategory: () => void
}

export const ActionsCell = ({ label, isOwner, className, onDeleteCategory }: ActionsCellProps) => {
  const handlerDelte = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteCategory();
  }

  if (isOwner) return (
    <div className={cn("flex flex-col items-center", className)}>
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