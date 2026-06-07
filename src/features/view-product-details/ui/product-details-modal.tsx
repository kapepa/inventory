import { ProductDetails, ProductsWithRelations } from "@/entities";
import { ModalActionButton, ModalBody, ModalContents, ModalFooter, ModalHeader } from "@/shared"
import { useTranslations } from "next-intl";

interface ProductDetailsModalProps {
  products: ProductsWithRelations
  onCancelAction: () => void;
}

export const ProductDetailsModal = ({ products, onCancelAction }: ProductDetailsModalProps) => {
  const t = useTranslations('groups.groups-relations.product-details-modal');

  return (
    <ModalContents>
      <ModalHeader title={t("product-details")} />
      <ModalBody>
        <ProductDetails products={products} />
      </ModalBody>
      <ModalFooter>
        <ModalActionButton
          variant="simply-accent"
          onConfirmAction={onCancelAction}
        >
          {t("ok")}
        </ModalActionButton>
      </ModalFooter>
    </ModalContents>
  )
}

ProductDetailsModal.displayName = "ProductDetailsModal"