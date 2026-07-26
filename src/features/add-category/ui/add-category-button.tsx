"use client"

import { CirclePlusButton, cn, Skeleton, Tooltip, TooltipContent, TooltipText, TooltipTrigger } from "@/shared"
import { useTranslations } from "next-intl"
import { memo } from "react"
import { useAddCategory } from "../model/hooks"

interface AddCategoryButtonProps {
  className?: string
}

export const AddCategoryButton = memo(({ className }: AddCategoryButtonProps) => {
  const t = useTranslations('add-category');
  const { openAddCategoryModal } = useAddCategory();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CirclePlusButton onClick={openAddCategoryModal} className={cn("size-10", className)} />
      </TooltipTrigger>
      <TooltipContent className="bg-chart-2 border-chart-2">
        <TooltipText>
          {t("buttons.create")}
        </TooltipText>
      </TooltipContent>
    </Tooltip>
  )
})

AddCategoryButton.displayName = "AddCategoryButton"

export const AddCategoryButtonSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-10 rounded-full", className)} />
  )
}

AddCategoryButtonSkeleton.displayName = "AddCategoryButtonSkeleton"