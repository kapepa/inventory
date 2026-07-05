import { useTranslations } from "next-intl";
import { useCallback, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { loginFormSchema, LoginFormValues, } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../auth-store";
import { requestAuthLogin } from "../../api";
import { ROUTES, useRouter } from "@/shared";

export const useLoginForm = () => {
  const tToast = useTranslations("auth.form.toast")
  const tErrors = useTranslations("auth.form.errors")
  const [isSubmitting, startSubmitTransition] = useTransition()
  const router = useRouter()
  const { setUser } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema(tErrors)),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "karma@gmail.com",
      password: "123456A!",
    },
  })

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      startSubmitTransition(async () => {
        try {
          const { } = await requestAuthLogin({ data: values })

          toast.success(tToast("auth-login-success"))
          form.reset()
          router.push(ROUTES.PARISHES)
        } catch (error) {
          console.error(error)
          toast.error(tToast("auth-login-error"))
        }
      })
    },
    [tToast, form]
  )

  const onReset = useCallback(() => {
    form.reset(undefined, { keepDefaultValues: true });
  }, [form]);

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