"use client"

import { useTranslations } from "next-intl";
import { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "@/shared/ui/sonner";
import { changePasswordFormSchema, ChangePasswordFormValues } from "../schemas-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestChangePassword } from "../../api";
import { InvalidCredentialsError, InvalidInputError, NotFoundError } from "@/shared/lib/errors";

export const useChangePasswordForm = () => {
  const tToast = useTranslations("change-password.toast")
  const tErrors = useTranslations("change-password.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema(tErrors)),
    mode: "onBlur",
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
          const result = await requestChangePassword({
            data: {
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            }
          })

          if (result.warning) {
            toast.warning(tToast('password-changed-email-failed'));
          } else {
            toast.success(tToast('password-changed-success'));
          }

          onReset()
        } catch (error) {
          if (error instanceof InvalidCredentialsError) {
            form.setError('currentPassword', {
              type: 'manual',
              message: tErrors('current-password-incorrect')
            }, { shouldFocus: true });
            toast.error(tToast('current-password-incorrect'));
          } else if (error instanceof InvalidInputError) {
            form.setError('newPassword', {
              type: 'manual',
              message: tErrors('new-password-must-differ')
            }, { shouldFocus: true });
            toast.error(tToast('new-password-must-differ'));
          } else if (error instanceof NotFoundError) {
            toast.error(tToast('user-not-found'));
          }
          console.log(error)
        }
      })
    },
    [tToast, tErrors, form]
  )

  return {
    form,
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
    onReset,
  }
}