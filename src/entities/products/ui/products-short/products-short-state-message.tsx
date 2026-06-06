import { cn } from "@/shared"
import { ReactNode } from "react"

interface ProductsShortStateMessageProps {
  className?: string,
  children: ReactNode
}

export const ProductsShortStateMessage = ({ children, className }: ProductsShortStateMessageProps) => {
  return (
    <div className={cn("flex items-center justify-center py-8 text-muted-foreground", className)}>
      {children}
    </div>
  )
}

ProductsShortStateMessage.displayName = "ProductsShortStateMessage"