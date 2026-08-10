"use client"

import { useTranslations } from "next-intl";
import { CancelButton, SubmitButton } from "@/shared/ui";
import { ModalBody, ModalContents, ModalFooter, ModalHeader } from "@/shared/ui/modal/modal-contents";

interface EmailNotVerifiedModalProps {
  email: string
  isLoading: boolean,
  onConfirmAction: () => Promise<void> | void;
  onCancelAction: () => void;
}

export const EmailNotVerifiedModal = ({
  email,
  isLoading,
  onConfirmAction,
  onCancelAction
}: EmailNotVerifiedModalProps) => {
  const t = useTranslations('auth.email-not-verified-modal');

  return (
    <ModalContents>
      <ModalHeader title={`${t("header-title")}`} />
      <ModalBody>
        <p className="text-base text-muted-foreground">
          <strong>{t("notification", { email })}</strong>
        </p>
      </ModalBody>
      <ModalFooter>
        <CancelButton onCancelAction={onCancelAction} disabled={isLoading}>
          {t("buttons.cancel")}
        </CancelButton>
        <SubmitButton
          variant="simply-accent"
          isLoading={isLoading}
          onConfirmAction={onConfirmAction}
        >
          <span>{t("buttons.confirm")}</span>
        </SubmitButton>
      </ModalFooter>
    </ModalContents>
  );
};

EmailNotVerifiedModal.displayName = "EmailNotVerifiedModal"