"use client"

import { SubmitButton } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { VerifyCard } from "./verify-card";
import { useVerifiedEmail } from "@/features/auth/model/hooks/use-verified-email";

interface VerifyExpiredViewProps {
  email: string,
}

export const VerifyExpiredView = ({ email }: VerifyExpiredViewProps) => {
  const t = useTranslations("verify-email.verify-expired-view");
  const { confirmVerifiedEmail } = useVerifiedEmail()

  return (
    <VerifyCard className="flex flex-col items-center gap-6 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl text-destructive">{t("title")}</h2>
        <p className="text-muted-foreground">
          {t("description", { email })}
        </p>
      </div>
      <SubmitButton
        onClick={() => { confirmVerifiedEmail(email) }}
        variant="striking-accent"
      >
        {t("resend-button")}
      </SubmitButton>
    </VerifyCard>
  );
}

VerifyExpiredView.displayName = "VerifyExpiredView"