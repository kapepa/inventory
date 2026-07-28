'use client';

import { ErrorBlock } from '@/shared';
import { useTranslations } from 'next-intl';

interface ErrorGroupsProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GroupsError({ error, reset }: ErrorGroupsProps) {
  const t = useTranslations("groups-page.errors");

  return (
    <ErrorBlock
      error={error}
      reset={reset}
      title={t("title")}
      description={t("description")}
    />
  );
}