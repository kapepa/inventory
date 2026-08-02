"use client";

import { CancelButton, Input, Skeleton, SubmitButton } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { VALIDATION_LIMITS } from "@/shared/constants";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useLoginForm } from "../model/hooks/use-login-form";
import { AppLocale } from "@/shared/lib/i18n/config";

interface LoginFormProps {
  locale: AppLocale;
}

export const LoginForm = ({ locale }: LoginFormProps) => {
  const t = useTranslations("auth.form")
  const { form, onSubmit, isSubmitting, onReset } = useLoginForm({ locale })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col gap-y-6 pb-3 px-6">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('labels.email')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('placeholders.email')}
                    {...field}
                    value={field.value ?? ''}
                    // We allow +1 character so that Zod can detect when the limit is exceeded and display an error
                    maxLength={VALIDATION_LIMITS.EMAIL_MAX_LENGTH + 1}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <div className="h-1 mt-0">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('labels.password')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('placeholders.password')}
                    {...field}
                    value={field.value ?? ''}
                    // We allow +1 character so that Zod can detect when the limit is exceeded and display an error
                    maxLength={VALIDATION_LIMITS.PASSWORD_MAX_LENGTH + 1}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <div className="h-1 mt-0">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="bg-accent px-6 py-3 flex justify-end gap-x-2">
          <CancelButton
            type="button"
            onClick={onReset}
            disabled={isSubmitting}
          >
            {t("buttons.reset")}
          </CancelButton>
          <SubmitButton
            type="submit"
            variant="simply-accent"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {t("buttons.sign-in")}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

LoginForm.displayName = "LoginForm"

export const LoginFormSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-8 pb-3 px-6">
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-24 h-4.5" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-24 h-4.5" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
      <div className="bg-accent px-6 pt-3.5 pb-3 flex justify-end gap-x-2">
        <Skeleton className="rounded-full h-10 w-28" />
        <Skeleton className="rounded-full h-10 w-28" />
      </div>
    </div>
  )
}

LoginFormSkeleton.displayName = "LoginFormSkeleton"