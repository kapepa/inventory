import { z } from 'zod'
import { ProductStatus } from '@prisma/client'

type TranslationFunction = (key: string) => string

export const productCreateFormSchema = (t: TranslationFunction) => z.object({
  serialNumber: z.string({
    error: t('serial-number-required'),
  })
    .min(3, t("serial-number-min")).max(50),

  translations: z.object({
    ru: z.object({
      locale: z.literal('ru'),
      title: z.string().min(2, t('title-required')).max(100),
      specification: z.string().min(2, t('specification-required')).max(400),
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z.string().min(1, t('title-required')).max(100),
      specification: z.string().min(1, t('specification-required')).max(400),
    }),
  }),

  isNew: z.boolean(),

  status: z.nativeEnum(ProductStatus),

  order: z.number({ message: t("order-must-required") })
    .int(t('order-must-integer'))
    .positive(t('order-must-positive'))
    .max(999999999),

  photo: z.union([
    z.instanceof(File, { message: t('upload-image') }),
    z.string().min(1, t('upload-image'))
  ], { message: t('upload-image') }),

  categoryId: z.string({ error: t('invalid-category') }).min(1, t('invalid-category')),

  parishId: z.string().min(1, 'Parish is required'),

  userId: z.string().optional(),

  priceUAH: z.number({ error: t("price-must-number") })
    .nonnegative(t('price-must-positive'))
    .positive(t('price-must-positive'))
    .max(999999999)
    .optional(),

  priceUSD: z.number({ error: t("price-must-number") })
    .nonnegative(t('price-must-positive'))
    .positive(t('price-must-positive'))
    .max(999999999)
    .optional(),
})

export type ProductCreateSchema = ReturnType<typeof productCreateFormSchema>
export type ProductCreateFormValues = z.infer<ProductCreateSchema>
export type TranslatableProductFieldName = 'title' | 'specification'

export const productCreateServerSchema = z.object({
  serialNumber: z.string().min(3).max(50),
  order: z.number().int().positive().max(999999999),
  status: z.nativeEnum(ProductStatus),
  isNew: z.boolean(),
  // On server, photo is already a string (URL) or null if not uploaded
  photo: z.string().nullable(),
  parishId: z.string().min(1).max(200),
  categoryId: z.string().min(1).max(200),
  // UserId is required for creating a record in DB
  userId: z.string().min(1).max(200),

  // Translations array validation
  translations: z.array(
    z.object({
      locale: z.string().length(2).max(200), // 'ru' or 'en'
      title: z.string().min(1).max(100),
      specification: z.string().min(1).max(400),
    })
  ).min(1), // At least one translation required

  // Prices array validation
  prices: z.array(
    z.object({
      value: z.number().nonnegative().max(999999999),
      symbol: z.enum(['UAH', 'USD']),
    })
  ),
})

// Type inferred from server schema
export type ProductCreateServerValues = z.infer<typeof productCreateServerSchema>