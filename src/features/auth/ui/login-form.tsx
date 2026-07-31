"use client";

import { CancelButton, Input, SubmitButton } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { VALIDATION_LIMITS } from "@/shared/constants";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useLoginForm } from "../model/hooks/use-login-form";

export const LoginForm = () => {
  const t = useTranslations("auth.form")
  const { form, onSubmit, isSubmitting, onReset } = useLoginForm()

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