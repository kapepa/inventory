import { VerifyCard } from "./verify-card";
import { VerifyCodeForm } from "./verify-code-form";
import { getTranslations } from "next-intl/server";

interface VerifyValidViewProps {
  token: string,
  email: string,
}

export const VerifyValidView = async ({ token, email }: VerifyValidViewProps) => {
  const t = await getTranslations("verify-email.verify-valid-view");

  return (
    <VerifyCard className="flex flex-col items-center gap-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description", { email })}</p>
      </div>
      <VerifyCodeForm
        email={email}
        token={token}
      />
    </VerifyCard>
  )
}

VerifyValidView.displayName = "VerifyValidView"