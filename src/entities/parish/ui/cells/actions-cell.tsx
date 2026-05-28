import { Button, cn } from "@/shared"
import { Trash } from "lucide-react"
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
      <Button onClick={handlerDelte} className="cursor-pointer size-11 rounded-full border-none" variant="outline">
        <Trash className="size-8 text-chart-2" />
      </Button>
    </div>
  )

  return (
    <div className={cn("flex justify-center", className)}></div>
  )
}