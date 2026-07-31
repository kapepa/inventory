import { cn } from "@/shared/lib";
import { memo, ReactNode } from "react";

interface VerifyCardProps {
  className: string,
  children: ReactNode
}

export const VerifyCard = memo(({ className, children }: VerifyCardProps) => {
  return (
    <div className={cn("px-4 py-3 lg:px-6 gap-2 border rounded-md bg-card border-chart-1", className)}>
      {children}
    </div>
  )
})

VerifyCard.displayName = "VerifyCard";