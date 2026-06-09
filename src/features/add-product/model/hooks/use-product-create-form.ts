"use client"
import { useCallback, useMemo, useTransition, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { STORAGE_KEYS } from "@/shared"
import { ProductCreateFormValues, createProductCreateSchema } from "../schemas"
import { ProductStatus } from "@prisma/client"

const ADD_PRODUCT_FORM_DATA = STORAGE_KEYS.ADD_PRODUCT_FORM_DATA

export const useProductCreateForm = (parishId: string, closeModalAction: () => void) => {
  const t = useTranslations("add-product.create-form")
  const tErrors = useTranslations("add-product.create-form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()

  const productCreateSchema = useMemo(
    () => createProductCreateSchema(tErrors),
    [tErrors]
  )

  const form = useForm<ProductCreateFormValues>({
    resolver: zodResolver(productCreateSchema),
    mode: "onChange",
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

  // Restore data from sessionStorage on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem(ADD_PRODUCT_FORM_DATA);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset({
          ...parsedData,
          parishId, // Always use the current parishId
        });
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parishId]);

  // Save data to sessionStorage on change
  useEffect(() => {
    const subscription = form.watch((values) => {
      sessionStorage.setItem(ADD_PRODUCT_FORM_DATA, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = useCallback(
    (values: ProductCreateFormValues) => {
      startSubmitTransition(async () => {
        try {
          // TODO: Implement createProduct API call
          console.log(values)

          sessionStorage.removeItem(ADD_PRODUCT_FORM_DATA);

          toast(t("toast.create-product-success"))
          closeModalAction()
        } catch (error) {
          console.error(error)
          toast(t("toast.create-product-error"))
        }
      })
    },
    [startSubmitTransition, closeModalAction, t]
  )

  const handleSubmit = useMemo(
    () => form.handleSubmit(onSubmit),
    [form, onSubmit]
  )

  return useMemo(
    () => ({
      form,
      isSubmitting,
      onSubmit: handleSubmit,
    }),
    [form, isSubmitting, handleSubmit]
  )
}
