"use client"

import { useLocale, useTranslations } from 'next-intl'
import { TranslationFields } from './bricks/translation-fields'
import { SerialNumberField } from './bricks/serial-number-field'
import { OrderField } from './bricks/order-field'
import { StatusField } from './bricks/status-field'
import { ConditionField } from './bricks/condition-field'
import { PhotoField } from './bricks/photo-field'
import { PriceFields } from './bricks/price-fields'
import { CategoryField } from './bricks/category-field'
import { useCallback, useRef } from 'react'
import { Form } from '@/shared/ui/form'
import { AppLocale } from '@/shared/lib/i18n/config'
import { ProductWithRelationsShort, ProductWithRelationsWide } from '@/entities/product/model/types'
import { PhotoFieldRef } from '../model/types'
import { useProductCreateForm } from '../model/hooks/use-product-create-form'
import { useProductTranslation } from '../model/hooks/use-product-translation'
import { TranslationTabsHeader } from './bricks/translation-tabs-header'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { OverlayBody } from '@/shared/ui/overlay-body'
import { Tabs, TabsContent } from '@/shared/ui/tabs'
import { FooterBar } from '@/shared/ui/footer-bar'
import { CancelButton, SubmitButton } from '@/shared/ui/action-buttons'


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