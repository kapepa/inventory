import { AppLocale } from "@/shared/lib/i18n/config"
import { getTranslations } from "next-intl/server"
import { AddParishButtonDynamic } from "./bricks/add-parish-button-dynamic"

interface AddParishButtonProps {
  locale: AppLocale
  className?: string
}

export const AddParishButton = async ({ locale, className }: AddParishButtonProps) => {
  const t = await getTranslations({ locale, namespace: "add-parish" });

  return <AddParishButtonDynamic label={t("parishes-created-btn.create")} className={className} />;
}

AddParishButton.displayName = "AddParishButton"