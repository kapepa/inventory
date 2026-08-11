import { cn } from "@/shared/lib/utils"
import { Skeleton } from "@/shared/ui/skeleton"

export const LoginButtonSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-14 rounded-full", className)} />
  )
}

LoginButtonSkeleton.displayName = "LoginButtonSkeleton"