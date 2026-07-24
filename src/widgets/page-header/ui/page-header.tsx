import { ReactNode } from "react"
import { cn, Skeleton } from "@/shared"
import { CountTotal, CountTotalSkeleton } from "./count-total"
import { Subtitle, SubtitleSkeleton } from "./subtitle"
import { StoreType } from "../lib"

interface PageHeaderProps {
  title: string
  count?: number
  subtitle?: string
  className?: string
  reverse?: boolean
  action?: ReactNode
  children?: ReactNode,
  storeType?: StoreType
}

export const PageHeader = ({ title, subtitle, count, reverse, children, action, className, storeType }: PageHeaderProps) => {
  return (
    <div className={cn("flex flex-col pb-3 items-center lg:items-start w-full", className)}>
      <div className={cn(
        "flex items-center w-full",
        reverse && "flex-row-reverse justify-end",
        "gap-x-1 sm:gap-x-5 flex-col lg:flex-row"
      )}>
        {action}
        <div className={cn(
          "flex items-center font-semibold min-w-0 flex-col w-full",
          "text-lg md:text-3xl sm:text-xl gap-1 sm:gap-3 lg:flex-row"
        )}>
          <h2 className="lg:truncate text-center lg:text-left max-w-full">{title}</h2>
          {count !== undefined && <CountTotal fallbackCount={count} storeType={storeType} />}
          {subtitle && <Subtitle subtitle={subtitle} />}
        </div>
      </div>
      {children && (
        <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl">
          {children}
        </p>
      )}
    </div>
  )
}

PageHeader.displayName = "PageHeader"

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