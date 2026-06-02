"use client"

import { useLocale, useTranslations } from "next-intl"
import { useMemo } from "react"
import {
  ModalActionButton,
  ModalBody,
  ModalCancelButton,
  ModalContents,
  ModalFooter,
  ModalHeader,
  Form,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  AppLocale,
  cn,
} from "@/shared"
import { useAddParishForm, useTranslationTabsValidation } from "../model"
import { TranslationFields } from "./translation-fields"
import { DeliveryDateField } from "./delivery-date-field"

interface AddParishFormProps {
  closeModalAction: () => void
}

export const AddParishForm = ({ closeModalAction }: AddParishFormProps) => {
  const currentLocale = useLocale() as AppLocale
  const t = useTranslations("parishe")
  const { form, handleTranslateAction, isPending, onSubmit } = useAddParishForm(closeModalAction)
  const { showRu, showEn } = useTranslationTabsValidation(form)

  return (
    <ModalContents>
      <ModalHeader title={t("form-created.title")} />
      <ModalBody>
        <Form {...form}>
          <form onSubmit={onSubmit} className="grid w-full gap-7 pb-7">
            <Tabs
              defaultValue={currentLocale}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger className={cn("cursor-pointer", showRu && "border-destructive text-destructive")} value="ru">
                  {t("form-created.russian")}
                </TabsTrigger>
                <TabsTrigger className={cn("cursor-pointer", showEn && "border-destructive text-destructive")} value="en">
                  {t("form-created.english")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ru">
                <TranslationFields locale="ru" isPending={isPending} handleTranslateAction={handleTranslateAction} />
              </TabsContent>

              <TabsContent value="en">
                <TranslationFields locale="en" isPending={isPending} handleTranslateAction={handleTranslateAction} />
              </TabsContent>
            </Tabs>

            <DeliveryDateField isPending={isPending} locale={currentLocale} />
          </form>
        </Form>
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onCancelAction={closeModalAction}>
          {t("form-created.buttons.cancel")}
        </ModalCancelButton>
        <ModalActionButton
          onConfirmAction={onSubmit}
          variant="simply-accent"
          disabled={isPending}
        >
          {t("form-created.buttons.create")}
        </ModalActionButton>
      </ModalFooter>
    </ModalContents>
  )
}
