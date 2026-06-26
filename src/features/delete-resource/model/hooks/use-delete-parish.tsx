"use client"

import { useModalActions } from "@/shared";
import { ParishesType } from "@/entities";
import { DeleteConfirmModal } from "../../ui/delete-confirm-modal";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { requestDeleteParish } from "../../api";

export const useDeleteParish = <T extends ParishesType,>() => {
  const t = useTranslations('parishe');
  const { openModal, closeModal } = useModalActions();

  const confirmDeleteParish = useCallback((parish: T, onSuccess?: () => void) => {
    const title = parish.translations[0]?.title || "";

    openModal(
      <DeleteConfirmModal
        title={title}
        onConfirmAction={async () => {
          try {
            await requestDeleteParish({ id: parish.id });
            toast.success(t("sonner.delete-parish"));
            if (onSuccess) onSuccess()
            closeModal();
          } catch (error) {
            console.error(error);
            toast.error(t("modal.delete-error"));
          }
        }}
        onCancelAction={closeModal}
      />
    );
  }, [closeModal, openModal, t]);

  return { confirmDeleteParish };
};
