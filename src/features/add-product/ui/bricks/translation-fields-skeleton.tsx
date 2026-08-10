import { cn } from "@/shared/lib/utils"
import { TitleFieldSkeleton } from "./title-field-skeleton"
import { SpecificationFieldSkeleton } from "./specification-field-skeleton"

export const TranslationFieldsSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("space-y-9 w-full", className)}>
      <TitleFieldSkeleton />
      <SpecificationFieldSkeleton />
    </div>
  )
}

TranslationFieldsSkeleton.displayName = "TranslationFieldsSkeleton"