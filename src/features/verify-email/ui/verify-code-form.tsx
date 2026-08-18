"use client"

import { memo } from "react"
import { VALIDATION_LIMITS } from "@/shared/constants/validation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { useCodeForm } from "../model/hooks/use-code-form"
import { Input } from "@/shared/ui/input"
import { CancelButton, SubmitButton } from "@/shared/ui/action-buttons"
import { VerifyCodeFormLabels } from "../model/types/types"

interface VerifyCodeFormProps {
  token: string,
  email: string,
  labels: VerifyCodeFormLabels
}

export const VerifyCodeForm = memo(({ email, token, labels }: VerifyCodeFormProps) => {
  const { form, onReset, onSubmit, isSubmitting } = useCodeForm({ email, token });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="px-6">
          <FormField
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>{labels.codeLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={labels.codePlaceholder}
                    {...field}
                    value={field.value ?? ''}
                    // We allow +1 character so that Zod can detect when the limit is exceeded and display an error
                    maxLength={VALIDATION_LIMITS.CODE_LENGTH}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      field.onChange(value);
                    }}
                    className="w-32 text-center text-2xl tracking-[0.5em]"
                  />
                </FormControl>
                <div className="h-1 mt-0">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="px-6 py-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CancelButton
            type="button"
            variant="accent-ghost"
            onClick={onReset}
            disabled={isSubmitting}
          >
            {labels.resetButton}
          </CancelButton>
          <SubmitButton
            type="submit"
            variant="striking-accent"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {labels.sendButton}
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
})

VerifyCodeForm.displayName = "VerifyCodeForm"