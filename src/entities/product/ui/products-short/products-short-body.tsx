"use client"

import { cn, ScrollArea, Skeleton, Tooltip, TooltipContent, TooltipText, TooltipTrigger, XButtonClose, XButtonCloseSkeleton } from "@/shared"
import { memo, ReactNode } from "react"

interface ProductsShortBodyProps {
  title: string,
  className?: string
  children: ReactNode,
  actions?: ReactNode,
  onCloseActions?: () => void
}

export const ProductsShortBody = memo(({ title, children, actions, className, onCloseActions }: ProductsShortBodyProps) => {
  return (
    <div
      className={cn("border rounded-md bg-card flex flex-col min-h-0 relative", className)}
    >
      <XButtonClose
        className="hidden lg:flex absolute top-0 right-0 translate-x-1/3 xl:translate-x-1/2 -translate-y-1/2"
        onCloseAction={onCloseActions}
      />
      <div className="px-6 pb-3 pt-5 flex flex-col min-w-0 shrink-0">
        <div className="pb-4 min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <h2 className="font-bold text-lg truncate">{title}</h2>
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
      <ScrollArea className="h-full flex-1 min-h-0">
        {children}
      </ScrollArea>
    </div>
  )
})

ProductsShortBody.displayName = "ProductsShortBody"

export const ProductsShortBodySkeleton = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div
      className={cn("border rounded-md bg-card flex flex-col min-h-0 relative", className)}
    >
      <XButtonCloseSkeleton
        className="hidden lg:flex absolute top-0 right-0 translate-x-1/3 xl:translate-x-1/2 -translate-y-1/2"
      />
      <div className="px-6 pb-3 pt-5 flex flex-col min-w-0 shrink-0">
        <div className="pb-4 min-w-0">
          <Skeleton className="" />
        </div>
      </div>
      <ScrollArea className="h-full flex-1 min-h-0">
        {children}
      </ScrollArea>
    </div>
  )
}

ProductsShortBodySkeleton.displayName = "ProductsShortBodySkeleton"