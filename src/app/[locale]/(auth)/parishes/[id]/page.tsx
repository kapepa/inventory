import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PAGINATION_PRODUCTS_DEFAULTS } from "@/shared/constants/pagination";
import { BackButton } from "@/shared/ui/back-button";
import { Container } from "@/shared/ui/container"
import { AppLocale } from "@/shared/lib/i18n/config";
import { getCategoriesByParishIdCached } from "@/entities/category/lib/category-service-cached";
import { getParishByIdCached } from "@/entities/parish/lib/parish-service-cached";
import { getFilteredProductsWideCached } from "@/entities/product/lib/product-service-cached";
import { ProductsExplore } from "@/features/products-explore/ui/products-explore";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { ProductsList } from "@/widgets/products-list/ui/products-list";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { getSessionUserCached } from "@/features/auth/lib/auth-service-cached";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale, id: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const parish = await getParishByIdCached({ id, locale: locale as AppLocale });
  const parishTitle = parish?.translations[0].title || "";
  const parishDescription = (parish?.translations[0].description?.trim() || t('parishes-id.description')).substring(0, 160);

  return {
    title: t('parishes-id.title', { title: parishTitle }),
    description: parishDescription,
    openGraph: {
      title: t('parishes-id.title', { title: parishTitle }),
      description: parishDescription,
    },
  };
}

export default async function ParishesId({
  params,
  searchParams
}: {
  params: Promise<{ locale: AppLocale, id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id, locale } = await params;
  const resolvedSearchParams = await searchParams;
  const categoryId = (resolvedSearchParams[QUERY_PARAMS_KEYS.CATEGORY] as string) || "";
  const specification = (resolvedSearchParams[QUERY_PARAMS_KEYS.SPECIFICATION] as string) || "";

  const [user, parish, products, categories] = await Promise.all([
    getSessionUserCached(),
    getParishByIdCached({ id, locale }),
    getFilteredProductsWideCached({
      locale,
      parishId: id,
      categoryId,
      specification: specification,
      page: PAGINATION_PRODUCTS_DEFAULTS.PAGE,
      limit: PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
    }),
    getCategoriesByParishIdCached({ id, locale })
  ]);
  if (!parish) notFound();

  const t = await getTranslations({ locale, namespace: "parishes-id-page" });
  const { title, description } = parish.translations[0]
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
        subtitle={title}
        count={products.total}
        action={<BackButton />}
        storeType="products"
      >
        {description}
      </PageHeader>
      <ProductsList
        isAdmin={isAdmin}
        initialParishId={id}
        initialProducts={products.data}
        initialHasMore={products.hasMore}
      />
    </Container>
  );
}