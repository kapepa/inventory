import { VerifyExpiredView, VerifyInvalidView, VerifyValidView } from "@/features"
import { StatusVerifyEmail } from "../model"

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