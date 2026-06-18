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
      <span>/</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <h4 className={cn("truncate min-w-0", className)}>
            {subtitle}
          </h4>
        </TooltipTrigger>
        <TooltipContent className=" bg-chart-2 border-chart-2">
          <TooltipText>
            {subtitle}
          </TooltipText>
        </TooltipContent>
      </Tooltip>

    </>
  )
})

Subtitle.displayName = "Subtitle"