"use client"

import { ReactNode, useCallback } from "react"
import { Button } from "./button"
import { Languages } from "lucide-react"
import { cn } from "../lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { TooltipText } from "./tooltip-text"
import { Loader } from "./loader"

interface TranslateWrapperInputProps {
  className?: string,
  children: ReactNode,
  floatTitle: string,
  onClick?: () => void,
  disabled?: boolean,
  isLoading?: boolean,
}

export const TranslateWrapperInput = ({ children, floatTitle, className, onClick, disabled, isLoading }: TranslateWrapperInputProps) => {
  const handlerClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClick) onClick()
  }, [onClick])

  return (
    <div className="relative">
      {children}
      <div className={cn("absolute top-0 right-0", className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="cursor-pointer h-10" onClick={handlerClick} disabled={disabled || isLoading}>
              {isLoading ? (
                <Loader className="text-accent" strokeWidth={3} />
              ) : (
                <Languages className="text-accent" strokeWidth={3} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className=" bg-chart-2 border-chart-2">
            <TooltipText>
              {floatTitle}
            </TooltipText>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
