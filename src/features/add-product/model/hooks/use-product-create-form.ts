"use client"
import { useCallback, useMemo, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { STORAGE_KEYS } from "@/shared"
import { ProductCreateFormValues, productCreateFormSchema } from "../schemas"
import { ProductStatus } from "@prisma/client"
import { formatResponsiveImage, useUpload } from "@/entities"
import { useSyncFormWithStorage } from "./use-sync-form-with-storage"
import { requestСreateProduct } from "../../api"
import { ProductCreate } from "../types"

const ADD_PRODUCT_FORM_DATA = STORAGE_KEYS.ADD_PRODUCT_FORM_DATA

export const useProductCreateForm = (parishId: string, closeModalAction: () => void) => {
  const t = useTranslations("add-product.create-form")
  const tErrors = useTranslations("add-product.create-form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { upload } = useUpload()

  const form = useForm<ProductCreateFormValues>({
    resolver: zodResolver(productCreateFormSchema(tErrors)),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      parishId,
      translations: {
        ru: {
          locale: "ru",
          title: "",
          specification: "",
        },
        en: {
          locale: "en",
          title: "",
          specification: "",
        },
      },
      serialNumber: undefined,
      isNew: true,
      status: ProductStatus.FREE,
    },
  })

  useSyncFormWithStorage(form, parishId)

  const onSubmit = useCallback(
    (values: ProductCreateFormValues) => {
      startSubmitTransition(async () => {
        try {
          let photoUrl: string | undefined = undefined

          // Upload image if it's a File object
          if (values.photo instanceof File) {
            const uploadData = await upload(values.photo)
            photoUrl = formatResponsiveImage(uploadData)
          } else if (typeof values.photo === 'string') {
            photoUrl = values.photo
          }

          // Transform form data to DTO
          const productData: ProductCreate = {
            userId: "", //You must set your user ID after registering
            serialNumber: values.serialNumber,
            order: values.order,
            status: values.status,
            isNew: values.isNew,
            photo: photoUrl ?? null,
            parishId: values.parishId,
            categoryId: values.categoryId,
            translations: [
              values.translations.ru,
              values.translations.en,
            ],
            prices: [
              ...(values.priceUAH ? [{ value: values.priceUAH, symbol: 'UAH' as const }] : []),
              ...(values.priceUSD ? [{ value: values.priceUSD, symbol: 'USD' as const }] : []),
            ],
          }

          await requestСreateProduct({ data: productData })

          toast.success(t("toast.create-product-success"))
          form.reset()
          closeModalAction()

          setTimeout(() => {
            sessionStorage.removeItem(ADD_PRODUCT_FORM_DATA)
          }, 100)
        } catch (error) {
          console.error(error)
          toast.error(t("toast.create-product-error"))
        }
      })
    },
    [upload, closeModalAction, t, form]
  )

  const handleSubmit = useMemo(() => form.handleSubmit(onSubmit), [form, onSubmit])

  return useMemo(
    () => ({
      form,
      isSubmitting,
      onSubmit: handleSubmit,
    }),
    [form, isSubmitting, handleSubmit]
  )
}
