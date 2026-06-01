"use client"

import { Button, cn, QUERY_PARAMS_KEYS, Tooltip, TooltipContent, TooltipText, TooltipTrigger, useModalActions, useModalQuery } from "@/shared"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { memo, useCallback } from "react"
import { AddParishForm } from "./add-parish-form"

interface AddParishButtonProps {
  className?: string
}

export const AddParishButton = memo(({ className }: AddParishButtonProps) => {
  const t = useTranslations('parishe');
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName: QUERY_PARAMS_KEYS.ADD_PARISH,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(<AddParishForm closeModalAction={closeQueryModal} />);
    }, [openModal]),
    onClose: closeModal,
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={open} className={cn("bg-accent rounded-full size-10 cursor-pointer", className)} size="icon">
          <Plus />
        </Button>
      </TooltipTrigger>
      <TooltipContent className=" bg-chart-2 border-chart-2">
        <TooltipText>
          {t("parishes-created-btn.create")}
        </TooltipText>
      </TooltipContent>
    </Tooltip>

  )
})
