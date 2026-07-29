import { z } from 'zod'
import { ProductStatus } from '@prisma/client'
import { VALIDATION_LIMITS } from '@/shared'

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