"use client"

import { useModalActions, useModalQuery, QUERY_PARAMS_KEYS } from "@/shared";
import { useCallback } from "react";
import { AddCategoryModalDynamic } from "../../ui";

export const useAddCategory = () => {
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName: QUERY_PARAMS_KEYS.ADD_CATEGORY,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(<AddCategoryModalDynamic onCancelAction={closeQueryModal} />);
    }, [openModal]),
    onClose: closeModal,
  });

  return { openAddCategoryModal: open };
};