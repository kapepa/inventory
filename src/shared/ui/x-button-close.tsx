import { cn } from "../lib/utils";
import { X } from "lucide-react";
import { Skeleton } from "./skeleton";

const closeButtonClasses = cn(
  "flex justify-center items-center",
  "transition-colors cursor-pointer",
  "bg-background size-10 rounded-full",
  "border border-chart-1 shadow-lg",
  "hover:bg-muted hover:shadow-xl",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-chart-2",
  "active:scale-100"
);

interface XButtonCloseProps {
  className?: string,
  onCloseAction?: () => void
}

export const XButtonClose = ({ className, onCloseAction = () => { } }: XButtonCloseProps) => {
  return (
    <button
      type="button"
      onClick={onCloseAction}
      className={cn(closeButtonClasses, className)}
      aria-label="Close"
    >
      <X className="size-6 text-chart-2" />
    </button>
  )
}

XButtonClose.displayName = "XButtonClose"

export const XButtonCloseSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-10 rounded-full", className)} />
  )
}

XButtonCloseSkeleton.displayName = "XButtonCloseSkeleton"