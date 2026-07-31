import { cn } from "@/shared/lib"
import { memo, ReactNode } from "react"

interface MobileCellLabelProps {
  children: ReactNode,
  className?: string,
}

export const MobileCellLabel = memo(({ children, className }: MobileCellLabelProps) => {
  return (
    <div className={cn("pb-1.5", className)}>
      <span className="text-xs font-bold text-muted-foreground">{children}</span>
    </div>
  )
})

MobileCellLabel.displayName = "MobileCellLabel"