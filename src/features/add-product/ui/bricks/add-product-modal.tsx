"use client"

import { AddProductForm } from '../add-product-form'
import { ModalContents, ModalHeader } from '@/shared/ui/modal/modal-contents'
import { useTranslations } from 'next-intl'
import { ProductWithRelationsShort, ProductWithRelationsWide } from '@/entities/product/model/types'

interface ProductCreateModalProps {
  parishId: string
  onCancelAction: () => void
  onSuccessAction: (product: ProductWithRelationsWide | ProductWithRelationsShort) => void
}

export const AddProductModal = ({ parishId, onCancelAction, onSuccessAction }: ProductCreateModalProps) => {
  const t = useTranslations('add-product.modal.header');

  return (
    <ModalContents className='h-[90vh] p-0 flex flex-col gap-0 overflow-hidden'>
      <ModalHeader title={t("create")} className='shrink-0' />
      <AddProductForm
        parishId={parishId}
        onCancelAction={onCancelAction}
        onSuccessAction={onSuccessAction}
      />
    </ModalContents>
  )
}

AddProductModal.displayName = "AddProductModal"