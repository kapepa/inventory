'use client';

import { ErrorBlock } from '@/shared';
import { useTranslations } from 'next-intl';

interface ErrorUsersProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function UsersError({ error, reset }: ErrorUsersProps) {
  const t = useTranslations("users-page.errors");

  return (
    <ErrorBlock
      error={error}
      reset={reset}
      title={t("title")}
      description={t("description")}
    />
  );
}