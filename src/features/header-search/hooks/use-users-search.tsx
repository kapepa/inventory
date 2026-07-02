"use client"

import { QUERY_PARAMS_KEYS, useModalActions, useModalQuery } from "@/shared";
import { useCallback } from "react";
import { UsersSearchModal } from "../ui";

export const useUsersSearch = () => {
  const { openModal, closeModal } = useModalActions();

  const { open } = useModalQuery({
    modalName: QUERY_PARAMS_KEYS.USERS_SEARCH,
    onOpen: useCallback((closeQueryModal: () => void) => {
      openModal(<UsersSearchModal onCancelAction={closeQueryModal} />);
    }, [openModal]),
    onClose: closeModal,
  });

  return { openUsersSearch: open }
}