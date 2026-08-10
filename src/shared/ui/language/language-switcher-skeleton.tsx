import { cn } from "@/shared/lib/utils"
import { Skeleton } from "../skeleton"

export const LanguageSwitcherSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("w-28 h-7", className)} />
  )
}