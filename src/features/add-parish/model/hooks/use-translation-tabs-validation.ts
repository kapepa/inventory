import { useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ParishFormValues, TranslatableFieldName } from '../types/types'
import { AppLocale } from '@/shared'

interface LocaleValidation {
  hasErrors: boolean
  hasEmpty: boolean
  show: boolean
}

interface UseTranslationTabsValidationReturn {
  ru: LocaleValidation
  en: LocaleValidation
  hasAnyErrors: boolean
  showRu: boolean
  showEn: boolean
}

export const useTranslationTabsValidation = (
  form: UseFormReturn<ParishFormValues>
): UseTranslationTabsValidationReturn => {
  // Subscribe only to `errors` and `submitCount`, NOT to field values
  const { errors, submitCount } = form.formState

  return useMemo(() => {
    const requiredFields: TranslatableFieldName[] = ['title', 'description']

    const validateLocale = (locale: AppLocale): LocaleValidation => {
      const localeErrors = errors.translations?.[locale]

      // Read current values directly using getValues (without subscribing)
      const localeData = form.getValues(`translations.${locale}`)

      const hasErrors = requiredFields.some(field => !!localeErrors?.[field])
      const hasEmpty = requiredFields.some(field => !localeData?.[field]?.trim())

      const show = hasErrors || (submitCount > 0 && hasEmpty)

      return {
        hasErrors,
        hasEmpty,
        show
      }
    }

    const ru = validateLocale('ru')
    const en = validateLocale('en')

    return {
      ru,
      en,
      hasAnyErrors: ru.show || en.show,
      showRu: ru.show,
      showEn: en.show,
    }
  }, [errors, submitCount, form])
}