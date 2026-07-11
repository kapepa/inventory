import { z } from 'zod'
import { ProductStatus } from '@prisma/client'
import { VALIDATION_LIMITS } from '@/shared'

type TranslationFunction = (key: string) => string

export const productCreateFormSchema = (t: TranslationFunction) => z.object({
  serialNumber: z.string({ error: t('err-serial-required') })
    .min(VALIDATION_LIMITS.SERIAL_NUM_MIN_PRODUCT, t("err-serial-min"))
    .max(VALIDATION_LIMITS.SERIAL_NUM_MAX_PRODUCT, t("err-serial-max"))
    .trim(),

  translations: z.object({
    ru: z.object({
      locale: z.literal('ru'),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_PRODUCT, t('err-title-min'))
        .max(VALIDATION_LIMITS.TITLE_MAX_PRODUCT, t('err-title-max'))
        .trim(),
      specification: z
        .string()
        .min(VALIDATION_LIMITS.SPECIFICATION_MIN_PRODUCT, t('err-specification-min'))
        .max(VALIDATION_LIMITS.SPECIFICATION_MAX_PRODUCT, t('err-specification-max'))
        .trim(),
    }),
    en: z.object({
      locale: z.literal('en'),
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_PRODUCT, t('err-title-min'))
        .max(VALIDATION_LIMITS.TITLE_MAX_PRODUCT, t('err-title-max'))
        .trim(),
      specification: z
        .string()
        .min(VALIDATION_LIMITS.SPECIFICATION_MIN_PRODUCT, t('err-specification-min'))
        .max(VALIDATION_LIMITS.SPECIFICATION_MAX_PRODUCT, t('err-specification-max'))
        .trim(),
    }),
  }),

  isNew: z.boolean(),

  status: z.nativeEnum(ProductStatus),

  order: z
    .number({ message: t("err-order-required") })
    .int(t('err-order-integer'))
    .positive(t('err-order-positive'))
    .max(VALIDATION_LIMITS.ORDER_MAX_PRODUCT, t('err-order-max')),

  photo: z.union([
    z.instanceof(File, { message: t('err-image-upload') }),
    z.string().min(1, t('err-image-upload'))
  ], { message: t('err-image-upload') }),

  categoryId: z
    .string({ error: t('err-category-invalid') })
    .min(1, t('err-category-invalid'))
    .max(VALIDATION_LIMITS.ID_MAX_LENGTH)
    .trim(),

  parishId: z
    .string()
    .min(1, t("err-parish-invalid"))
    .max(VALIDATION_LIMITS.ID_MAX_LENGTH)
    .trim(),

  userId: z
    .string()
    .max(VALIDATION_LIMITS.ID_MAX_LENGTH)
    .optional(),

  priceUAH: z.
    number({ error: t("err-price-required") })
    .nonnegative(t('err-price-nonnegative'))
    .positive(t('err-price-positive'))
    .max(VALIDATION_LIMITS.PRICE_MAX_VALUE, t('err-price-max')),

  priceUSD: z.
    number({ error: t("err-price-required") })
    .nonnegative(t('err-price-nonnegative'))
    .positive(t('err-price-positive'))
    .max(VALIDATION_LIMITS.PRICE_MAX_VALUE, t('err-price-max')),
})

export type ProductCreateSchema = ReturnType<typeof productCreateFormSchema>
export type ProductCreateFormValues = z.infer<ProductCreateSchema>
export type TranslatableProductFieldName = 'title' | 'specification'

export const productCreateServerSchema = z.object({
  serialNumber: z
    .string()
    .min(VALIDATION_LIMITS.SERIAL_NUM_MIN_PRODUCT)
    .max(VALIDATION_LIMITS.SERIAL_NUM_MAX_PRODUCT)
    .trim(),
  order: z
    .number()
    .int()
    .positive()
    .max(VALIDATION_LIMITS.ORDER_MAX_PRODUCT),
  status: z
    .nativeEnum(ProductStatus),
  isNew: z
    .boolean(),
  // On server, photo is already a string (URL) or null if not uploaded
  photo: z
    .string()
    .nullable(),
  parishId: z
    .string()
    .min(1)
    .max(VALIDATION_LIMITS.ID_MAX_LENGTH),
  categoryId: z.
    string()
    .min(1)
    .max(VALIDATION_LIMITS.ID_MAX_LENGTH),
  // UserId is required for creating a record in DB
  userId: z
    .string()
    .min(1)
    .max(VALIDATION_LIMITS.ID_MAX_LENGTH),

  // Translations array validation
  translations: z.array(
    z.object({
      locale: z.string().length(VALIDATION_LIMITS.LOCALE_LENGTH), // 'ru' or 'en'
      title: z
        .string()
        .min(VALIDATION_LIMITS.TITLE_MIN_PRODUCT)
        .max(VALIDATION_LIMITS.TITLE_MAX_PRODUCT)
        .trim(),
      specification: z
        .string()
        .min(VALIDATION_LIMITS.SPECIFICATION_MIN_PRODUCT)
        .max(VALIDATION_LIMITS.SPECIFICATION_MAX_PRODUCT)
        .trim(),
    })
  ).min(1), // At least one translation required

  // Prices array validation
  prices: z.array(
    z.object({
      value: z.number().nonnegative().max(VALIDATION_LIMITS.PRICE_MAX_VALUE),
      symbol: z.enum(['UAH', 'USD']),
    })
  ),
})

// Type inferred from server schema
export type ProductCreateServerValues = z.infer<typeof productCreateServerSchema>