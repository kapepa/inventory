"use client"

import { useCallback, useState } from 'react'
import { useMediaQuery } from '@/shared/lib/hooks/use-media-query';
import { useModalActions } from '@/shared/ui/modal';
import { ProductWithRelations } from '@/entities/product/model/types';
import { AddProductModalDynamic } from '../../ui/bricks/add-product-modal-dynamic';
import { AddProductSheetDynamic } from '../../ui/bricks/add-product-sheet-dynamic';

export const useAddProduct = ({ parishId, onSuccessAction }: { parishId: string, onSuccessAction: (product: ProductWithRelations) => void }) => {
  const { openModal, closeModal } = useModalActions();
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const productCreate = useCallback(() => {
    if (isDesktop) {
      openModal(<AddProductModalDynamic
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
    <AddProductSheetDynamic
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