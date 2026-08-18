import { VALIDATION_LIMITS } from "@/shared/constants/validation";
import { TranslationFunction } from "@/shared/types/translation";
import { z } from "zod"

export const createParishFormSchema = (t: TranslationFunction) => z.object({
  deliveryDate: z.date({
    message: t("delivery-date-required"),
  }),
  translations: z.object({
    ru: z.object({
      locale: z
        .literal('ru'),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_PARISH, t("err-title-min"))
        .max(VALIDATION_LIMITS.TITLE_MAX_PARISH, t("err-title-max"))
        .trim(),
      description: z
        .string()
        .min(VALIDATION_LIMITS.DESC_MIN_PARISH, t("err-description-min"))
        .max(VALIDATION_LIMITS.DESC_MAX_PARISH, t("err-description-max"))
        .trim(),
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z.string().min(3, t("err-title-min")).max(100),
      description: z.string().min(3, t("err-description-min")).max(400)
    }),
  })
});

export type ParishFormSchema = ReturnType<typeof createParishFormSchema>
export type TranslatableFieldName = 'title' | 'description'
export type ParishFormValues = z.infer<ParishFormSchema>