"use client"

import { cn, Tooltip, TooltipContent, TooltipText, TooltipTrigger, XButtonClose } from "@/shared"
import { ReactNode } from "react"

interface ProductsShortBodyProps {
  title: string,
  className?: string
  children: ReactNode,
  actions?: ReactNode,
  onCloseActions?: () => void
}

export const ProductsShortBody = ({ title, children, actions, className, onCloseActions }: ProductsShortBodyProps) => {
  return (
    <div
      className={cn("border rounded-md bg-card grid relative", className)}
    >
      <XButtonClose
        className="absolute top-0 right-0 translate-x-1/3 md:translate-x-1/2 -translate-y-1/2"
        onCloseAction={onCloseActions}
      />
      <div className="px-6 pb-3 pt-5 flex flex-col min-w-0">
        <div className="pb-4 min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <h4 className="font-bold text-lg truncate">{title}</h4>
            </TooltipTrigger>
            <TooltipContent className={cn("bg-chart-2", "border-chart-2")}>
              <TooltipText>
                {title}
              </TooltipText>
            </TooltipContent>
          </Tooltip>
        </div>
        {actions}
      </div>
      {children}
    </div>
  )
}

ProductsShortBody.displayName = "ProductsShortBody"
