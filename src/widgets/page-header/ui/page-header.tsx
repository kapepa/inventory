import { ReactNode } from "react"
import { cn } from "@/shared"
import { ParishesTotal } from "./parishes-total"

interface PageHeaderProps {
  title: string
  count?: number
  action?: ReactNode
  className?: string
}

export const PageHeader = ({ title, count, action, className }: PageHeaderProps) => {
  return (
    <div className={cn("flex gap-x-5", className)}>
      {action}
      <div className="flex text-3xl font-semibold  gap-x-3" >
        <h2>{title}</h2>
        <ParishesTotal fallbackCount={count} />
      </div>
    </div>
  )
}
