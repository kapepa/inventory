import { memo, ReactNode } from "react"
import { cn } from "@/shared/lib"
import { StoreType } from "../lib/types/types"
import { SubtitleDynamic } from "./bricks/subtitle-dynamic"
import { CountTotaleDynamic } from "./bricks/count-total-dynamic"

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

export const PageHeader = memo(({ title, subtitle, count, reverse, children, action, className, storeType }: PageHeaderProps) => {
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
          <h3 className="lg:truncate text-center lg:text-left max-w-full">{title}</h3>
          {storeType && count !== undefined && <CountTotaleDynamic fallbackCount={count} storeType={storeType} />}
          {subtitle && <SubtitleDynamic subtitle={subtitle} />}
        </div>
      </div>
      {children && (
        <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl">
          {children}
        </p>
      )}
    </div>
  )
})

PageHeader.displayName = "PageHeader"