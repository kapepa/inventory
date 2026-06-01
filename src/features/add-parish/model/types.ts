import { z } from "zod"

export const parishFormSchema = z.object({
  deliveryDate: z.date(),
  translations: z.object({
    ru: z.object({ locale: z.literal('ru'), title: z.string().min(1), description: z.string() }),
    en: z.object({ locale: z.literal('en'), title: z.string().min(1), description: z.string() }),
  })
});

export type ParishFormValues = z.infer<typeof parishFormSchema>
