import { HTMLAttributes } from "react"
import { Button } from "./button"
import { Plus } from "lucide-react"
import { cn } from "../lib/utils"

interface CirclePlusButtonProps extends HTMLAttributes<HTMLButtonElement> { }

export const CirclePlusButton = ({ className, ...props }: CirclePlusButtonProps) => {
  return (
    <Button
      type="button"
      size="icon"
      aria-label="Add"
      className={cn("bg-accent rounded-full cursor-pointer", className)}
      {...props}
    >
      <Plus aria-label="plus" aria-hidden="true" />
    </Button>
  )
}

CirclePlusButton.displayName = "CirclePlusButton"