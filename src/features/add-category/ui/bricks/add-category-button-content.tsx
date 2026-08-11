"use client"

import { useAddCategory } from "../../model/hooks/use-add-category";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { CirclePlusButton } from "@/shared/ui/circle-plus-button";
import { TooltipText } from "@/shared/ui/tooltip-text";

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