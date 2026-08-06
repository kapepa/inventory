"use client"

import { useTranslations } from "next-intl";
import { useAddCategory } from "../../model/hooks/use-add-category";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { CirclePlusButton, TooltipText } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface AddCategoryButtonContentProps {
  label: string
  className?: string
}

export const AddCategoryButtonContent = ({ label, className }: AddCategoryButtonContentProps) => {
  const { openAddCategoryModal } = useAddCategory();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CirclePlusButton
          onClick={openAddCategoryModal}
          className={cn("size-10", className)}
        />
      </TooltipTrigger>
      <TooltipContent className="bg-chart-2 border-chart-2">
        <TooltipText>
          {label}
        </TooltipText>
      </TooltipContent>
    </Tooltip>
  )
}