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
import { useTransition } from "react";

interface EmailNotVerifiedModalProps {
  email: string
  onConfirmAction: () => Promise<void> | void;
  onCancelAction: () => void;
}

export const EmailNotVerifiedModal = ({
  email,
  onConfirmAction,
  onCancelAction
}: EmailNotVerifiedModalProps) => {
  const t = useTranslations('auth.email-not-verified-modal');
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await onConfirmAction();
    });
  };

  return (
    <ModalContents>
      <ModalHeader title={`${t("header-title")}`} />
      <ModalBody>
        <p className="text-base text-muted-foreground">
          <strong>{t("notification", { email })}</strong>
        </p>
      </ModalBody>
      <ModalFooter>
        <CancelButton onCancelAction={onCancelAction} disabled={isPending}>
          {t("buttons.cancel")}
        </CancelButton>
        <SubmitButton
          variant="simply-accent"
          isLoading={isPending}
          onConfirmAction={handleConfirm}
        >
          <span>{t("buttons.confirm")}</span>
        </SubmitButton>
      </ModalFooter>
    </ModalContents>
  );
};

EmailNotVerifiedModal.displayName = "EmailNotVerifiedModal"