"use client"

import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { memo } from "react"
import { CalendarDynamic } from "@/shared/ui-dynamic/calendar-dynamic"
import { dateFnsLocales } from "@/shared/lib/i18n/date-fns-locales"
import { cn } from "@/shared/lib"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"
import { Button, InputSkeleton, Skeleton } from "@/shared/ui"
import { AppLocale } from "@/shared/lib/i18n/config"

interface DeliveryDateFieldProps {
  isPending?: boolean,
  locale: AppLocale,
  className?: string
}

export const DeliveryDateField = memo(
  ({ isPending, locale, className }: DeliveryDateFieldProps) => {
    const t = useTranslations("add-parish.form")
    const { control } = useFormContext()

    return (
      <FormField
        control={control}
        name="deliveryDate"
        render={({ field }) => (
          <FormItem className={cn("flex flex-col", className)}>
            <FormLabel className="mb-3">{t("fields.delivery-date")}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal h-8 md:h-10",
                      !field.value && "text-muted-foreground"
                    )}
                    disabled={isPending}
                  >
                    {field.value ? (
                      format(field.value, "PPP", { locale: dateFnsLocales[locale] })
                    ) : (
                      <span>{t("placeholders.delivery-date")}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto mb-1" align="start">
                <CalendarDynamic
                  mode="single"
                  locale={dateFnsLocales[locale]}
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
            <div className="h-1 mt-0">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    )
  }
)

DeliveryDateField.displayName = "DeliveryDateField"

export const DeliveryDateFieldSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      <Skeleton className="w-24 h-4.5" />
      <InputSkeleton />
    </div >
  )
}

DeliveryDateFieldSkeleton.displayName = "DeliveryDateFieldSkeleton"
