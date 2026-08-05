"use client"
import { useCallback, useMemo, useTransition, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useLocale, useTranslations } from "next-intl"
import { requestCreateParish } from "../../api"
import { createParishFormSchema, ParishFormValues } from "../schemas-client"
import { useParishesStore } from "@/entities/parish/model/parish-store"
import { STORAGE_KEYS } from "@/shared/constants/storage-keys"
import { AlreadyExistsError } from "@/shared/lib/errors"
import { AppLocale } from "@/shared/lib/i18n/config"
import { useDebounce } from "@/shared/lib/hooks/use-debounce"

const ADD_PARISH_FORM_DATA = STORAGE_KEYS.ADD_PARISH_FORM_DATA

export const useAddParishForm = (closeModalAction: () => void) => {
  const locale = useLocale() as AppLocale
  const t = useTranslations("add-parish.form.toast")
  const tErrors = useTranslations("add-parish.form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const addNewParish = useParishesStore((state) => state.addNewParish)
  const [formValues, setFormValues] = useState<ParishFormValues | null>(null);
  const debouncedFormValues = useDebounce(formValues, 500);

  const form = useForm<ParishFormValues>({
    resolver: zodResolver(createParishFormSchema(tErrors)),
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
        const { deliveryDate, ...props } = JSON.parse(savedData);
        form.reset({
          ...props,
          deliveryDate: new Date(deliveryDate),
        }, { keepDefaultValues: true });
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, [form]);

  // Watch form changes and update state
  useEffect(() => {
    const subscription = form.watch((values) => {
      setFormValues(values as ParishFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Save debounced values to sessionStorage
  useEffect(() => {
    if (debouncedFormValues) {
      sessionStorage.setItem(ADD_PARISH_FORM_DATA, JSON.stringify(debouncedFormValues));
    }
  }, [debouncedFormValues]);

  const onReset = useCallback(() => {
    form.reset(undefined, { keepDefaultValues: true });
    sessionStorage.removeItem(ADD_PARISH_FORM_DATA);
  }, [form]);

  const onSubmit = useCallback(
    (values: ParishFormValues) => {
      startSubmitTransition(async () => {
        try {
          const newParish = await requestCreateParish({ data: values })
          const formattedParish = {
            ...newParish,
            translations: newParish.translations.filter((t) => t.locale === locale)
          }
          addNewParish(formattedParish)
          onReset()

          toast(t("create-parish-success"))
          closeModalAction()
        } catch (error) {
          if (error instanceof AlreadyExistsError) {
            form.setError('translations.ru.title', {
              type: 'manual',
              message: tErrors('err-parish-already-exists')
            }, { shouldFocus: true });
            form.setError('translations.en.title', {
              type: 'manual',
              message: tErrors('err-parish-already-exists')
            }, { shouldFocus: true });
            toast(t('parish-already-exists'));
          } else {
            console.error(error)
            toast(t("create-parish-error"))
          }
        }
      })
    },
    [startSubmitTransition, closeModalAction, t, addNewParish, locale]
  )

  const handleSubmit = useMemo(
    () => form.handleSubmit(onSubmit),
    [form, onSubmit]
  )

  return useMemo(
    () => ({
      form,
      isSubmitting,
      onReset,
      onSubmit: handleSubmit,
    }),
    [form, onReset, isSubmitting, handleSubmit]
  )
}
