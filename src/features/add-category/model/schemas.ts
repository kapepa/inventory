import { VALIDATION_LIMITS } from "@/shared";
import { z } from "zod"

type TranslationFunction = (key: string) => string

export const createCategoryFormSchema = (t: TranslationFunction) => z.object({
  translations: z.object({
    ru: z.object({
      locale: z.literal('ru'),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_CATEGORY, t("err-title-min"))
        .max(VALIDATION_LIMITS.TITLE_MAX_CATEGORY, t("err-title-max"))
        .trim(),
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_CATEGORY, t("err-title-min"))
        .max(VALIDATION_LIMITS.TITLE_MAX_CATEGORY, t("err-title-max"))
        .trim(),
    }),
  })
});

export type CategoryFormSchema = ReturnType<typeof createCategoryFormSchema>
export type CategoryTranslatableFieldName = 'title'
export type CategoryFormValues = z.infer<CategoryFormSchema>
export type CategoryhCreateServerValues = z.infer<typeof categoryCreateServerSchema>

export const categoryCreateServerSchema = z.object({
  translations: z.array(
    z.object({
      locale: z
        .string()
        .length(VALIDATION_LIMITS.LOCALE_LENGTH)
        .trim(),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_CATEGORY)
        .max(VALIDATION_LIMITS.TITLE_MAX_CATEGORY)
        .trim(),
    })
  ).min(1)
})