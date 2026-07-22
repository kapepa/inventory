"use client"

import { NotFoundError, useModalActions, useRouter } from "@/shared";
import { useTranslations } from "next-intl";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";
import { EmailNotVerifiedModalDynamic } from "../../ui";
import { requestResendVerification } from "../../api";

interface EmailNotVerifiedModalWrapperProps {
  email: string; onCloseAction: () => void;
}

export const EmailNotVerifiedModalWrapper = ({
  email, onCloseAction
}: EmailNotVerifiedModalWrapperProps) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('auth.use-verified-email');
  const router = useRouter();

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const verificationLink = await requestResendVerification({ data: { email } })
        router.push(verificationLink)
        toast.success(t("toasts.verified-email-success"));
      } catch (error) {
        if (error instanceof NotFoundError) {
          toast.error(t('toasts.verified-email-not-exist'));
        } else if (error instanceof NotFoundError) {
          toast.error(t('toasts.resend-email-failed'));
        } else {
          toast.error(t("toasts.verified-email-error"));
          console.error(error);
        }
      } finally {
        onCloseAction();
      }
    });
  };

  return (
    <EmailNotVerifiedModalDynamic
      email={email}
      isLoading={isPending}
      onConfirmAction={handleConfirm}
      onCancelAction={onCloseAction}
    />
  );
};


export const useVerifiedEmail = () => {
  const { openModal, closeModal } = useModalActions();

  const confirmVerifiedEmail = useCallback((email: string) => {
    openModal(
      <EmailNotVerifiedModalWrapper
        email={email}
        onCloseAction={closeModal}
      />
    )
  }, [closeModal, openModal]);

  return { confirmVerifiedEmail };
};