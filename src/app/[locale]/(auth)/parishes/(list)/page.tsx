import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PAGINATION_PARISHES_DEFAULTS } from "@/shared/constants/pagination";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { Container } from "@/shared/ui/container"
import { AppLocale } from "@/shared/lib/i18n/config";
import { getParishesTotalsCached } from "@/entities/parish/lib/parish-service-cached";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { ParishesList } from "@/widgets/parishes-list/ui/parishes-list";
import { getSessionUserCached } from "@/features/auth/lib/auth-service-cached";
import { AddParishButton } from "@/features/add-parish/ui/add-parish-button";
import { ParishWideHeader } from "@/entities/parish/ui/parish-wide/parish-wide-header";
import { generatePageMetadata } from "@/shared/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({ locale, key: "parishes" })
}

export default async function Parishes({
  params,
  searchParams
}: {
  params: Promise<{ locale: AppLocale }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const search = (resolvedSearchParams[QUERY_PARAMS_KEYS.PARISHES_SEARCH] as string) || "";

  const [user, initialData, t] = await Promise.all([
    getSessionUserCached(),
    getParishesTotalsCached({
      page: PAGINATION_PARISHES_DEFAULTS.PAGE,
      limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
      search,
      locale,
    }),
    getTranslations({ locale, namespace: "parishes-page" }),
  ]);

  const isAdmin = user?.role === "ADMIN";

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title")}
        count={initialData.total}
        action={isAdmin && <AddParishButton locale={locale} />}
        storeType="parishes"
      />
      <div className="w-full min-h-0 flex flex-col">
        <ParishWideHeader
          locale={locale}
          isAdmin={isAdmin}
          className="hidden md:grid shrink-0"
        />
        <ParishesList
          isAdmin={isAdmin}
          initialParishes={initialData.data}
          initialHasMore={initialData.hasMore}
        />
      </div>
    </Container>
  );
}