"use client"

import { useTranslations } from "next-intl";
import {
  ModalContents,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCancelButton,
  ModalActionButton
} from "@/shared/ui/modal";
import { Trash } from "lucide-react";

interface DeleteConfirmModalProps {
  title: string;
  onConfirmAction: () => Promise<void>;
  onCancelAction: () => void;
}

export const DeleteConfirmModal = ({
  title,
  onConfirmAction,
  onCancelAction
}: DeleteConfirmModalProps) => {
  const t = useTranslations('parishe');

  return (

    <ModalContents>
      <ModalHeader
        title={`${t("modal.delete-confirm")}?`}
      />
      <ModalBody>
        <p className="text-base text-muted-foreground">
          <strong>{title}</strong>
        </p>
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onCancelAction={onCancelAction}>
          {t("modal.button.cancel")}
        </ModalCancelButton>

        <ModalActionButton variant="simply-destructive" className="flex gap-x-2" onConfirmAction={onConfirmAction}>
          <Trash /> {t("modal.button.delete")}
        </ModalActionButton>
      </ModalFooter>
    </ModalContents>
  );
};