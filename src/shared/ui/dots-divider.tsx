import { cn } from "../lib/utils"

export const DotsDivider = ({ className }: { className?: string }) => {
  return (
    <div className={cn("grow border-b border-dotted", className)}></div>
  )
}

DotsDivider.displayName = "DotsDivider"