import { cn } from "@/shared/lib/utils"
import { TitleFieldSkeleton } from "./title-field-skeleton"
import { DescriptionFieldSkeleton } from "./description-field-skeleton"

export const TranslationFieldsSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("space-y-9", className)}>
      <TitleFieldSkeleton />
      <DescriptionFieldSkeleton />
    </div>
  )
}

TranslationFieldsSkeleton.displayName = "TranslationFieldsSkeleton"