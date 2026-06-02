"use client"

import { useCallback, useMemo, useTransition } from "react"
import { FieldPath, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AppLocale, oppositeLocale, useThrottle, useTranslate } from "@/shared"
import { parishFormSchema, TranslatableFieldName, type ParishFormValues } from "./types"
import { createParish } from "@/entities"
import { toast } from "sonner"

export const useAddParishForm = (closeModalAction: () => void) => {
  const { translate, isLoading: isTranslating } = useTranslate()
  const [isPending, startTransition] = useTransition()

  const form = useForm<ParishFormValues>({
    resolver: zodResolver(parishFormSchema),
    mode: "onChange",
    defaultValues: {
      deliveryDate: new Date(),
      translations: {
        ru: { locale: "ru", title: "", description: "" },
        en: { locale: "en", title: "", description: "" },
      },
    },
  })

  const handleTranslateAction = useThrottle(
    async (fieldName: TranslatableFieldName, targetLocale: AppLocale) => {
      const otherLocale = oppositeLocale[targetLocale]
      const sourceValue = form.getValues(`translations.${otherLocale}.${fieldName}`)

      if (!sourceValue) return

      try {
        const translated = await translate(sourceValue, targetLocale)
        form.setValue(`translations.${targetLocale}.${fieldName}` as FieldPath<ParishFormValues>, translated, {
          shouldValidate: true,
          shouldDirty: true,
        })
      } catch (err) {
        console.error("Translation error:", err)
      }
    },
    2500
  )

  const onSubmit = useCallback(
    (values: ParishFormValues) => {
      startTransition(async () => {
        try {
          await createParish(values)
          toast("Приход успешно создан")
          closeModalAction()
        } catch (error) {
          console.error(error)
          toast("Ошибка при создании")
        }
      })
    },
    [startTransition]
  )

  const handleSubmit = useMemo(
    () => form.handleSubmit(onSubmit),
    [form, onSubmit]
  )

  return useMemo(
    () => ({
      form,
      isPending: isPending || isTranslating,
      handleTranslateAction,
      onSubmit: handleSubmit,
    }),
    [form, isPending, isTranslating, handleTranslateAction, handleSubmit]
  )
}
