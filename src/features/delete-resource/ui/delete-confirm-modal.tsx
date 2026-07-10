"use client"

import { useTranslations } from "next-intl";
import {
  ModalContents,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CancelButton,
  SubmitButton
} from "@/shared";
import { Trash } from "lucide-react";
import { useTransition } from "react";

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
  const t = useTranslations('parish.modal');

  return (
    <ModalContents>
      <ModalHeader title={`${t("delete-confirm")}?`} />
      <ModalBody>
        <p className="text-base text-muted-foreground">
          <strong>{title}</strong>
        </p>
      </ModalBody>
      <ModalFooter>
        <CancelButton onCancelAction={onCancelAction} disabled={isLoading}>
          {t("buttons.cancel")}
        </CancelButton>
        <SubmitButton
          variant="simply-destructive"
          isLoading={isLoading}
          onConfirmAction={onConfirmAction}
        >
          <div className="flex gap-x-2">
            <Trash />
            <span>{t("buttons.delete")}</span>
          </div>
        </SubmitButton>
      </ModalFooter>
    </ModalContents>
  );
};
