"use client"

import { useCallback } from "react";
import { AddParishModalDynamic } from "../../ui/add-parish-modal-dynamic";
import { useModalQuery } from "@/shared/lib/hooks/use-modal-query";
import { QUERY_PARAMS_KEYS } from "@/shared/constants";
import { useModalActions } from "@/shared/ui/modal";

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
