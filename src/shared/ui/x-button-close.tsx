import { memo } from "react";
import { cn } from "../lib";
import { X } from "lucide-react";

const closeButtonClasses = cn(
  "flex justify-center items-center",
  "transition-colors cursor-pointer",
  "bg-background size-10 rounded-full",
  "translate-x-1/3 md:translate-x-1/2 -translate-y-1/2",
  "border border-chart-1 shadow-lg",
  "hover:bg-muted hover:shadow-xl",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-chart-2",
  "active:scale-100"
);

interface XButtonCloseProps {
  className?: string,
  onCloseAction?: () => void
}

export const XButtonClose = memo(({ className, onCloseAction = () => { } }: XButtonCloseProps) => {
  return (
    <button
      onClick={onCloseAction}
      className={cn(closeButtonClasses, className)}
      aria-label="close"
    >
      <X className="w-6 h-6 text-chart-2" />
    </button>
  )
})

XButtonClose.displayName = "XButtonClose"