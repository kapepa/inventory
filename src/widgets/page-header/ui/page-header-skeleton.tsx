import { cn } from "@/shared/lib"
import { Skeleton } from "@/shared/ui"
import { CountTotalSkeleton } from "./bricks/count-total-skeleton"
import { SubtitleSkeleton } from "./bricks/subtitle-skeleton"
import { ReactNode } from "react"

interface PageHeaderSkeleton {
  title?: boolean
  count?: boolean
  action?: ReactNode
  subtitle?: boolean
  children?: ReactNode
  className?: string
}

export const PageHeaderSkeleton = ({ title = true, count = true, action, subtitle, children, className }: PageHeaderSkeleton) => {
  return (
    <div className={cn("flex flex-col pb-3 items-center lg:items-start w-full", className)}>
      <div className={cn(
        "flex items-center w-full",
        "gap-3 sm:gap-4 flex-col lg:flex-row"
      )}>
        {action}
        <div className={cn(
          "flex items-center font-semibold min-w-0 flex-col w-full",
          "text-lg md:text-3xl sm:text-xl gap-4 lg:flex-row"
        )}>
          {title && <Skeleton className="h-9 w-32" />}
          {count && <CountTotalSkeleton />}
          {subtitle && <SubtitleSkeleton />}
        </div>
      </div>
      {children && (
        <div className="w-full mt-3">{children}</div>
      )}

    </div>
  )
}

PageHeaderSkeleton.displayName = "PageHeaderSkeleton"