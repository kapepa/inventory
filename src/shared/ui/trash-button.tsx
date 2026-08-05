import { HTMLAttributes } from "react"
import { Button } from "./button"
import { Trash } from "lucide-react"
import { cn } from "../lib/utils"

interface TrashButtonProps extends HTMLAttributes<HTMLButtonElement> { }

export const TrashButton = ({ className, ...props }: TrashButtonProps) => {
  return (
    <Button
      asChild
      className={cn("cursor-pointer rounded-full border-none", className)}
      variant="outline"
      {...props}
    >
      <Trash className="size-8 text-chart-2" />
    </Button>
  )
}

TrashButton.displayName = "TrashButton"