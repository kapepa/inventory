"use client"

import { FooterBar, SubmitButton, CancelButton, OverlayBody, ScrollArea, Tabs, TabsContent, Skeleton } from '@/shared/ui'
import { useLocale, useTranslations } from 'next-intl'
import { TranslationFields, TranslationFieldsSkeleton } from './bricks/translation-fields'
import { SerialNumberField, SerialNumberFieldSkeleton } from './bricks/serial-number-field'
import { OrderField, OrderFieldSkeleton } from './bricks/order-field'
import { StatusField, StatusFieldSkeleton } from './bricks/status-field'
import { ConditionField, ConditionFieldSkeleton } from './bricks/condition-field'
import { PhotoField, PhotoFieldSkeleton } from './bricks/photo-field'
import { PriceFields, PriceFieldsSkeleton } from './bricks/price-fields'
import { CategoryField, CategoryFieldSkeleton } from './bricks/category-field'
import { useCallback, useRef } from 'react'
import { Form } from '@/shared/ui/form'
import { AppLocale } from '@/shared/lib/i18n/config'
import { ProductWithRelationsShort, ProductWithRelationsWide } from '@/entities/product/model/types'
import { PhotoFieldRef } from '../model/types'
import { useProductCreateForm } from '../model/hooks/use-product-create-form'
import { useProductTranslation } from '../model/hooks/use-product-translation'
import { TranslationTabsHeader } from './bricks/translation-tabs-header'


interface ProductCreateFormProps {
  parishId: string
  onCancelAction: () => void
  onSuccessAction: (product: ProductWithRelationsWide | ProductWithRelationsShort) => void
}

export const AddProductForm = ({ parishId, onCancelAction, onSuccessAction }: ProductCreateFormProps) => {
  const t = useTranslations("add-product.create-form")
  const locale = useLocale() as AppLocale
  const photoFieldRef = useRef<PhotoFieldRef>(null)

  const { form, isSubmitting, onReset, onSubmit } = useProductCreateForm(parishId, onCancelAction, onSuccessAction)
  const { isTranslating, translatingField, handleTranslateAction } = useProductTranslation(form)

  const isPending = isSubmitting || isTranslating

  const handleReset = useCallback(() => {
    photoFieldRef.current?.clearImage()
    onReset()
  }, [onReset])

  return (
    <>
      <ScrollArea className="h-full flex-1 min-h-0">
        <OverlayBody>
          <Form {...form}>
            <form id="add-product-form" onSubmit={onSubmit} className="flex flex-col gap-y-6 pb-5">
              <Tabs
                defaultValue={locale}
                className="w-full"
              >
                <TranslationTabsHeader />

                <TabsContent value="ru">
                  <TranslationFields
                    locale="ru"
                    isPending={isPending}
                    handleTranslateAction={handleTranslateAction}
                    autoFocus={locale === "ru"}
                    translatingFieldName={translatingField?.locale === "ru" ? translatingField.name : null}
                  />
                </TabsContent>

                <TabsContent value="en">
                  <TranslationFields
                    locale="en"
                    isPending={isPending}
                    handleTranslateAction={handleTranslateAction}
                    autoFocus={locale === "en"}
                    translatingFieldName={translatingField?.locale === "en" ? translatingField.name : null}
                  />
                </TabsContent>
              </Tabs>

              <SerialNumberField isPending={isPending} />
              <OrderField isPending={isPending} />
              <div className='grid grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-5'>
                <StatusField isPending={isPending} />
                <ConditionField isPending={isPending} />
                <CategoryField isPending={isPending} className="col-span-2 sm:col-span-1" />
              </div>
              <PhotoField ref={photoFieldRef} isPending={isPending} />
              <PriceFields isPending={isPending} />
            </form >
          </Form>
        </OverlayBody>
      </ScrollArea>
      <FooterBar>
        <CancelButton
          type="button"
          onClick={handleReset}
          disabled={isPending}
        >
          {t("buttons.reset")}
        </CancelButton>
        <SubmitButton
          form="add-product-form"
          type="submit"
          variant="simply-accent"
          isLoading={isSubmitting}
          disabled={isPending}
        >
          {t("buttons.create")}
        </SubmitButton>
      </FooterBar>
    </>
  )
}

AddProductForm.displayName = "AddProductForm"

export const AddProductFormSkeleton = () => {
  return (
    <>
      <ScrollArea className="h-full flex-1 min-h-0">
        <OverlayBody>
          <div className="flex flex-col gap-y-6 pb-5">
            <Skeleton className="h-8 w-full" />
            <div className="flex flex-col w-full mt-2 mb-8.5 gap-6 md:gap-7">
              <TranslationFieldsSkeleton />
              <SerialNumberFieldSkeleton />
              <OrderFieldSkeleton />
              <div className='grid grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-5'>
                <StatusFieldSkeleton />
                <ConditionFieldSkeleton />
                <CategoryFieldSkeleton />
              </div>
              <PhotoFieldSkeleton />
              <PriceFieldsSkeleton />
            </div>
          </div>
        </OverlayBody>
      </ScrollArea>
      <FooterBar>
        <Skeleton className="h-11 w-full rounded-full" />
        <Skeleton className="h-11 w-full rounded-full" />
      </FooterBar>
    </>
  )
}

AddProductFormSkeleton.displayName = "AddProductFormSkeleton"