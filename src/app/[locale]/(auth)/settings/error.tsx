'use client';

import { ErrorBlock } from '@/shared/ui';
import { useTranslations } from 'next-intl';

interface ErrorSettingsProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SettingsError({ error, reset }: ErrorSettingsProps) {
  const t = useTranslations("settings-page.errors");

  return (
    <ErrorBlock
      error={error}
      reset={reset}
      title={t("title")}
      description={t("description")}
    />
  );
}