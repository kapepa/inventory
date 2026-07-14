"use client"

import { useTranslations } from "next-intl";
import { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { changePasswordFormSchema, ChangePasswordFormValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestChangePassword } from "../../api";
import { ERROR_CODES } from "@/shared";

export const useChangePasswordForm = () => {
  const tToast = useTranslations("change-password.toast")
  const tErrors = useTranslations("change-password.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema(tErrors)),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onReset = useCallback(() => {
    form.reset(undefined, { keepDefaultValues: true });
  }, [form]);

  const onSubmit = useCallback(
    (values: ChangePasswordFormValues) => {
      startSubmitTransition(async () => {
        try {
          await requestChangePassword({
            data: {
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            }
          })

          form.reset()
          toast.success(tToast("password-changed-success"))
        } catch (error) {
          if (error instanceof Error && error.message === ERROR_CODES.INVALID_CURRENT_PASSWORD) {
            form.setError('currentPassword', {
              type: 'manual',
              message: tErrors('current-password-incorrect')
            }, { shouldFocus: true });
            toast.error(tToast('current-password-incorrect'));
          } else {
            console.error(error)
            toast.error(tToast("password-change-error"))
          }
        }
      })
    },
    [tToast, tErrors, form]
  )

  const handleSubmit = useMemo(() => form.handleSubmit(onSubmit), [form, onSubmit])

  return useMemo(
    () => ({
      form,
      isSubmitting,
      onSubmit: handleSubmit,
      onReset,
    }),
    [form, isSubmitting, handleSubmit, onReset]
  )
}