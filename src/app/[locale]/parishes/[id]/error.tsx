'use client';

import { ErrorBlock } from '@/shared';
import { useTranslations } from 'next-intl';

interface ErrorGroupsProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ParishesIdError({ error, reset }: ErrorGroupsProps) {
  const t = useTranslations("parishes-id-page.errors");

  return (
    <ErrorBlock
      error={error}
      title={t("title")}
      description={t("description")}
    />
  );
}