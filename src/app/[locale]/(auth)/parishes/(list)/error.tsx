'use client';

import { ErrorBlock } from '@/shared/ui/error-block';
import { useTranslations } from 'next-intl';

interface ErrorParishesProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ParishesError({ error, reset }: ErrorParishesProps) {
  const t = useTranslations("parishes-page.errors");

  return (
    <ErrorBlock
      error={error}
      reset={reset}
      title={t("title")}
      description={t("description")}
    />
  );
}