import { getParishes } from "@/entities/parish/api/parish-service";
import { getProductsByParishId } from "@/entities/products/api/product-service";
import { AddParishButton } from "@/features";
import { Container, AppLocale, PAGINATION_PARISHES_DEFAULTS, QUERY_PARAMS_KEYS, PAGINATION_PRODUCTS_DEFAULTS } from "@/shared";
import { GroupsList, PageHeader } from "@/widgets";
import { GroupsRelations } from "@/widgets/groups-relations";
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

  const initialParishes = await getParishes({
    page: PAGINATION_PARISHES_DEFAULTS.PAGE,
    limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
    search: searchTerm,
    locale,
  });

  let initialProducts = null;
  if (parishId) {
    initialProducts = await getProductsByParishId({
      parishId,
      page: PAGINATION_PRODUCTS_DEFAULTS.PAGE,
      limit: PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
      locale,
    });
  }

  const t = await getTranslations({ locale, namespace: "groups" });

  return (
    <Container className="py-16">
      <PageHeader
        title={t("header-title")}
        count={initialParishes.total}
        action={<AddParishButton />}
      />
      <div className="w-full mx-auto">
        <div className="overflow-x-auto py-5 -mx-6 px-6">
          <div className="grid grid-cols-[minmax(290px,1fr)_2fr] gap-4 items-start ">
            <GroupsList
              initialHasMore={initialParishes.hasMore}
              initialParishes={initialParishes.data}
              initialParishesId={parishId}
            />
            <GroupsRelations
              initialHasMore={initialProducts?.hasMore}
              initialProducts={initialProducts?.data}
              initialParishesId={parishId}
            />
          </div>
        </div>
      </div>
    </Container >
  );
}