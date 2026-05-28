"use client"

import { useModalActions } from "@/shared/ui/modal";
import { ParishWithRelations } from "@/entities/parish";
import { DeleteConfirmModal } from "../ui/delete-confirm-modal";
import { deleteParish } from "@/entities/parish/api/parish-api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useCallback } from "react";


export const useDeleteParish = () => {
  const t = useTranslations("parishe");
  const { openModal, closeModal } = useModalActions();

  const confirmDelete = useCallback((parish: ParishWithRelations, onSuccess: (id: string) => void) => {
    openModal(
      <DeleteConfirmModal
        title={parish.translations[0].title}
        onConfirmAction={async () => {
          await deleteParish({ id: parish.id });
          onSuccess(parish.id);
          toast.success(t("sonner.delete-parish"))
          closeModal();
        }}
        onCancelAction={closeModal}
      />,
    )
  }, [closeModal, openModal, t]);

  return { confirmDelete };
};