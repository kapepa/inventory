import { getCategoriesByParishId, getParishById } from "@/entities/server";
import { getFilteredProductsWide } from "@/entities/server";
import { ProductsSearch } from "@/features";
import { Container, AppLocale, PAGINATION_PARISHES_DEFAULTS, BackButton, QUERY_PARAMS_KEYS } from "@/shared";
import { PageHeader, ProductsList } from "@/widgets";
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
  const parish = await getParishById({ id, locale: locale as AppLocale });

  return {
    title: t('parishes-id.title', { title: parish?.translations[0].title || "" }),
    description: t('parishes-id.description'),
  };
}

export default async function ParishesId({
  params,
  searchParams
}: {
  params: Promise<{ locale: string, id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const getParams = (await params)
  const id = getParams.id
  const resolvedSearchParams = await searchParams;
  const categoryTerm = (resolvedSearchParams[QUERY_PARAMS_KEYS.CATEGORY] as string) || "";
  const specification = (resolvedSearchParams[QUERY_PARAMS_KEYS.SPECIFICATION] as string) || "";
  const locale = getParams.locale as AppLocale;

  const [parish, products, categories] = await Promise.all([
    getParishById({ id, locale }),
    getFilteredProductsWide({
      locale,
      parishId: id,
      categoryId: categoryTerm,
      specification: specification,
      page: PAGINATION_PARISHES_DEFAULTS.PAGE,
      limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
    }),
    getCategoriesByParishId({ id, locale })
  ]);
  if (!parish) notFound();

  const t = await getTranslations({ locale, namespace: "parishes-id-page" });
  const { title, description } = parish.translations[0]

  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col min-h-0">
      <ProductsSearch
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