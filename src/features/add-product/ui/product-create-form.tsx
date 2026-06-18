"use client"

import { useProductTranslation, useProductCreateForm } from '../model'
import { AppLocale, FooterBar, Form, ModalActionButton, ModalCancelButton, OverlayBody, ScrollArea, Tabs, TabsContent } from '@/shared'
import { useLocale, useTranslations } from 'next-intl'
import { TranslationFields } from './translation-fields'
import { TranslationTabsHeader } from './translation-tabs-header'
import { SerialNumberField } from './serial-number-field'
import { OrderField } from './order-field'
import { StatusField } from './status-field'
import { ConditionField } from './condition-field'
import { PhotoField } from './photo-field'
import { PriceFields } from './price-fields'
import { CategoryField } from './category-field'
import { ProductWithRelations } from '@/entities'

interface ProductCreateFormProps {
  parishId: string
  onCancelAction: () => void
  onSuccessAction: (product: ProductWithRelations) => void
}

export const ProductCreateForm = ({ parishId, onCancelAction, onSuccessAction }: ProductCreateFormProps) => {
  const t = useTranslations("add-product.create-form")
  const locale = useLocale() as AppLocale

  const { form, isSubmitting, onSubmit } = useProductCreateForm(parishId, onCancelAction, onSuccessAction)
  const { isTranslating, translatingField, handleTranslateAction } = useProductTranslation(form)

  const isPending = isSubmitting || isTranslating

  return (
    <>
      <ScrollArea className="h-full flex-1 min-h-0">
        <OverlayBody>
          <Form {...form}>
            <form id="add-product-form" onSubmit={onSubmit} className="space-y-6 pb-5">
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
              <PhotoField isPending={isPending} />
              <PriceFields isPending={isPending} />
            </form >
          </Form>
        </OverlayBody>
      </ScrollArea>
      <FooterBar>
        <ModalCancelButton
          type="button"
          onCancelAction={onCancelAction}
          disabled={isPending}
          className='hidden sm:flex'
        >
          {t("buttons.cancel")}
        </ModalCancelButton>
        <ModalCancelButton
          type="button"
          onClick={() => form.reset()}
          disabled={isPending}
        >
          {t("buttons.reset")}
        </ModalCancelButton>
        <ModalActionButton
          form="add-product-form"
          type="submit"
          variant="simply-accent"
          isLoading={isSubmitting}
          disabled={isPending}
        >
          {t("buttons.create")}
        </ModalActionButton>
      </FooterBar>
    </>
  )
}