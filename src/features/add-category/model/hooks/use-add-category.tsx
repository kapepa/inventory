"use client"

import { useModalActions, useModalQuery, QUERY_PARAMS_KEYS } from "@/shared";
import { useCallback } from "react";
import { AddCategoryModal } from "../../ui/add-category-modal";

export const useAddCategory = () => {
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName: QUERY_PARAMS_KEYS.ADD_CATEGORY,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(<AddCategoryModal onCancelAction={closeQueryModal} />);
    }, [openModal]),
    onClose: closeModal,
  });

  return { openAddCategoryModal: open };
};