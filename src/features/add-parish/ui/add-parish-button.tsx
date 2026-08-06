import { AppLocale } from "@/shared/lib/i18n/config"
import { getTranslations } from "next-intl/server"
import { AddParishButtonContent } from "./bricks/add-parish-button-content"

interface AddParishButtonProps {
  locale: AppLocale
  className?: string
}

export const AddParishButton = async ({ locale, className }: AddParishButtonProps) => {
  const t = await getTranslations({ locale, namespace: "add-parish" });

  return <AddParishButtonContent label={t("parishes-created-btn.create")} className={className} />;
}

AddParishButton.displayName = "AddParishButton"