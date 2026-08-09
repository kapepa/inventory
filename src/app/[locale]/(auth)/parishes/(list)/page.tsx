import { getTranslations } from "next-intl/server";
import { AddParishButton } from "@/features/add-parish/ui/add-parish-button";
import { getParishesTotalsCached } from "@/entities/parish/lib/parish-service-cached";
import { getSessionUserCached } from "@/features/auth/lib/auth-service-cached";
import { PAGINATION_PARISHES_DEFAULTS } from "@/shared/constants/pagination";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Container } from "@/shared/ui/container";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { ParishesList } from "@/widgets/parishes-list/ui/parishes-list";
import { Metadata } from "next";

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
  params: Promise<{ locale: AppLocale }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const timeStart = Date.now()
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const searchTerm = (resolvedSearchParams[QUERY_PARAMS_KEYS.PARISHES_SEARCH] as string) || "";

  const [user, initialData] = await Promise.all([
    getSessionUserCached(),
    getParishesTotalsCached({
      page: PAGINATION_PARISHES_DEFAULTS.PAGE,
      limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
      search: searchTerm,
      locale,
    })
  ])

  const t = await getTranslations({ locale, namespace: "parishes-page" });
  const isAdmin = user?.role === "ADMIN";

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title")}
        count={initialData.total}
        action={isAdmin && <AddParishButton locale={locale} />}
        storeType="parishes"
      />
      <ParishesList
        isAdmin={isAdmin}
        initialParishes={initialData.data}
        initialHasMore={initialData.hasMore}
      />
    </Container>
  );
}