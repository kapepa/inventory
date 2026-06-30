import { useModalActions } from "@/shared";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../../ui";
import { requestDeleteProduct } from "../../api/product-api";
import { ProductWithRelations } from "@/entities";

export const useDeleteProduct = <T extends ProductWithRelations,>() => {
  const t = useTranslations('groups');
  const { openModal, closeModal } = useModalActions();

  const confirmDeleteProduct = useCallback((product: T, onSuccess?: () => void) => {
    const title = product.translations[0]?.title || "";

    openModal(
      <DeleteConfirmModal
        title={title}
        onConfirmAction={async () => {
          try {
            await requestDeleteProduct({ id: product.id });
            toast.success(t("sonner.delete-product-success"));
            if (onSuccess) onSuccess();
          } catch (error) {
            console.error(error);
            toast.error(t("sonner.delete-error-product"));
          } finally {
            closeModal();
          }
        }}
        onCancelAction={closeModal}
      />
    );
  }, [closeModal, openModal, t]);

  return { confirmDeleteProduct };
};