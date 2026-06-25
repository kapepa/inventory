"use client"

import { QUERY_PARAMS_KEYS, useModalActions, useModalQuery } from "@/shared";
import { useCallback } from "react";
import { ProductsSearchModal } from "../ui";

export const useProductsSearch = () => {
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName: QUERY_PARAMS_KEYS.PRODUCTS_SEARCH,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(<ProductsSearchModal onCancelAction={closeQueryModal} />);
    }, [openModal]),
    onClose: closeModal,
  });

  return { openProductsSearch: open }
}