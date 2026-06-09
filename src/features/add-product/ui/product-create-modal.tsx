"use client"

import { ModalActionButton, ModalBody, ModalContents, ModalFooter, ModalHeader } from '@/shared'
import { ProductCreateForm } from './product-create-form'
import { useTranslations } from 'next-intl'

interface ProductCreateModalProps {
  parishId: string
  onOpenChangeAction: () => void
}

export const ProductCreateModal = ({ parishId, onOpenChangeAction }: ProductCreateModalProps) => {
  const t = useTranslations('add-product.modal.header');

  return (
    <ModalContents>
      <ModalHeader title={t("create")} />
      <ProductCreateForm
        parishId={parishId}
        onOpenChangeAction={onOpenChangeAction}
      />
    </ModalContents>
  )
}

ProductCreateModal.displayName = "ProductCreateModal"