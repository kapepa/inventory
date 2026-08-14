import { getTranslations } from "next-intl/server";
import { AppLocale } from "@/shared/lib/i18n/config";
import { getSessionUserCached } from "@/features/auth/lib/auth-service-cached";
import { getParishesCached } from "@/entities/parish/lib/parish-service-cached";
import { PAGINATION_PARISHES_DEFAULTS } from "@/shared/constants/pagination";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { AddParishButton } from "@/features/add-parish/ui/add-parish-button";
import { GroupsList } from "@/widgets/groups-list/ui/groups-list";
import { GroupsListLabels } from "@/widgets/groups-list/model/types";

export default async function Groups({
  params,
  searchParams,
}: {
  params: Promise<{ id: string, locale: AppLocale }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const searchParishes = (resolvedSearchParams[QUERY_PARAMS_KEYS.PARISHES_SEARCH] as string) || "";
  const parishId = (resolvedSearchParams.parish as string) || null;

  const [user, initialParishes] = await Promise.all([
    getSessionUserCached(),
    getParishesCached({
      page: PAGINATION_PARISHES_DEFAULTS.PAGE,
      limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
      search: searchParishes,
      locale,
    })
  ])

  const t = await getTranslations({ locale, namespace: "groups-page" });
  const tGroupsList = await getTranslations({ locale, namespace: "groups-list" });

  const isAdmin = user?.role === "ADMIN";

  const labelsGroupsList: GroupsListLabels = {
    errorsParishes: tGroupsList("errors.parishes"),
    parishesEmpty: tGroupsList("parishes-empty"),
  }

  return (
    <>
      <PageHeader
        title={t("header-title")}
        count={initialParishes.total}
        action={isAdmin && <AddParishButton locale={locale} />}
        className="col-span-1 lg:col-span-3 pb-0"
        storeType="parishes"
      />
      <GroupsList
        labels={labelsGroupsList}
        initialHasMore={initialParishes.hasMore}
        initialParishes={initialParishes.data}
        initialParishesId={parishId}
        className="h-full w-full max-w-lg m-auto col-span-1"
      />
    </>
  );
}