'use client';

import { ErrorBlock } from '@/shared/ui';
import { useTranslations } from 'next-intl';

interface ErrorAuthProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AuthError({ error, reset }: ErrorAuthProps) {
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