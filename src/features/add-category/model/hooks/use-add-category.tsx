"use client"

import { useCallback } from "react";
import { AddCategoryModalDynamic } from "../../ui/add-category-modal-dynamic";
import { useModalQuery } from "@/shared/lib/hooks/use-modal-query";
import { QUERY_PARAMS_KEYS } from "@/shared/constants";
import { useModalActions } from "@/shared/ui/modal";

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