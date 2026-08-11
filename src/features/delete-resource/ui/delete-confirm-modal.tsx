"use client"

import { useTranslations } from "next-intl";
import { CancelButton, SubmitButton } from "@/shared/ui/action-buttons";
import { Trash } from "lucide-react";
import { ModalBody, ModalContents, ModalFooter, ModalHeader } from "@/shared/ui/modal/modal-contents";

interface DeleteConfirmModalProps {
  title: string;
  isLoading: boolean,
  onConfirmAction: () => Promise<void> | void;
  onCancelAction: () => void;
}

export const DeleteConfirmModal = ({
  title,
  isLoading,
  onConfirmAction,
  onCancelAction
}: DeleteConfirmModalProps) => {
  const t = useTranslations();

  return (
    <ModalContents>
      <ModalHeader title={`${t("delete-confirm-modal.title")}?`} />
      <ModalBody>
        <p className="text-base text-muted-foreground">
          <strong>{title}</strong>
        </p>
      </ModalBody>
      <ModalFooter>
        <CancelButton onCancelAction={onCancelAction} disabled={isLoading}>
          {t("delete-confirm-modal.buttons.cancel")}
        </CancelButton>
        <SubmitButton
          variant="simply-destructive"
          isLoading={isLoading}
          onConfirmAction={onConfirmAction}
        >
          <div className="flex gap-x-2">
            <Trash />
            <span>{t("delete-confirm-modal.buttons.delete")}</span>
          </div>
        </SubmitButton>
      </ModalFooter>
    </ModalContents>
  );
};

DeleteConfirmModal.displayName = "DeleteConfirmModal"