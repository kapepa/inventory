"use client"

import { useModalActions, useModalQuery, QUERY_PARAMS_KEYS } from "@/shared";
import { AddParishForm } from "../../ui/add-parish-form";
import { useCallback } from "react";

export const useAddParish = () => {
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName: QUERY_PARAMS_KEYS.ADD_PARISH,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(<AddParishForm closeModalAction={closeQueryModal} />);
    }, [openModal]),
    onClose: closeModal,
  });

  return { openAddParishModal: open };
};
