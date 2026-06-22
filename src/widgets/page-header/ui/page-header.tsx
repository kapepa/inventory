import { ReactNode } from "react"
import { cn } from "@/shared"
import { CountTotal } from "./count-total"
import { Subtitle } from "./subtitle"

interface PageHeaderProps {
  title: string
  count?: number
  subtitle?: string
  className?: string
  reverse?: boolean
  action?: ReactNode
  children?: ReactNode
}

export const PageHeader = ({ title, subtitle, count, reverse, children, action, className }: PageHeaderProps) => {
  return (
    <div className={cn("flex flex-col pb-3", className)}>
      <div className={cn("flex gap-x-1 sm:gap-x-5 items-center", reverse && "flex-row-reverse justify-end")}>
        {action}
        <div className="flex items-center text-lg sm:text-xl md:text-3xl font-semibold gap-x-1 sm:gap-x-3 min-w-0 max-w-full" >
          <h2>{title}</h2>
          {subtitle && <Subtitle subtitle={subtitle} />}
          {count !== undefined && <CountTotal fallbackCount={count} />}
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
