"use client"

import { ModalContents, ModalHeader } from '@/shared'
import { ProductCreateForm } from './product-create-form'
import { useTranslations } from 'next-intl'
import { ProductWithRelationsWide, ProductWithRelationsShort } from '@/entities'

interface ProductCreateModalProps {
  parishId: string
  onCancelAction: () => void
  onSuccessAction: (product: ProductWithRelationsWide | ProductWithRelationsShort) => void
}

export const ProductCreateModal = ({ parishId, onCancelAction, onSuccessAction }: ProductCreateModalProps) => {
  const t = useTranslations('add-product.modal.header');

  return (
    <ModalContents>
      <ModalHeader title={t("create")} />
      <ProductCreateForm
        parishId={parishId}
        onCancelAction={onCancelAction}
        onSuccessAction={onSuccessAction}
      />
    </ModalContents>
  )
}

ProductCreateModal.displayName = "ProductCreateModal"