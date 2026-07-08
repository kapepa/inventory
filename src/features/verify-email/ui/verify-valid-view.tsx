"use client"

import { useTranslations } from "next-intl";
import { VerifyCard } from "./verify-card";

interface VerifyValidViewProps {
  token: string,
  email: string,
}

export const VerifyValidView = ({ token, email }: VerifyValidViewProps) => {
  const t = useTranslations("verify-email.verify-valid-view");

  return (
    <VerifyCard className="flex flex-col items-center gap-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description", { email })}</p>
      </div>
    </VerifyCard>
  )
}

VerifyValidView.displayName = "VerifyValidView"