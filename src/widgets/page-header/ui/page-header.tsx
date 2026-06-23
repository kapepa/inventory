import { ReactNode } from "react"
import { cn } from "@/shared"
import { CountTotal } from "./count-total"
import { Subtitle } from "./subtitle"
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
          "flex items-center font-semibold min-w-0 flex-col lg:flex-row w-full overflow-hidden",
          "text-lg md:text-3xl sm:text-xl gap-1 sm:gap-3"
        )}>
          <h2 className="truncate text-center lg:text-left shrink-0">{title}</h2>
          {subtitle && <Subtitle subtitle={subtitle} />}
          {count !== undefined && <CountTotal fallbackCount={count} storeType={storeType} />}
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
