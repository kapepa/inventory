import { useTranslations } from "next-intl";
import { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { registerFormSchema, RegisterFormValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../auth-store";
import { requestAuthRegister } from "../../api";

export const useRegisterForm = () => {
  const tToast = useTranslations("auth.form.toast")
  const tErrors = useTranslations("auth.form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const { setUser } = useAuthStore();

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
          const { } = await requestAuthRegister({ data: values })

          toast.success(tToast("auth-register-success"))
          onReset()
        } catch (error) {
          console.error(error)
          toast.error(tToast("auth-register--error"))
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