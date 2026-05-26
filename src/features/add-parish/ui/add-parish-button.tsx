"use client"

import { Button, cn } from "@/shared"
import { Plus } from "lucide-react"

interface AddParishButtonProps {
  className?: string
}

export const AddParishButton = ({ className }: AddParishButtonProps) => {
  const parishPopupHandler = () => {

  }

  return (
    <Button onClick={parishPopupHandler} className={cn("bg-accent rounded-full size-10 cursor-pointer", className)} size="icon">
      <Plus />
    </Button>
  )
}
