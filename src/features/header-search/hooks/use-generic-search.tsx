"use client"

import { QueryParamsValue, useModalActions, useModalQuery } from "@/shared";
import { useCallback } from "react";
import { GenericSearchModalDynamic } from "../ui/generic-search";

interface UseGenericSearchProps {
  modalName: QueryParamsValue,
  placeholder: string,
}

export const useGenericSearch = ({ modalName, placeholder }: UseGenericSearchProps) => {
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(
        <GenericSearchModalDynamic
          queryKey={modalName}
          placeholder={placeholder}
          onCancelAction={closeQueryModal}
        />
      );
    }, [openModal]),
    onClose: closeModal,
  });

  return { openGenericSearch: open }
}