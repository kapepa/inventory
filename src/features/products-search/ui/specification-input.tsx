import { cn, Input } from "@/shared"
import { memo } from "react"

interface SpecificationInputProps {
  label?: string
  className?: string
}

export const SpecificationInput = memo(({ label, className }: SpecificationInputProps) => {
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <label htmlFor="specification">{label}:</label>
      <Input
        id="specification"
        type="text"
        name="specification"
        className="bg-background border-chart-1"
      />
    </div>
  )
})

SpecificationInput.displayName = "SpecificationInput"