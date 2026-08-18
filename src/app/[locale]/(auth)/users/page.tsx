import { getFilteredUsersCached } from "@/entities/user/lib/user-service-cached";
import { PAGINATION_USERS_DEFAULTS } from "@/shared/constants/pagination";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { AppLocale } from "@/shared/lib/i18n/config";
import { generatePageMetadata } from "@/shared/lib/metadata";
import { Container } from "@/shared/ui/container";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { UsersList } from "@/widgets/users-list/ui/users-list";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({ locale, key: "users" })
}

export default async function Users({
  params,
  searchParams,
}: {
  params: Promise<{ locale: AppLocale }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const usersTerm = (resolvedSearchParams[QUERY_PARAMS_KEYS.USERS_SEARCH] as string) || "";

  const [users, t] = await Promise.all([
    getFilteredUsersCached({
      search: usersTerm,
      limit: PAGINATION_USERS_DEFAULTS.LIMIT,
      page: PAGINATION_USERS_DEFAULTS.PAGE,
    }),
    getTranslations({ locale, namespace: "users-page" })
  ])

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title")}
        count={users.total}
        storeType="users"
      />
      <UsersList
        initialUsers={users.data}
        initialHasMore={users.hasMore}
      />
    </Container>
  );
}