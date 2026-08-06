import { getCategoryByIdCached } from "@/entities/category/lib/category-service-cached";
import { getFilteredProductsWideCached } from "@/entities/product/lib/product-service-cached";
import { getSessionUserCached } from "@/features/auth/lib/auth-service-cached";
import { PAGINATION_PARISHES_DEFAULTS } from "@/shared/constants/pagination";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { AppLocale } from "@/shared/lib/i18n/config";
import { BackButton, Container } from "@/shared/ui";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { ProductsList } from "@/widgets/products-list/ui/products-list";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string, id: string }>;
}): Promise<Metadata> {
  const getParams = (await params)
  const id = getParams.id
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const category = await getCategoryByIdCached({ id, locale: locale as AppLocale });

  return {
    title: t('categories-id.title', { title: category?.translations[0].title || "" }),
    description: t('categories-id.description'),
  };
}

export default async function CategoriesId({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string, id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const getParams = (await params)
  const id = getParams.id
  const resolvedSearchParams = await searchParams;
  const searchTerm = (resolvedSearchParams[QUERY_PARAMS_KEYS.PRODUCTS_SEARCH] as string) || "";
  const locale = getParams.locale as AppLocale;

  const [user, category, products] = await Promise.all([
    getSessionUserCached(),
    getCategoryByIdCached({ id, locale: locale as AppLocale }),
    getFilteredProductsWideCached({
      categoryId: id,
      search: searchTerm,
      page: PAGINATION_PARISHES_DEFAULTS.PAGE,
      limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
    })
  ])
  if (!category) notFound();

  const t = await getTranslations({ locale, namespace: "categories-id-page" });
  const { title } = category.translations[0]
  const isAdmin = user?.role === "ADMIN";

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title", { title })}
        count={products.total}
        action={<BackButton />}
        storeType="products"
      />
      <ProductsList
        isAdmin={isAdmin}
        initialHasMore={products.hasMore}
        initialProducts={products.data}
        initialParishId={null}
        initialcategoryId={id}
        mode="category"
      />
    </Container>
  );
}
