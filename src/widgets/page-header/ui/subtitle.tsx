"use client"

import { cn, Tooltip, TooltipContent, TooltipText, TooltipTrigger } from "@/shared"
import { memo } from "react"

interface SubtitleProps {
  subtitle: string,
  className?: string,
}

export const Subtitle = memo(({ subtitle, className }: SubtitleProps) => {
  return (
    <>
      <span className="hidden lg:inline">/</span>
      <div className="min-w-0 w-full lg:flex-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <h4 className={cn("text-center lg:text-left lg:truncate", className)}>
              {subtitle}
            </h4>
          </TooltipTrigger>
          <TooltipContent className="bg-chart-2 border-chart-2">
            <TooltipText>
              {subtitle}
            </TooltipText>
          </TooltipContent>
        </Tooltip>
      </div >
    </>
  )
})

Subtitle.displayName = "Subtitle"