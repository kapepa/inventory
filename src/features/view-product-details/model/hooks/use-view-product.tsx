import { useModalActions } from "@/shared";
import { useCallback } from "react";
import { ProductDetailsModal } from "../../ui";
import { ProductWithRelationsShort, ProductWithRelationsWide } from "@/entities";

type ProductWithRelations = ProductWithRelationsShort | ProductWithRelationsWide

export const useViewProduct = <T extends ProductWithRelations,>() => {
  const { openModal, closeModal } = useModalActions();

  const productDetails = useCallback((product: T) => {
    openModal(
      <ProductDetailsModal
        product={product}
        onCancelAction={closeModal}
      />
    );
  }, [closeModal, openModal]);

  return { productDetails };
}