import { z } from "zod"

type TranslationFunction = (key: string) => string

export const createCategoryFormSchema = (t: TranslationFunction) => z.object({
  translations: z.object({
    ru: z.object({
      locale: z.literal('ru'),
      title: z.string().min(3, t("err-title-min")).max(100),
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z.string().min(3, t("err-title-min")).max(100),
    }),
  })
});

export type CategoryFormSchema = ReturnType<typeof createCategoryFormSchema>
export type TranslatableFieldName = 'title'
export type CategoryFormValues = z.infer<CategoryFormSchema>
export type CategoryhCreateServerValues = z.infer<typeof categoryCreateServerSchema>

export const categoryCreateServerSchema = z.object({
  translations: z.array(
    z.object({
      locale: z.string().length(2).max(100),
      title: z.string().min(3).max(100),
    })
  ).min(1)
})