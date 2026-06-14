import { useModalActions } from "@/shared";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../../ui";
import { ProductWithRelations } from "@/entities";
import { requestDeleteProduct } from "../../api/product-api";

export const useDeleteProduct = () => {
  const t = useTranslations('groups');
  const { openModal, closeModal } = useModalActions();

  const confirmDeleteProduct = useCallback((product: ProductWithRelations, onSuccess?: () => void) => {
    const title = product.translations[0]?.title || "";

    openModal(
      <DeleteConfirmModal
        title={title}
        onConfirmAction={async () => {
          try {
            await requestDeleteProduct({ id: product.id });
            toast.success(t("sonner.delete-product"));
            if (onSuccess) onSuccess();
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

  return { confirmDeleteProduct };
};