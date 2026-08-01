import { useTranslations } from "next-intl";
import { memo } from "react";
import { useAddCategory } from "../../model/hooks/use-add-category";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { CirclePlusButton, TooltipText } from "@/shared/ui";
import { cn } from "@/shared/lib";

export const AddCategoryButtonContent = memo(({ className }: { className?: string }) => {
  const t = useTranslations('add-category');
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
          {t("buttons.create")}
        </TooltipText>
      </TooltipContent>
    </Tooltip>
  )
})