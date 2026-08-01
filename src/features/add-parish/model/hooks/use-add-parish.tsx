"use client"

import { useCallback } from "react";
import { useModalQuery } from "@/shared/lib/hooks/use-modal-query";
import { QUERY_PARAMS_KEYS } from "@/shared/constants";
import { useModalActions } from "@/shared/ui/modal";
import { AddParishModalDynamic } from "../../ui/bricks/add-parish-modal-dynamic";

export const useAddParish = () => {
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName: QUERY_PARAMS_KEYS.ADD_PARISH,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(<AddParishModalDynamic onCancelAction={closeQueryModal} />);
    }, [openModal]),
    onClose: closeModal,
  });

  return { openAddParishModal: open };
};
