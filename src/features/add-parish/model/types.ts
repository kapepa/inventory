import { z } from "zod"

export const parishFormSchema = z.object({
  deliveryDate: z.date("err-date"),
  translations: z.object({
    ru: z.object({
      locale: z.literal('ru'),
      title: z.string().min(3, "err-title-min"),
      description: z.string().min(3, "err-description-min")
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z.string().min(3, "err-title-min"),
      description: z.string().min(3, "err-description-min")
    }),
  })
});

export type TranslatableFieldName = 'title' | 'description'
export type ParishFormValues = z.infer<typeof parishFormSchema>
