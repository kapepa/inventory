import { getCategoriesCached } from "@/entities/category/lib/category-service-cached";
import { getFilteredProductsWideCached } from "@/entities/product/lib/product-service-cached";
import { ProductsExplore } from "@/features/products-explore/ui/products-explore";
import { PAGINATION_PARISHES_DEFAULTS } from "@/shared/constants/pagination";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Container } from "@/shared/ui";
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
  const categoryTerm = (resolvedSearchParams[QUERY_PARAMS_KEYS.CATEGORY] as string) || "";
  const specification = (resolvedSearchParams[QUERY_PARAMS_KEYS.SPECIFICATION] as string) || "";

  const [categories, products] = await Promise.all([
    getCategoriesCached({ locale }),
    getFilteredProductsWideCached({
      locale,
      specification: specification,
      categoryId: categoryTerm,
      page: PAGINATION_PARISHES_DEFAULTS.PAGE,
      limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
    }),
  ])

  const t = await getTranslations({ locale, namespace: "products-page" });

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <ProductsExplore
        initialCategories={categories}
        className="pb-3"
      />
      <PageHeader
        title={t("header-title")}
        count={products.total}
        storeType="products"
      />
      <ProductsList
        initialParishId={null}
        initialProducts={products.data}
        initialHasMore={products.hasMore}
      />
    </Container>
  );
}