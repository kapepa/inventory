"use client"

import { ModalActionButton, ModalBody, ModalContents, ModalFooter, ModalHeader } from '@/shared'
import { ProductCreateForm } from './product-create-form'
import { useTranslations } from 'next-intl'

interface ProductCreateModalProps {
  parishId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ProductCreateModal = ({ parishId }: ProductCreateModalProps) => {
  const t = useTranslations('add-product.modal.header');

  return (
    <ModalContents>
      <ModalHeader title={t("create")} />
      <ModalBody>
        <ProductCreateForm
          parishId={parishId}
          onSuccess={() => { }}
          onCancel={() => { }}
        />
      </ModalBody>
      <ModalFooter>
        <ModalActionButton
          variant="simply-accent"
          onConfirmAction={() => { }}
        >
          {t("ok")}
        </ModalActionButton>
      </ModalFooter>
    </ModalContents>
  )
}