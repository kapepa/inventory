import { getParishesTotals } from "@/entities/server";
import { AddParishButton } from "@/features";
import { Container, AppLocale, PAGINATION_PARISHES_DEFAULTS, QUERY_PARAMS_KEYS } from "@/shared";
import { PageHeader, ParishesList } from "@/widgets";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('parishes.title'),
    description: t('parishes.description'),
  };
}

export default async function Parishes({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const locale = (await params).locale as AppLocale;
  const resolvedSearchParams = await searchParams;
  const searchTerm = (resolvedSearchParams[QUERY_PARAMS_KEYS.PARISHES_SEARCH] as string) || "";

  const initialData = await getParishesTotals({
    page: PAGINATION_PARISHES_DEFAULTS.PAGE,
    limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
    search: searchTerm,
    locale,
  });
  const t = await getTranslations({ locale, namespace: "parishes-page" });

  return (
    <Container className="py-6 md:py-16">
      <PageHeader
        title={t("header-title")}
        count={initialData.total}
        action={<AddParishButton />}
        storeType="parishes"
      />
      <ParishesList
        initialParishes={initialData.data}
        initialHasMore={initialData.hasMore}
      />
    </Container>
  );
}