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
import { TranslationFields } from "./translation-fields"
import { TranslationTabsHeader } from "./translation-tabs-header"
import { useAddCategoryForm, useAddCategoryTranslation } from "../model"

interface AddCategoryFormProps {
  onCancelAction: () => void
}

export const AddCategoryForm = ({ onCancelAction }: AddCategoryFormProps) => {
  const locale = useLocale() as AppLocale
  const t = useTranslations("add-category.form")
  const { form, isSubmitting, onSubmit } = useAddCategoryForm(onCancelAction)
  const { isTranslating, translatingField, handleTranslateAction } = useAddCategoryTranslation(form)

  const isPending = isSubmitting || isTranslating

  return (
    <>
      <ModalBody>
        <Form {...form}>
          <form id="add-сategory-form" onSubmit={onSubmit}>
            <div className="grid w-full pb-5 gap-5 md:gap-7 md:pb-7">
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
          form="add-сategory-form"
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
