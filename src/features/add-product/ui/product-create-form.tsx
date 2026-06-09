"use client"

import { useProductTranslation, useProductCreateForm } from '../model'
import { AppLocale, Form, ModalActionButton, ModalBody, ModalCancelButton, ModalFooter, Tabs, TabsContent } from '@/shared'
import { useLocale, useTranslations } from 'next-intl'
import { TranslationFields } from './translation-fields'
import { TranslationTabsHeader } from './translation-tabs-header'
import { SerialNumberField } from './serial-number-field'
import { OrderField } from './order-field'
import { StatusField } from './status-field'
import { ConditionField } from './condition-field'
import { PhotoField } from './photo-field'
import { PriceFields } from './price-fields'

interface ProductCreateFormProps {
  parishId: string
  onOpenChangeAction: () => void
}

export const ProductCreateForm = ({ parishId, onOpenChangeAction }: ProductCreateFormProps) => {
  const t = useTranslations("add-product.create-form")
  const locale = useLocale() as AppLocale

  const { form, isSubmitting, onSubmit } = useProductCreateForm(parishId, onOpenChangeAction)
  const { isTranslating, translatingField, handleTranslateAction } = useProductTranslation(form)

  const isPending = isSubmitting || isTranslating

  return (
    <>
      <ModalBody>
        <Form {...form}>
          <form id="add-product-form" onSubmit={onSubmit} className="space-y-4 pb-5">
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
            <div className='grid grid-cols-2 gap-x-10'>
              <StatusField isPending={isPending} />
              <ConditionField isPending={isPending} />
            </div>
            <PhotoField isPending={isPending} />
            <PriceFields isPending={isPending} />
          </form >
        </Form>
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton
          type="button"
          onCancelAction={onOpenChangeAction}
          disabled={isPending}
        >
          {t("buttons.cancel")}
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
      </ModalFooter>
    </>

  )
}