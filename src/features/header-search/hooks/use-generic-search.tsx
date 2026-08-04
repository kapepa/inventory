"use client"

import { useCallback } from "react";
import { QueryParamsValue } from "@/shared/types";
import { useModalQuery } from "@/shared/lib/hooks/use-modal-query";
import { GenericSearchModalDynamic } from "../ui/generic-search/generic-search-modal-dynamic";
import { useModalActions } from "@/shared/ui/modal";

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
    }, [openModal, modalName, placeholder]),
    onClose: closeModal,
  });

  return { openGenericSearch: open }
}