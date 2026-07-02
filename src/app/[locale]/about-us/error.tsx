'use client';

import { ErrorBlock } from '@/shared';
import { useTranslations } from 'next-intl';

interface AboutUsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AboutUsError({ error, reset }: AboutUsErrorProps) {
  const t = useTranslations("about-us.errors");

  return (
    <ErrorBlock
      error={error}
      reset={reset}
      title={t("title")}
      description={t("description")}
    />
  );
}