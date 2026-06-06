import { HTMLAttributes } from "react"
import { Button } from "./button"
import { Plus } from "lucide-react"
import { cn } from "../lib"

interface CirclePlusButtonProps extends HTMLAttributes<HTMLButtonElement> { }

export const CirclePlusButton = ({ className, ...props }: CirclePlusButtonProps) => {
  return (
    <Button
      size="icon"
      className={cn("bg-accent rounded-full cursor-pointer", className)}
      {...props}
    >
      <Plus aria-label="plus" />
    </Button>
  )
}

CirclePlusButton.displayName = "CirclePlusButton"