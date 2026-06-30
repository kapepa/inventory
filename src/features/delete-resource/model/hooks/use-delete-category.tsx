import { useModalActions } from "@/shared";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../../ui";
import { requestDeleteCategory } from "../../api/category-api";
import { CategoryWithProductCount } from "@/entities";
import { CategoryHasProductsError } from "../server";

export const useDeleteCategory = <T extends CategoryWithProductCount,>() => {
  const t = useTranslations('category');
  const { openModal, closeModal } = useModalActions();

  const confirmDeleteCategory = useCallback((category: T, onSuccess?: () => void) => {
    const title = category.translations[0]?.title || "";

    if (category._count.products >= 1) {
      toast.error(t("sonner.cannot-delete-with-products"));
      return;
    }

    openModal(
      <DeleteConfirmModal
        title={title}
        onConfirmAction={async () => {
          try {
            await requestDeleteCategory({ id: category.id });
            toast.success(t("sonner.delete-category-success"));
            if (onSuccess) onSuccess();
          } catch (error) {
            if (error instanceof CategoryHasProductsError) {
              toast.error(t("sonner.cannot-delete-with-products"));
            } else {
              toast.error(t("sonner.delete-error-category"));
            }
            console.error(error);
          } finally {
            closeModal();
          }
        }}
        onCancelAction={closeModal}
      />
    );
  }, [closeModal, openModal, t]);

  return { confirmDeleteCategory };
};