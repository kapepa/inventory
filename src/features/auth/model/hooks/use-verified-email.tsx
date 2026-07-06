import { useModalActions } from "@/shared";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { CategoryWithProductCount } from "@/entities";
import { EmailNotVerifiedModal } from "../../ui";


export const useVerifiedEmail = () => {
  const t = useTranslations('auth.use-verified-email');
  const { openModal, closeModal } = useModalActions();

  const confirmVerifiedEmail = useCallback((email: string) => {

    openModal(
      <EmailNotVerifiedModal
        email={email}
        onConfirmAction={async () => {
          try {
            // to do api request
            toast.success(t("toasts.verified-email-success"));
          } catch (error) {
            toast.error(t("toasts.verified-email-error"));
            console.error(error);
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