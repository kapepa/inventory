"use client";

import { Modal } from "./modal";
import { useModal } from "./modal-context";

export const ModalRoot = () => {
  const { isOpen, content, closeModal } = useModal();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {content}
    </Modal>
  );
};