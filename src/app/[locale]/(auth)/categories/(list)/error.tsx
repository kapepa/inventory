'use client';

import { ErrorBlock } from '@/shared/ui';
import { useTranslations } from 'next-intl';

interface ErrorCategoriesProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CategoriesError({ error, reset }: ErrorCategoriesProps) {
  const t = useTranslations("categories-page.errors");

  return (
    <ErrorBlock
      error={error}
      reset={reset}
      title={t("title")}
      description={t("description")}
    />
  );
}