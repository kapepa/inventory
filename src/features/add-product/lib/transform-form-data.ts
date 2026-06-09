import { ProductCreateDTO, ProductCreateFormValues } from "../model"


export const transformFormToDTO = (formData: ProductCreateFormValues): ProductCreateDTO => {
  const prices = []

  if (formData.priceUAH) {
    prices.push({ value: formData.priceUAH, symbol: 'UAH' as const })
  }

  if (formData.priceUSD) {
    prices.push({ value: formData.priceUSD, symbol: 'USD' as const })
  }

  return {
    serialNumber: formData.serialNumber,
    order: formData.order,
    status: formData.status,
    isNew: formData.isNew,
    photo: formData.photo instanceof File ? undefined : (formData.photo || undefined),
    parishId: formData.parishId,
    categoryId: formData.categoryId,
    translations: [
      formData.translations.ru,
      formData.translations.en,
    ],
    prices,
  }
}