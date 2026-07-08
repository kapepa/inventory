'use client';

import { ErrorBlock } from '@/shared';
import { useTranslations } from 'next-intl';

interface ErrorParishesProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AuthError({ error, reset }: ErrorParishesProps) {
  const t = useTranslations("auth-page.errors");

  return (
    <ErrorBlock
      error={error}
      reset={reset}
      title={t("title")}
      description={t("description")}
    />
  );
}