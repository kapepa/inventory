"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/shared'
import { ProductCreateForm } from './product-create-form'
import { ProductWithRelations } from '@/entities'
import { memo } from 'react'
import { useTranslations } from 'next-intl'

interface ProductCreateSheetProps {
  isOpen: boolean
  parishId: string
  onOpenChangeAction: (val: boolean) => void
  onSuccessAction: (product: ProductWithRelations) => void
}

export const ProductCreateSheet = memo(({ isOpen, parishId, onOpenChangeAction, onSuccessAction }: ProductCreateSheetProps) => {
  const t = useTranslations('add-product.modal.header');

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChangeAction}>
      <SheetContent
        side="bottom"
        className="h-[95vh]! sm:h-[90vh]! p-0 flex flex-col gap-0 overflow-hidden"
      >
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle>{t("create")}</SheetTitle>
        </SheetHeader>

        <ProductCreateForm
          parishId={parishId}
          onCancelAction={() => onOpenChangeAction(false)}
          onSuccessAction={onSuccessAction}
        />
      </SheetContent>
    </Sheet>
  )
})

ProductCreateSheet.displayName = "ProductCreateSheet"