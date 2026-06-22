"use client"

import { Eraser } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import { cn } from "../lib"
import { InputHTMLAttributes } from "react"

interface SearchWithClearProps extends InputHTMLAttributes<HTMLInputElement> {
  isClient: boolean,
  className?: string
  containerClassName?: string
  clearInputAction: () => void
}

export const SearchWithClear = ({ maxLength = 100, value, clearInputAction, className, containerClassName, isClient, ...props }: SearchWithClearProps) => {
  return (
    <div className={cn("relative", containerClassName)}>
      <Input
        className={cn("font-bold placeholder:font-bold rounded-s-sm pr-12 border-chart-1 w-full", className)}
        value={value}
        maxLength={maxLength}
        {...props}
      />
      <Button
        variant="link"
        className="cursor-pointer absolute top-0 right-0 bottom-0 h-full"
        onClick={clearInputAction}
        disabled={!isClient || !value}
      >
        <Eraser className="text-accent size-7" aria-label="clear" />
      </Button>
    </div>
  )
}

SearchWithClear.displayName = "SearchWithClear"