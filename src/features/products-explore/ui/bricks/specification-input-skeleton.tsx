import { cn } from "@/shared/lib/utils"
import { InputSkeleton } from "@/shared/ui/input"

export const SpecificationInputSkeleton = ({ className }: { className?: string }) => {
  return (
    <InputSkeleton className={cn("max-w-80 rounded-lg", className)} />
  )
}

SpecificationInputSkeleton.displayName = "SpecificationInputSkeleton"