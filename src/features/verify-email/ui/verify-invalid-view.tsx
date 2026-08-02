"use client"

import { SubmitButton } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { VerifyCard } from "./verify-card";
import { ROUTES } from "@/shared/constants";
import { Link } from "@/shared/lib/i18n/routing";

export const VerifyInvalidView = () => {
  const t = useTranslations("verify-email.verify-invalid-view");

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