import { useTranslations } from "next-intl";
import { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { registerFormSchema, RegisterFormValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestAuthRegister } from "../../api";
import { ERROR_CODES, useUnmountCallback } from "@/shared";

export const useRegisterForm = () => {
  const tToast = useTranslations("auth.form.toast")
  const tErrors = useTranslations("auth.form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { setCallback } = useUnmountCallback()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema(tErrors)),
    defaultValues: {
      name: "Karma",
      email: "karma@gmail.com",
      password: "123456A!",
      confirmPassword: "123456A!",
    },
  })

  const onReset = useCallback(() => {
    form.reset(undefined, { keepDefaultValues: true });
  }, [form]);

  const onSubmit = useCallback(
    (values: RegisterFormValues) => {
      startSubmitTransition(async () => {
        try {
          await requestAuthRegister({ data: values })

          setCallback(() => {
            toast.success(tToast("auth-register-success"))
            onReset()
          })
        } catch (error) {
          if (error instanceof Error && error.message === ERROR_CODES.USER_ALREADY_EXISTS_ERROR) {
            form.setError('email', {
              type: 'manual',
              message: tErrors('email-already-exists')
            }, { shouldFocus: true });
            toast.error(tToast('auth-user-already_exists'));
          } else {
            console.error(error)
            toast.error(tToast("auth-register-error"))
          }
        }
      })
    },
    [tToast, form, onReset]
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