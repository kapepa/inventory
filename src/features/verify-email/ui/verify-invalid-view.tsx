import { SubmitButton } from "@/shared/ui";
import { VerifyCard } from "./verify-card";
import { ROUTES } from "@/shared/constants/routes";
import { Link } from "@/shared/lib/i18n/routing";
import { getTranslations } from "next-intl/server";

export const VerifyInvalidView = async () => {
  const t = await getTranslations("verify-email.verify-invalid-view");

  return (
    <VerifyCard className="flex flex-col items-center gap-6 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl text-destructive">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
      <SubmitButton variant="striking-accent">
        <Link href={ROUTES.LOGIN}>
          {t("back-to-auth")}
        </Link>
      </SubmitButton>
    </VerifyCard>
  )
}

VerifyInvalidView.displayName = "VerifyInvalidView"