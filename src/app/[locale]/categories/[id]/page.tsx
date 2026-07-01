import { getCategoryhById, getFilteredProductsWide } from "@/entities/server";
import { Container, AppLocale, BackButton, PAGINATION_PARISHES_DEFAULTS, QUERY_PARAMS_KEYS } from "@/shared";
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
  const category = await getCategoryhById({ id, locale: locale as AppLocale });

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

  const [category, products] = await Promise.all([
    getCategoryhById({ id, locale: locale as AppLocale }),
    getFilteredProductsWide({
      categoryId: id,
      search: searchTerm,
      page: PAGINATION_PARISHES_DEFAULTS.PAGE,
      limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
    })
  ])
  if (!category) notFound();

  const t = await getTranslations({ locale, namespace: "categories-id-page" });
  const { title } = category.translations[0]

  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title", { title })}
        count={products.total}
        action={<BackButton />}
        storeType="products"
      />
      <ProductsList
        initialHasMore={products.hasMore}
        initialProducts={products.data}
        initialParishId={null}
        initialcategoryId={id}
        mode="category"
      />
    </Container>
  );
}
