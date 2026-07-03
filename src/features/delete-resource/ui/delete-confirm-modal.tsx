"use client"

import { useTranslations } from "next-intl";
import {
  ModalContents,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCancelButton,
  ModalActionButton
} from "@/shared";
import { Trash } from "lucide-react";
import { useTransition } from "react";

interface DeleteConfirmModalProps {
  title: string;
  onConfirmAction: () => Promise<void> | void;
  onCancelAction: () => void;
}

export const DeleteConfirmModal = ({
  title,
  onConfirmAction,
  onCancelAction
}: DeleteConfirmModalProps) => {
  const t = useTranslations('parish.modal');
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await onConfirmAction();
    });
  };

  return (
    <ModalContents>
      <ModalHeader title={`${t("delete-confirm")}?`} />
      <ModalBody>
        <p className="text-base text-muted-foreground">
          <strong>{title}</strong>
        </p>
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onCancelAction={onCancelAction} disabled={isPending}>
          {t("buttons.cancel")}
        </ModalCancelButton>
        <ModalActionButton
          variant="simply-destructive"
          isLoading={isPending}
          onConfirmAction={handleConfirm}
        >
          <div className="flex gap-x-2">
            <Trash />
            <span>{t("buttons.delete")}</span>
          </div>
        </ModalActionButton>
      </ModalFooter>
    </ModalContents>
  );
};
