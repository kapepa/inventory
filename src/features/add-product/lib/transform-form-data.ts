import { ProductCreateDTO, ProductCreateFormData } from "../model"


export const transformFormToDTO = (formData: ProductCreateFormData): ProductCreateDTO => {
  const prices = []

  if (formData.priceUAH) {
    prices.push({ value: formData.priceUAH, symbol: 'UAH' })
  }

  if (formData.priceUSD) {
    prices.push({ value: formData.priceUSD, symbol: 'USD' })
  }

  return {
    serialNumber: formData.serialNumber,
    order: formData.order,
    status: formData.status,
    isNew: formData.isNew,
    photo: formData.photo || undefined,
    parishId: formData.parishId,
    translations: [
      {
        title: formData.title,
        specification: formData.specification || undefined,
        locale: formData.locale,
      }
    ],
    prices,
  }
}