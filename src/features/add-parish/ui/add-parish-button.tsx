"use client"

import { useTranslations } from "next-intl"
import { memo } from "react"
import { CirclePlusButton, Skeleton, TooltipText } from "@/shared/ui"
import { cn } from "@/shared/lib"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip"
import { useHydratedIsAdmin } from "@/features/auth/model/hooks/use-hydrated-user"
import { useAddParish } from "../model/hooks/use-add-parish"

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

