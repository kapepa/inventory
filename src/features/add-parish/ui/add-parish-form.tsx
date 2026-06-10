"use client"

import { useLocale, useTranslations } from "next-intl"
import {
  ModalActionButton,
  ModalBody,
  ModalCancelButton,
  ModalFooter,
  Form,
  AppLocale,
  Tabs,
  TabsContent,
} from "@/shared"
import { useAddParishForm, useAddParishTranslation } from "../model"
import { TranslationFields } from "./translation-fields"
import { DeliveryDateField } from "./delivery-date-field"
import { TranslationTabsHeader } from "./translation-tabs-header"

interface AddParishFormProps {
  onCancelAction: () => void
}

export const AddParishForm = ({ onCancelAction }: AddParishFormProps) => {
  const currentLocale = useLocale() as AppLocale
  const t = useTranslations("add-parish.form")
  const { form, isSubmitting, onSubmit } = useAddParishForm(onCancelAction)
  const { isTranslating, translatingField, handleTranslateAction } = useAddParishTranslation(form)

  const isPending = isSubmitting || isTranslating

  return (
    <>
      <ModalBody>
        <Form {...form}>
          <form id="add-parish-form" onSubmit={onSubmit}>
            <div className="grid w-full gap-7 pb-7">
              <Tabs
                defaultValue={currentLocale}
                className="w-full"
              >
                <TranslationTabsHeader />

                <TabsContent value="ru">
                  <TranslationFields
                    locale="ru"
                    isPending={isPending}
                    handleTranslateAction={handleTranslateAction}
                    autoFocus={currentLocale === "ru"}
                    translatingFieldName={translatingField?.locale === "ru" ? translatingField.name : null}
                  />
                </TabsContent>

                <TabsContent value="en">
                  <TranslationFields
                    locale="en"
                    isPending={isPending}
                    handleTranslateAction={handleTranslateAction}
                    autoFocus={currentLocale === "en"}
                    translatingFieldName={translatingField?.locale === "en" ? translatingField.name : null}
                  />
                </TabsContent>
              </Tabs>

              <DeliveryDateField isPending={isPending} locale={currentLocale} />
            </div>
          </form>
        </Form>
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton
          type="button"
          onCancelAction={onCancelAction}
          disabled={isPending}
        >
          {t("buttons.cancel")}
        </ModalCancelButton>
        <ModalActionButton
          form="add-parish-form"
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
