"use client"

import { useCallback } from "react";
import { useModalQuery } from "@/shared/lib/hooks/use-modal-query";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { useModalActions } from "@/shared/ui/modal";
import { AddCategoryModalDynamic } from "../../ui/bricks/add-category-modal-dynamic";

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