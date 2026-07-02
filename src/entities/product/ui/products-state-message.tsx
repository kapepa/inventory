import { cn } from "@/shared"
import { ReactNode } from "react"

interface ProductsStateMessageProps {
  className?: string,
  children: ReactNode
}

export const ProductsStateMessage = ({ children, className }: ProductsStateMessageProps) => {
  return (
    <div className={cn("flex items-center justify-center py-8 text-muted-foreground", className)}>
      {children}
    </div>
  )
}

ProductsStateMessage.displayName = "ProductsStateMessage"