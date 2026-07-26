"use client"

import { CirclePlusButton, cn, Skeleton, Tooltip, TooltipContent, TooltipText, TooltipTrigger } from "@/shared"
import { useTranslations } from "next-intl"
import { memo } from "react"
import { useAddParish } from "../model"
import { useHydratedIsAdmin } from "@/features/auth"

interface AddParishButtonProps {
  className?: string
}

export const AddParishButton = memo(({ className }: AddParishButtonProps) => {
  const isAdmin = useHydratedIsAdmin()
  if (!isAdmin) return null;

  const t = useTranslations('add-parish');
  const { openAddParishModal } = useAddParish();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CirclePlusButton onClick={openAddParishModal} className={cn("size-10", className)} />
      </TooltipTrigger>
      <TooltipContent className=" bg-chart-2 border-chart-2">
        <TooltipText>
          {t("parishes-created-btn.create")}
        </TooltipText>
      </TooltipContent>
    </Tooltip>
  )
})

AddParishButton.displayName = "AddParishButton"

export const AddParishButtonSkeleton = ({ className }: AddParishButtonProps) => {
  return (
    <Skeleton className={cn("size-10 rounded-full", className)} />
  )
}

AddParishButtonSkeleton.displayName = "AddParishButtonSkeleton"

