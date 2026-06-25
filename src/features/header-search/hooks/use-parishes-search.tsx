"use client"

import { QUERY_PARAMS_KEYS, useModalActions, useModalQuery } from "@/shared";
import { useCallback } from "react";
import { ParishesSearchModal } from "../ui";

export const useParishesSearch = () => {
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName: QUERY_PARAMS_KEYS.PARISHES_SEARCH,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(<ParishesSearchModal onCancelAction={closeQueryModal} />);
    }, [openModal]),
    onClose: closeModal,
  });

  return { openParishesSearch: open }
}