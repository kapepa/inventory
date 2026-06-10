"use client"

import { ModalContents, ModalHeader } from '@/shared'
import { ProductCreateForm } from './product-create-form'
import { useTranslations } from 'next-intl'

interface ProductCreateModalProps {
  parishId: string
  onCancelAction: () => void
}

export const ProductCreateModal = ({ parishId, onCancelAction }: ProductCreateModalProps) => {
  const t = useTranslations('add-product.modal.header');

  return (
    <ModalContents>
      <ModalHeader title={t("create")} />
      <ProductCreateForm
        parishId={parishId}
        onCancelAction={onCancelAction}
      />
    </ModalContents>
  )
}

ProductCreateModal.displayName = "ProductCreateModal"