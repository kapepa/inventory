"use client";

import { Input } from "@/shared/ui/input";
import { CancelButton, SubmitButton } from "@/shared/ui/action-buttons";
import { VALIDATION_LIMITS } from "@/shared/constants/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useRegisterForm } from "../model/hooks/use-register-form";
import { RegisterFormLabels } from "../model/types/types";

interface RegisterFormProps {
  labels: RegisterFormLabels
}

export const RegisterForm = ({ labels }: RegisterFormProps) => {
  const { form, onSubmit, isSubmitting, onReset } = useRegisterForm()

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col gap-y-6 pb-3 px-6">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{labels.nameLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={labels.namePlaceholder}
                    {...field}
                    value={field.value ?? ''}
                    // We allow +1 character so that Zod can detect when the limit is exceeded and display an error
                    maxLength={VALIDATION_LIMITS.NAME_MAX_LENGTH + 1}
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

          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{labels.confirmPasswordLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={labels.confirmPasswordPlaceholder}
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
            {labels.signUpButton}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

RegisterForm.displayName = "RegisterForm"