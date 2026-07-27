import { getCategoriesByParishIdCached, getFilteredProductsWideCached, getParishByIdCached } from "@/entities/server";
import { ProductsExplore } from "@/features";
import { Container, AppLocale, PAGINATION_PARISHES_DEFAULTS, BackButton, QUERY_PARAMS_KEYS } from "@/shared";
import { PageHeader, ProductsList } from "@/widgets";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

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
  const categoryTerm = (resolvedSearchParams[QUERY_PARAMS_KEYS.CATEGORY] as string) || "";
  const specification = (resolvedSearchParams[QUERY_PARAMS_KEYS.SPECIFICATION] as string) || "";

  const [parish, products, categories] = await Promise.all([
    getParishByIdCached({ id, locale }),
    getFilteredProductsWideCached({
      locale,
      parishId: id,
      categoryId: categoryTerm,
      specification: specification,
      page: PAGINATION_PARISHES_DEFAULTS.PAGE,
      limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
    }),
    getCategoriesByParishIdCached({ id, locale })
  ]);
  if (!parish) notFound();

  const t = await getTranslations({ locale, namespace: "parishes-id-page" });
  const { title, description } = parish.translations[0]

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <ProductsExplore
        initialCategories={categories}
        className="pb-3"
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
        initialParishId={id}
        initialProducts={products.data}
        initialHasMore={products.hasMore}
      />
    </Container>
  );
}