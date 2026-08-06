import { getTranslations } from "next-intl/server";
import { getParishesCached } from "@/entities/parish/lib/parish-service-cached";
import { getFilteredProductsShortCached } from "@/entities/product/lib/product-service-cached";
import { AddParishButton } from "@/features/add-parish/ui/add-parish-button";
import { PAGINATION_PARISHES_DEFAULTS, PAGINATION_PRODUCTS_DEFAULTS } from "@/shared/constants/pagination";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Container } from "@/shared/ui";
import { GroupsList } from "@/widgets/groups-list/ui/groups-list";
import { SheetGroupsRelationsDynamic } from "@/widgets/groups-relations/ui/sheet-groups-relations-dynamic";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { Metadata } from "next";
import { GroupsRelationsDynamic } from "@/widgets/groups-relations/ui/groups-relations-dynamic";
import { getSessionUserCached } from "@/features/auth/lib/auth-service-cached";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('groups.title'),
    description: t('groups.description'),
  };
}

export default async function Groups({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const locale = (await params).locale as AppLocale;
  const resolvedSearchParams = await searchParams;
  const searchTerm = (resolvedSearchParams[QUERY_PARAMS_KEYS.PARISHES_SEARCH] as string) || "";
  const parishId = (resolvedSearchParams.parish as string) || null;

  const [user, initialParishes] = await Promise.all([
    getSessionUserCached(),
    getParishesCached({
      page: PAGINATION_PARISHES_DEFAULTS.PAGE,
      limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
      search: searchTerm,
      locale,
    })
  ])

  let initialProducts = null;
  if (parishId) {
    initialProducts = await getFilteredProductsShortCached({
      parishId,
      page: PAGINATION_PRODUCTS_DEFAULTS.PAGE,
      limit: PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
      locale,
    });
  }

  const parish = initialParishes.data.find((p) => p.id === parishId);
  const t = await getTranslations({ locale, namespace: "groups-page" });
  const isAdmin = user?.role === "ADMIN";

  return (
    <>
      <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
        <PageHeader
          title={t("header-title")}
          count={initialParishes.total}
          action={isAdmin && <AddParishButton locale={locale} />}
          className="shrink-0"
          storeType="parishes"
        />
        <div className="w-full mx-auto flex-1 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_4fr] gap-4 h-full">
            <GroupsList
              initialHasMore={initialParishes.hasMore}
              initialParishes={initialParishes.data}
              initialParishesId={parishId}
              className="h-full w-full max-w-lg m-auto"
            />
            <div className="hidden lg:block h-full min-h-0">
              <GroupsRelationsDynamic
                isAdmin={isAdmin}
                initialHasMore={initialProducts?.hasMore}
                initialProducts={initialProducts?.data}
                initialParishesId={parishId}
                initialParishTitle={parish?.translations?.[0]?.title || ""}
                className="h-full pb-6 md:pb-16"
              />
            </div>
            <div className="block lg:hidden h-full">
              <SheetGroupsRelationsDynamic
                isAdmin={isAdmin}
                initialHasMore={initialProducts?.hasMore}
                initialProducts={initialProducts?.data}
                initialParishesId={parishId}
                initialParishTitle={parish?.translations?.[0]?.title || ""}
              />
            </div>
          </div>
        </div>
      </Container >
    </>
  );
}
