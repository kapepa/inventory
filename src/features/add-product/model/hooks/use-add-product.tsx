"use client"

import { useCallback, useState } from 'react'
import { useMediaQuery, useModalActions } from '@/shared'
import { ProductCreateModalDynamic } from '../../ui/product-create-modal-dynamic';
import { ProductCreateSheetDynamic } from '../../ui/product-create-sheet-dynamic';
import { ProductWithRelations } from '@/entities';

export const useAddProduct = ({ parishId, onSuccessAction }: { parishId: string, onSuccessAction: (product: ProductWithRelations) => void }) => {
  const { openModal, closeModal } = useModalActions();
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const productCreate = useCallback(() => {
    if (isDesktop) {
      openModal(<ProductCreateModalDynamic
        parishId={parishId}
        onSuccessAction={onSuccessAction}
        onCancelAction={closeModal}
      />
      )
    } else {
      setIsSheetOpen(true)
    }

  }, [parishId, openModal, closeModal, onSuccessAction, isDesktop])

  const ProductCreateElement = (
    <ProductCreateSheetDynamic
      isOpen={isSheetOpen}
      onOpenChangeAction={setIsSheetOpen}
      parishId={parishId}
      onSuccessAction={(product) => {
        onSuccessAction(product)
        setIsSheetOpen(false)
      }}
    />
  )

  return {
    productCreate,
    ProductCreateElement
  }
}