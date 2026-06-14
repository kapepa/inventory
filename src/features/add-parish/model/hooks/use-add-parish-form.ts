"use client"
import { useCallback, useMemo, useTransition, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useLocale, useTranslations } from "next-intl"
import { useParishesStore } from "@/entities/parish/model/parish-store"
import { AppLocale, STORAGE_KEYS } from "@/shared"
import { requestCreateParish } from "../../api"
import { createParishFormSchema, ParishFormValues } from "../schemas"

const ADD_PARISH_FORM_DATA = STORAGE_KEYS.ADD_PARISH_FORM_DATA

export const useAddParishForm = (closeModalAction: () => void) => {
  const t = useTranslations("add-parish.form.errors")
  const tToast = useTranslations("add-parish.form.toast")
  const locale = useLocale() as AppLocale
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { addParish } = useParishesStore()

  const form = useForm<ParishFormValues>({
    resolver: zodResolver(createParishFormSchema(t)),
    mode: "onChange",
    defaultValues: {
      deliveryDate: new Date(),
      translations: {
        ru: { locale: "ru", title: "", description: "" },
        en: { locale: "en", title: "", description: "" },
      },
    },
  })

  // Restore data from sessionStorage on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem(ADD_PARISH_FORM_DATA);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset({
          ...form.getValues(),
          ...parsedData,
        });
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, [form]);

  // Save data to sessionStorage on change
  useEffect(() => {
    const subscription = form.watch((values) => {
      sessionStorage.setItem(ADD_PARISH_FORM_DATA, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = useCallback(
    (values: ParishFormValues) => {
      startSubmitTransition(async () => {
        try {
          const newParish = await requestCreateParish({ data: values })
          const formattedParish = {
            ...newParish,
            translations: newParish.translations.filter((t: any) => t.locale === locale)
          }

          addParish(formattedParish)
          sessionStorage.removeItem(ADD_PARISH_FORM_DATA);

          toast(tToast("create-parish-success"))
          closeModalAction()
        } catch (error) {
          console.error(error)
          toast(tToast("create-parish-error"))
        }
      })
    },
    [startSubmitTransition, closeModalAction, t, addParish, locale]
  )

  const handleSubmit = useMemo(
    () => form.handleSubmit(onSubmit),
    [form, onSubmit]
  )

  return useMemo(
    () => ({
      form,
      isSubmitting,
      onSubmit: handleSubmit,
    }),
    [form, isSubmitting, handleSubmit]
  )
}
