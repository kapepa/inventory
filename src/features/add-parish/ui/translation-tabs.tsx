import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui"
import { TranslationFields } from "./translation-fields"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { memo } from "react"
import { cn } from "@/shared/lib"
import { AppLocale } from "@/shared/lib/i18n/config"
import { ParishFormValues, TranslatableFieldName } from "../model/schemas-client"
import { useTranslationTabsValidation } from "../model/hooks/use-translation-tabs-validation"

interface TranslationTabsProps {
  locale: AppLocale,
  isPending: boolean,
  handleTranslateAction: (fieldName: TranslatableFieldName, locale: AppLocale) => void,
  translatingField: { name: TranslatableFieldName, locale: AppLocale } | null
}

export const TranslationTabs = memo(({
  locale,
  isPending,
  handleTranslateAction,
  translatingField
}: TranslationTabsProps) => {
  const t = useTranslations("parishe")
  const form = useFormContext<ParishFormValues>()
  const { showRu, showEn } = useTranslationTabsValidation(form)

  return (
    <Tabs
      defaultValue={locale}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger className={cn("cursor-pointer", showRu && "border-destructive text-destructive")} value="ru">
          {t("form-created.russian")}
        </TabsTrigger>
        <TabsTrigger className={cn("cursor-pointer", showEn && "border-destructive text-destructive")} value="en">
          {t("form-created.english")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ru">
        <TranslationFields
          locale="ru"
          isPending={isPending}
          handleTranslateAction={handleTranslateAction}
          autoFocus={locale === "ru"}
          translatingFieldName={translatingField?.locale === "ru" ? translatingField.name : null}
        />
      </TabsContent>

      <TabsContent value="en">
        <TranslationFields
          locale="en"
          isPending={isPending}
          handleTranslateAction={handleTranslateAction}
          autoFocus={locale === "en"}
          translatingFieldName={translatingField?.locale === "en" ? translatingField.name : null}
        />
      </TabsContent>
    </Tabs>
  )
})