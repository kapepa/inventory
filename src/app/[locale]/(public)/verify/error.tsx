'use client';

import { ErrorBlock } from '@/shared/ui/error-block';
import { useTranslations } from 'next-intl';

interface ErrorVerifyProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function VerifyError({ error, reset }: ErrorVerifyProps) {
  const t = useTranslations("verify-page.errors");

  return (
    <ErrorBlock
      error={error}
      reset={reset}
      title={t("title")}
      description={t("description")}
    />
  );
}