"use client"

import { useLocale, useTranslations } from "next-intl"
import { CancelButton, SubmitButton, Tabs, TabsContent } from "@/shared/ui"
import { TranslationFields } from "./translation-fields"
import { DeliveryDateField } from "./delivery-date-field"
import { TranslationTabsHeader } from "./translation-tabs-header"
import { ModalBody, ModalFooter } from "@/shared/ui/modal"
import { Form } from "@/shared/ui/form"
import { AppLocale } from "@/shared/lib/i18n/config"
import { useAddParishForm } from "../model/hooks/use-add-parish-form"
import { useAddParishTranslation } from "../model/hooks/use-add-parish-translation"

interface AddParishFormProps {
  onCancelAction: () => void
}

export const AddParishForm = ({ onCancelAction }: AddParishFormProps) => {
  const currentLocale = useLocale() as AppLocale
  const t = useTranslations("add-parish.form")
  const { form, isSubmitting, onReset, onSubmit } = useAddParishForm(onCancelAction)
  const { isTranslating, translatingField, handleTranslateAction } = useAddParishTranslation(form)

  const isPending = isSubmitting || isTranslating

  return (
    <>
      <ModalBody>
        <Form {...form}>
          <form id="add-parish-form" onSubmit={onSubmit}>
            <div className="grid w-full pb-5 gap-5 md:gap-7 md:pb-7">
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

              <DeliveryDateField
                className="mt-2"
                isPending={isPending}
                locale={currentLocale}
              />
            </div>
          </form>
        </Form>
      </ModalBody>
      <ModalFooter>
        <CancelButton
          type="button"
          onCancelAction={onReset}
          disabled={isPending}
        >
          {t("buttons.reset")}
        </CancelButton>
        <SubmitButton
          form="add-parish-form"
          type="submit"
          variant="simply-accent"
          isLoading={isSubmitting}
          disabled={isPending}
        >
          {t("buttons.create")}
        </SubmitButton>
      </ModalFooter>
    </>
  )
}
