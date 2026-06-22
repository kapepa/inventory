import { cn, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared"
import { memo } from "react"

interface CategorySelectorProps {
  label?: string
  className?: string
}

export const CategorySelector = memo(({ label, className }: CategorySelectorProps) => {
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <label htmlFor="category">{label}:</label>
      <Select>
        <SelectTrigger id="category" className="bg-background border-chart-1 w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
})

CategorySelector.displayName = "CategorySelector"