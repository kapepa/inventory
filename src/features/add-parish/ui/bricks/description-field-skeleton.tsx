import { cn } from "@/shared/lib/utils"
import { Skeleton } from "@/shared/ui/skeleton"
import { TextareaSkeleton } from "@/shared/ui/textarea"

export const DescriptionFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-3.5", className)}>
      <Skeleton className="w-1/3 h-4.5" />
      <TextareaSkeleton className="min-h-24" />
    </div>
  )
}

DescriptionFieldSkeleton.displayName = "DescriptionFieldSkeleton"