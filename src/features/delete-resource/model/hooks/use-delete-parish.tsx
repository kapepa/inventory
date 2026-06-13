"use client"

import { useModalActions } from "@/shared/ui/modal";
import { ParishWithRelations, deleteParish, useParishesStore } from "@/entities";
import { DeleteConfirmModal } from "../../ui/delete-confirm-modal";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export const useDeleteParish = () => {
  const t = useTranslations('parishe');
  const { openModal, closeModal } = useModalActions();
  const { removeParish } = useParishesStore();

  const confirmDeleteParish = useCallback((parish: ParishWithRelations) => {
    const title = parish.translations[0]?.title || "";

    openModal(
      <DeleteConfirmModal
        title={title}
        onConfirmAction={async () => {
          try {
            await deleteParish({ id: parish.id });
            removeParish(parish.id);
            toast.success(t("sonner.delete-parish"));
            closeModal();
          } catch (error) {
            console.error(error);
            toast.error(t("modal.delete-error"));
          }
        }}
        onCancelAction={closeModal}
      />
    );
  }, [closeModal, openModal, t, removeParish]);

  return { confirmDeleteParish };
};
