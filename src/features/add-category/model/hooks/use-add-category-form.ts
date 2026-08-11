"use client"

import { useCallback, useTransition, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useLocale, useTranslations } from "next-intl"
import { requestCreateCategory } from "../../api"
import { createCategoryFormSchema, CategoryFormValues } from "../schemas-client"
import { STORAGE_KEYS } from "@/shared/constants/storage-keys"
import { AlreadyExistsError } from "@/shared/lib/errors"
import { AppLocale } from "@/shared/lib/i18n/config"
import { useCategoriesStore } from "@/entities/category/model/categories-store"

const ADD_CATEGORY_FORM_DATA = STORAGE_KEYS.ADD_CATEGORY_FORM_DATA

export const useAddCategoryForm = (closeModalAction: () => void) => {
  const locale = useLocale() as AppLocale
  const t = useTranslations("add-category.form.toast")
  const tErrors = useTranslations("add-category.form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { addNewCategory } = useCategoriesStore()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(createCategoryFormSchema(tErrors)),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      translations: {
        ru: { locale: "ru", title: "", },
        en: { locale: "en", title: "", },
      },
    },
  })

  // Restore from sessionStorage
  useEffect(() => {
    const savedData = sessionStorage.getItem(ADD_CATEGORY_FORM_DATA);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        form.reset(parsed, { keepDefaultValues: true });
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, []);

  // Save to sessionStorage
  useEffect(() => {
    const subscription = form.watch((values) => {
      sessionStorage.setItem(ADD_CATEGORY_FORM_DATA, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onReset = useCallback(() => {
    form.reset(undefined, { keepDefaultValues: true });
    sessionStorage.removeItem(ADD_CATEGORY_FORM_DATA);
  }, [form]);

  const onSubmit = useCallback(
    (values: CategoryFormValues) => {
      startSubmitTransition(async () => {
        try {
          const newCategory = await requestCreateCategory({ data: values })
          const formattedCategory = {
            ...newCategory,
            translations: newCategory.translations.filter((t) => t.locale === locale)
          }
          addNewCategory(formattedCategory)
          onReset()
          toast(t("create-category-success"))
          closeModalAction()
        } catch (error) {
          if (error instanceof AlreadyExistsError) {
            form.setError('translations.ru.title', {
              type: 'manual',
              message: tErrors('err-category-already-exists')
            }, { shouldFocus: true });
            toast(t('category-already-exists'));
          } else {
            toast(t("create-category-error"))
          }
        }
      })
    },
    [startSubmitTransition, closeModalAction, t, addNewCategory, form, tErrors, locale]
  )

  return {
    form,
    isSubmitting,
    onReset,
    onSubmit: form.handleSubmit(onSubmit),
  }
}