import { ERROR_CODES, useModalActions, useRouter, useUnmountCallback } from "@/shared";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { EmailNotVerifiedModal } from "../../ui";
import { requestResendVerification } from "../../api";

export const useVerifiedEmail = () => {
  const t = useTranslations('auth.use-verified-email');
  const router = useRouter()
  const { openModal, closeModal } = useModalActions();
  const { setCallback } = useUnmountCallback()

  const confirmVerifiedEmail = useCallback((email: string) => {

    openModal(
      <EmailNotVerifiedModal
        email={email}
        onConfirmAction={async () => {
          try {
            const verificationLink = await requestResendVerification({ data: { email } })
            router.push(verificationLink)
            setCallback(() => {
              toast.success(t("toasts.verified-email-success"));
            })
          } catch (error) {
            if (error instanceof Error && error.message === ERROR_CODES.EMAIL_NOT_FOUND) {
              toast.error(t('toasts.verified-email-not-exist'));
            } else {
              toast.error(t("toasts.verified-email-error"));
              console.error(error);
            }
          } finally {
            closeModal();
          }
        }}
        onCancelAction={closeModal}
      />
    )
  }, [closeModal, openModal, t]);

  return { confirmVerifiedEmail };
};