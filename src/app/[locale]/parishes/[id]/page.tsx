import { getParishById } from "@/entities/parish/api/parish-service";
import { getProductsWideByParishId } from "@/entities/products/api/product-service";
import { Container, AppLocale, PAGINATION_PARISHES_DEFAULTS } from "@/shared";
import { PageHeader, ProductsList } from "@/widgets";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('parishe.title'),
    description: t('parishe.description'),
  };
}

export default async function ParishesId({
  params,
}: {
  params: Promise<{ locale: string, id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const getParams = (await params)
  const id = getParams.id
  const locale = getParams.locale as AppLocale;

  const [parish, products] = await Promise.all([
    getParishById({ id, locale }),
    getProductsWideByParishId({ parishId: id, locale, page: PAGINATION_PARISHES_DEFAULTS.PAGE, limit: PAGINATION_PARISHES_DEFAULTS.LIMIT })
  ]);
  if (!parish) notFound();

  const t = await getTranslations({ locale, namespace: "parishes-id-page" });
  const { title, description } = parish.translations[0]

  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title")}
        subtitle={title}
        count={parish._count.products}
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