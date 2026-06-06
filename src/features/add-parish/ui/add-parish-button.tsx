"use client"

import { CirclePlusButton, cn, QUERY_PARAMS_KEYS, Tooltip, TooltipContent, TooltipText, TooltipTrigger, useModalActions, useModalQuery } from "@/shared"
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
        <CirclePlusButton onClick={open} className={cn("size-10", className)} />
      </TooltipTrigger>
      <TooltipContent className=" bg-chart-2 border-chart-2">
        <TooltipText>
          {t("parishes-created-btn.create")}
        </TooltipText>
      </TooltipContent>
    </Tooltip>

  )
})
