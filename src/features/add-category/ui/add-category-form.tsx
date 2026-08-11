"use client"

import { useLocale, useTranslations } from "next-intl"
import { TranslationFields } from "./bricks/translation-fields"
import { TranslationTabsHeader } from "./bricks/translation-tabs-header"
import { ModalBody, ModalFooter } from "@/shared/ui/modal/modal-contents"
import { Form } from "@/shared/ui/form"
import { AppLocale } from "@/shared/lib/i18n/config"
import { useAddCategoryForm } from "../model/hooks/use-add-category-form"
import { useAddCategoryTranslation } from "../model/hooks/use-add-category-translation"
import { Tabs, TabsContent } from "@/shared/ui/tabs"
import { CancelButton, SubmitButton } from "@/shared/ui/action-buttons"

interface AddCategoryFormProps {
  onCancelAction: () => void
}

export const AddCategoryForm = ({ onCancelAction }: AddCategoryFormProps) => {
  const locale = useLocale() as AppLocale
  const t = useTranslations("add-category.form")
  const { form, isSubmitting, onReset, onSubmit } = useAddCategoryForm(onCancelAction)
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
        <CancelButton
          type="button"
          onCancelAction={onReset}
          disabled={isPending}
        >
          {t("buttons.reset")}
        </CancelButton>
        <SubmitButton
          form="add-сategory-form"
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

AddCategoryForm.displayName = "AddCategoryForm"