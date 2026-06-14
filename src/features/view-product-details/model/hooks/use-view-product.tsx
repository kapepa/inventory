import { ProductWithRelations } from "@/entities";
import { useModalActions } from "@/shared";
import { useCallback } from "react";
import { ProductDetailsModal } from "../../ui";

export const useViewProduct = () => {
  const { openModal, closeModal } = useModalActions();

  const productDetails = useCallback((product: ProductWithRelations) => {
    openModal(
      <ProductDetailsModal
        product={product}
        onCancelAction={closeModal}
      />
    );
  }, [closeModal, openModal]);

  return { productDetails };
}