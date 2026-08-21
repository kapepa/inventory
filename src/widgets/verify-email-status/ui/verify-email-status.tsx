import { VerifyValidView } from "@/features/verify-email/ui/verify-valid-view"
import { VerifyExpiredView } from "@/features/verify-email/ui/verify-expired-view"
import { VerifyInvalidView } from "@/features/verify-email/ui/verify-invalid-view"
import { StatusVerifyEmail } from "../model/types"
import { AppLocale } from "@/shared/lib/i18n/config"

interface VerifyEmailStatusProps {
  token: string,
  status: StatusVerifyEmail,
  email?: string
  locale: AppLocale
}

export const VerifyEmailStatus = ({ token, status, email, locale }: VerifyEmailStatusProps) => {
  if (status === "valid" && email) return <VerifyValidView locale={locale} email={email} token={token} />
  if (status === "expired" && email) return <VerifyExpiredView locale={locale} email={email} />

  return <VerifyInvalidView locale={locale} />
}

VerifyEmailStatus.displayName = "VerifyEmailStatus"