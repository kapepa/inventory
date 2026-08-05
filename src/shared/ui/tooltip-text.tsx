import { cn } from "../lib/utils";

export const TooltipText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={cn("font-medium text-xs bg-chart-2 border-chart-2", className)}>
      {children}
    </span>
  )
}