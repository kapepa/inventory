"use client"

import { CirclePlusButton, cn, Tooltip, TooltipContent, TooltipText, TooltipTrigger } from "@/shared"
import { useTranslations } from "next-intl"
import { memo } from "react"
import { useAddParish } from "../model"

interface AddParishButtonProps {
  className?: string
}

export const AddParishButton = memo(({ className }: AddParishButtonProps) => {
  const t = useTranslations('parishe');
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
