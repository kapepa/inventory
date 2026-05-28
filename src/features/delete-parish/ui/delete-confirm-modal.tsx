"use client"

import { useTranslations } from "next-intl";
import {
  ModalContents,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@/shared/ui/modal";
import { Button } from "@/shared";
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
  const t = useTranslations("parishe");

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
        <Button variant="simple" className="cursor-pointer px-7 py-5 rounded-full uppercase" onClick={onCancelAction}>
          <span className="text-white">{t("modal.button.cancel")}</span>
        </Button>
        <Button variant="secondary" className="cursor-pointer px-7 py-5 rounded-full flex gap-x-2 uppercase" onClick={onConfirmAction}>
          <Trash className="text-destructive" /><span className="text-destructive">{t("modal.button.delete")}</span>
        </Button>
      </ModalFooter>
    </ModalContents>
  );
};