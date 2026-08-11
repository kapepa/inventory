import { VerifyCodeFormLabels } from "../model/types/types";
import { VerifyCard } from "./verify-card";
import { VerifyCodeForm } from "./verify-code-form";
import { getTranslations } from "next-intl/server";

interface VerifyValidViewProps {
  token: string,
  email: string,
}

export const VerifyValidView = async ({ token, email }: VerifyValidViewProps) => {
  const t = await getTranslations("verify-email.verify-valid-view");
  const tForm = await getTranslations("verify-email.verify-code-form");

  const labels: VerifyCodeFormLabels = {
    codeLabel: tForm('labels.code'),
    codePlaceholder: tForm('placeholders.code'),
    resetButton: tForm('buttons.reset'),
    sendButton: tForm('buttons.send'),
  };

  return (
    <VerifyCard className="flex flex-col items-center gap-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description", { email })}</p>
      </div>
      <VerifyCodeForm
        email={email}
        token={token}
        labels={labels}
      />
    </VerifyCard>
  )
}

VerifyValidView.displayName = "VerifyValidView"