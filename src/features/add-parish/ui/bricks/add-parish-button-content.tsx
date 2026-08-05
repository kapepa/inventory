"use client";

import { useTranslations } from "next-intl";
import { memo } from "react";
import { CirclePlusButton, TooltipText } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useAddParish } from "../../model/hooks/use-add-parish";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

interface AddParishButtonContentProps {
  className?: string;
}

export const AddParishButtonContent = memo(({ className }: AddParishButtonContentProps) => {
  const t = useTranslations('add-parish');
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
          {t("parishes-created-btn.create")}
        </TooltipText>
      </TooltipContent>
    </Tooltip>
  );
});

AddParishButtonContent.displayName = "AddParishButtonContent";