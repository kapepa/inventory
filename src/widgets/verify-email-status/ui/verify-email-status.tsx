import { VerifyValidView } from "@/features/verify-email/ui/verify-valid-view"
import { VerifyExpiredView } from "@/features/verify-email/ui/verify-expired-view"
import { VerifyInvalidView } from "@/features/verify-email/ui/verify-invalid-view"
import { StatusVerifyEmail } from "../model/types"

interface VerifyEmailStatusProps {
  token: string,
  status: StatusVerifyEmail,
  email?: string
}

export const VerifyEmailStatus = ({ token, status, email }: VerifyEmailStatusProps) => {
  if (status === "valid" && email) return <VerifyValidView email={email} token={token} />
  if (status === "expired" && email) return <VerifyExpiredView email={email} />

  return <VerifyInvalidView />
}

VerifyEmailStatus.displayName = "VerifyEmailStatus"