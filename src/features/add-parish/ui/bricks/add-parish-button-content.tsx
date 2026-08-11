"use client";

import { cn } from "@/shared/lib/utils";
import { useAddParish } from "../../model/hooks/use-add-parish";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { CirclePlusButton } from "@/shared/ui/circle-plus-button";
import { TooltipText } from "@/shared/ui/tooltip-text";

interface AddParishButtonContentProps {
  label: string;
  className?: string;
}

export const AddParishButtonContent = ({ label, className }: AddParishButtonContentProps) => {
  const { openAddParishModal } = useAddParish();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CirclePlusButton
          onClick={openAddParishModal}
          className={cn("size-10", className)}
        />
      </TooltipTrigger>
      <TooltipContent className="bg-chart-2 border-chart-2">
        <TooltipText>
          {label}
        </TooltipText>
      </TooltipContent>
    </Tooltip>
  );
};

AddParishButtonContent.displayName = "AddParishButtonContent";