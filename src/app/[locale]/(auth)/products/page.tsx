import { getCategoriesCached } from "@/entities/category/lib/category-service-cached";
import { getFilteredProductsWideCached } from "@/entities/product/lib/product-service-cached";
import { getSessionUserCached } from "@/features/auth/lib/auth-service-cached";
import { ProductsExplore } from "@/features/products-explore/ui/products-explore";
import { PAGINATION_PARISHES_DEFAULTS } from "@/shared/constants/pagination";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Container } from "@/shared/ui/container";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { ProductsList } from "@/widgets/products-list/ui/products-list";
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
    title: t('products.title'),
    description: t('products.description'),
  };
}

export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const locale = (await params).locale as AppLocale;
  const resolvedSearchParams = await searchParams;

  const search = (resolvedSearchParams[QUERY_PARAMS_KEYS.PRODUCTS_SEARCH] as string) || "";
  const categoryId = (resolvedSearchParams[QUERY_PARAMS_KEYS.CATEGORY] as string) || "";
  const specification = (resolvedSearchParams[QUERY_PARAMS_KEYS.SPECIFICATION] as string) || "";

  const [user, categories, products] = await Promise.all([
    getSessionUserCached(),
    getCategoriesCached({ locale }),
    getFilteredProductsWideCached({
      locale,
      search,
      categoryId,
      specification: specification,
      page: PAGINATION_PARISHES_DEFAULTS.PAGE,
      limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
    }),
  ])

  const t = await getTranslations({ locale, namespace: "products-page" });
  const isAdmin = user?.role === "ADMIN";

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <ProductsExplore
        locale={locale}
        className="pb-3"
        categoryId={categoryId}
        initialCategories={categories}
      />
      <PageHeader
        title={t("header-title")}
        count={products.total}
        storeType="products"
      />
      <ProductsList
        locale={locale}
        isAdmin={isAdmin}
        initialParishId={null}
        initialProducts={products.data}
        initialHasMore={products.hasMore}
      />
    </Container>
  );
}