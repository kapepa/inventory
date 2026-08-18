import { VALIDATION_LIMITS } from "@/shared/constants/validation";
import { TranslationFunction } from "@/shared/types/translation";
import { z } from "zod"

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