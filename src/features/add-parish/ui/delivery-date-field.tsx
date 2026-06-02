"use client"

import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Popover,
  PopoverTrigger,
  Button,
  cn,
  PopoverContent,
  Calendar,
  dateFnsLocales,
  AppLocale,
} from "@/shared"
import { memo } from "react"

interface DeliveryDateFieldProps {
  isPending?: boolean,
  locale: AppLocale,
}

export const DeliveryDateField = memo(
  ({ isPending, locale }: DeliveryDateFieldProps) => {
    const t = useTranslations("parishe")
    const { control } = useFormContext()

    return (
      <FormField
        control={control}
        name="deliveryDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="mb-3">{t("form-created.fields.delivery-date")}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    disabled={isPending}
                  >
                    {field.value ? (
                      format(field.value, "PPP", { locale: dateFnsLocales[locale] })
                    ) : (
                      <span>{t("form-created.placeholders.delivery-date")}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  locale={dateFnsLocales[locale]}
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
)
