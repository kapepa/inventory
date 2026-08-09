'use client';

import { ErrorBlock } from '@/shared/ui/error-block';
import { useTranslations } from 'next-intl';

interface ErrorParishesIdProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ParishesIdError({ error }: ErrorParishesIdProps) {
  const t = useTranslations("parishes-id-page.errors");

  return (
    <ErrorBlock
      error={error}
      title={t("title")}
      description={t("description")}
    />
  );
}