"use client"

import { useModalActions, useModalQuery, QUERY_PARAMS_KEYS } from "@/shared";
import { useCallback } from "react";
import { AddParishModal } from "../../ui";

export const useAddParish = () => {
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName: QUERY_PARAMS_KEYS.ADD_PARISH,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(<AddParishModal onCancelAction={closeQueryModal} />);
    }, [openModal]),
    onClose: closeModal,
  });

  return { openAddParishModal: open };
};
