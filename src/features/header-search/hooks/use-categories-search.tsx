"use client"

import { QUERY_PARAMS_KEYS, useModalActions, useModalQuery } from "@/shared";
import { useCallback } from "react";
import { CategoriesSearchModal } from "../ui";

export const useCategoriesSearch = () => {
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName: QUERY_PARAMS_KEYS.CATEGORIES_SEARCH,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(<CategoriesSearchModal onCancelAction={closeQueryModal} />);
    }, [openModal]),
    onClose: closeModal,
  });

  return { openCategoriesSearch: open }
}