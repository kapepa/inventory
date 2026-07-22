"use client"

import { useModalActions, useModalQuery, QUERY_PARAMS_KEYS } from "@/shared";
import { useCallback } from "react";
import { AddParishModalDynamic } from "../../ui";

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
