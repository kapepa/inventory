import { ProductDetails, ProductsWithRelations } from "@/entities";
import { ModalActionButton, ModalBody, ModalContents, ModalFooter, ModalHeader } from "@/shared"
import { useTranslations } from "next-intl";

interface ProductDetailsModalProps {
  product: ProductsWithRelations
  onCancelAction: () => void;
}

export const ProductDetailsModal = ({ product, onCancelAction }: ProductDetailsModalProps) => {
  const t = useTranslations('groups.groups-relations.product-details-modal');

  return (
    <ModalContents>
      <ModalHeader title={t("product-details")} />
      <ModalBody>
        <ProductDetails product={product} />
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