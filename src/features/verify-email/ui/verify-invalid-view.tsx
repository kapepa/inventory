"use client"

import { Link, ROUTES, SubmitButton } from "@/shared";
import { useTranslations } from "next-intl";
import { VerifyCard } from "./verify-card";

export const VerifyInvalidView = () => {
  const t = useTranslations("verify-email.verify-invalid-view");

  return (
    <VerifyCard className="flex flex-col items-center gap-6 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl text-destructive">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
      <SubmitButton variant="striking-accent">
        <Link href={ROUTES.AUTH}>
          {t("back-to-auth")}
        </Link>
      </SubmitButton>
    </VerifyCard>
  )
}

VerifyInvalidView.displayName = "VerifyInvalidView"