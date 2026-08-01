"use client"

import { Provider } from "@radix-ui/react-tooltip"
import type { ComponentProps } from "react"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: ComponentProps<typeof Provider>) {
  return (
    <Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}
TooltipProvider.displayName = 'TooltipProvider';

export { TooltipProvider }
