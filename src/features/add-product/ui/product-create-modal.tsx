"use client"

import { ModalContents, ModalHeader } from '@/shared/ui/modal'
import { ProductCreateForm } from './product-create-form'
import { useTranslations } from 'next-intl'
import { ProductWithRelationsShort, ProductWithRelationsWide } from '@/entities/product/model/types'

interface ProductCreateModalProps {
  parishId: string
  onCancelAction: () => void
  onSuccessAction: (product: ProductWithRelationsWide | ProductWithRelationsShort) => void
}

export const ProductCreateModal = ({ parishId, onCancelAction, onSuccessAction }: ProductCreateModalProps) => {
  const t = useTranslations('add-product.modal.header');

  return (
    <ModalContents className='h-[90vh] p-0 flex flex-col gap-0 overflow-hidden'>
      <ModalHeader title={t("create")} className='shrink-0' />
      <ProductCreateForm
        parishId={parishId}
        onCancelAction={onCancelAction}
        onSuccessAction={onSuccessAction}
      />
    </ModalContents>
  )
}

ProductCreateModal.displayName = "ProductCreateModal"