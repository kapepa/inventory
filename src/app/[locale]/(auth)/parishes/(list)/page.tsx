import { getParishesTotalsCached } from "@/entities/parish/lib/parish-service-cached";
import { AddParishButton } from "@/features/add-parish/ui/add-parish-button";
import { PAGINATION_PARISHES_DEFAULTS, QUERY_PARAMS_KEYS } from "@/shared/constants";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Container } from "@/shared/ui/container";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { ParishesList } from "@/widgets/parishes-list/ui/parishes-list";
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

  const initialData = await getParishesTotalsCached({
    page: PAGINATION_PARISHES_DEFAULTS.PAGE,
    limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
    search: searchTerm,
    locale,
  });
  const t = await getTranslations({ locale, namespace: "parishes-page" });

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
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