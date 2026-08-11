"use client"

import { useVerifiedEmail } from "@/features/auth/model/hooks/use-verified-email";
import { SubmitButton } from "@/shared/ui/action-buttons";

interface VerifyExpiredBtnProps {
  email: string,
  label: string,
}

export const VerifyExpiredBtn = ({ email, label }: VerifyExpiredBtnProps) => {
  const { confirmVerifiedEmail } = useVerifiedEmail()

  return (
    <SubmitButton
      onClick={() => { confirmVerifiedEmail(email) }}
      variant="striking-accent"
    >
      {label}
    </SubmitButton>
  );
}

VerifyExpiredBtn.displayName = "VerifyExpiredBtn"