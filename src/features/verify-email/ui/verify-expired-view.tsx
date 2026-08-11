import { VerifyCard } from "./verify-card";
import { getTranslations } from "next-intl/server";
import { VerifyExpiredBtn } from "./verify-expired-btn";

interface VerifyExpiredViewProps {
  email: string,
}

export const VerifyExpiredView = async ({ email }: VerifyExpiredViewProps) => {
  const t = await getTranslations("verify-email.verify-expired-view");

  return (
    <VerifyCard className="flex flex-col items-center gap-6 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl text-destructive">{t("title")}</h2>
        <p className="text-muted-foreground">
          {t("description", { email })}
        </p>
      </div>
      <VerifyExpiredBtn email={email} label={t("resend-button")} />
    </VerifyCard>
  );
}

VerifyExpiredView.displayName = "VerifyExpiredView"