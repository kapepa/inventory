import { cn } from "@/shared"
import { ReactNode } from "react"

interface CategoryShortStateMessageProps {
  className?: string,
  children: ReactNode
}

export const CategoryShortStateMessage = ({ children, className }: CategoryShortStateMessageProps) => {
  return (
    <div className={cn("flex items-center justify-center py-8 text-muted-foreground", className)}>
      {children}
    </div>
  )
}

CategoryShortStateMessage.displayName = "CategoryShortStateMessage"