"use client";

import { CirclePlusButton, TooltipText } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useAddParish } from "../../model/hooks/use-add-parish";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

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