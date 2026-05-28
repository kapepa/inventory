"use client";

import { Modal } from "./modal";
import { useModalActions, useModalState } from "./modal-context";

export const ModalRoot = () => {
  const { isOpen, content } = useModalState();
  const { closeModal } = useModalActions();

  return (
    <Modal isOpen={isOpen} onCloseAction={closeModal}>
      {content}
    </Modal>
  );
};