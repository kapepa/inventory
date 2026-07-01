'use client';

import { ErrorBlock } from '@/shared';
import { useTranslations } from 'next-intl';

interface ErrorCategoryIdProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CategoryIdError({ error, reset }: ErrorCategoryIdProps) {
  const t = useTranslations("categories-id-page.errors");

  return (
    <ErrorBlock
      error={error}
      reset={reset}
      title={t("title")}
      description={t("description")}
    />
  );
}