import { useTranslations } from "next-intl";
import { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { loginFormSchema, LoginFormValues, } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../auth-store";
import { requestAuthLogin } from "../../api";
import { ERROR_CODES, ROUTES, useRouter, useUnmountCallback } from "@/shared";
import { useVerifiedEmail } from "./use-verified-email";

export const useLoginForm = () => {
  const router = useRouter()
  const tToast = useTranslations("auth.form.toast")
  const tErrors = useTranslations("auth.form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { setCallback } = useUnmountCallback()
  const { confirmVerifiedEmail } = useVerifiedEmail()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema(tErrors)),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "karma@gmail.com",
      password: "123456A!",
    },
  })

  const onReset = useCallback(() => {
    form.reset(undefined, { keepDefaultValues: true });
  }, [form]);

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      startSubmitTransition(async () => {
        try {
          const user = await requestAuthLogin({ data: values })
          useAuthStore.setState({ user })
          router.push(ROUTES.PARISHES)
          setCallback(() => {
            toast.success(tToast("auth-login-success"))
          })
        } catch (error) {
          if (error instanceof Error && error.message === ERROR_CODES.INVALID_CREDENTIALS_ERROR) {
            form.setError('email', {
              type: 'manual',
              message: tErrors('email-invalid-credentials')
            }, { shouldFocus: true });
            form.setError('password', {
              type: 'manual',
              message: tErrors('passwords-invalid-credentials')
            }, { shouldFocus: true });
            toast.error(tToast('auth-invalid-credentials'));
          } else if (error instanceof Error && error.message === ERROR_CODES.EMAIL_NOT_VERIFIED) {
            confirmVerifiedEmail(values.email)
            toast.error(tToast('auth-email-not-verified'));
          } else {
            console.error(error)
            toast.error(tToast("auth-login-error"))
          }
        }
      })
    },
    [tToast, form]
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