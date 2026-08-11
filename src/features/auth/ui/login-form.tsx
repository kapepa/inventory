"use client";

import { Input } from "@/shared/ui/input";
import { CancelButton, SubmitButton } from "@/shared/ui/action-buttons";
import { VALIDATION_LIMITS } from "@/shared/constants/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useLoginForm } from "../model/hooks/use-login-form";
import { AppLocale } from "@/shared/lib/i18n/config";
import { LoginFormLabels } from "../model/types/types";

interface LoginFormProps {
  locale: AppLocale;
  labels: LoginFormLabels
}

export const LoginForm = ({ locale, labels }: LoginFormProps) => {
  const { form, onSubmit, isSubmitting, onReset } = useLoginForm({ locale })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col gap-y-6 pb-3 px-6">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{labels.emailLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={labels.emailPlaceholder}
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
                <FormLabel>{labels.passwordLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={labels.passwordPlaceholder}
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
            {labels.resetButton}
          </CancelButton>
          <SubmitButton
            type="submit"
            variant="simply-accent"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {labels.signInButton}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

LoginForm.displayName = "LoginForm"