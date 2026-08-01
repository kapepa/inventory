import { getCategoriesWithProductCountCached } from "@/entities/category/lib/category-service-cached";
import { AddCategoryButton } from "@/features/add-category/ui/add-category-button";
import { PAGINATION_CATEGORIES_DEFAULTS, QUERY_PARAMS_KEYS } from "@/shared/constants";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Container } from "@/shared/ui";
import { CategoriesList } from "@/widgets/categories-list";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
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
    title: t('categories.title'),
    description: t('categories.description'),
  };
}

export default async function Categories({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const locale = (await params).locale as AppLocale;
  const resolvedSearchParams = await searchParams;
  const categoryTerm = (resolvedSearchParams[QUERY_PARAMS_KEYS.CATEGORIES_SEARCH] as string) || "";

  const categories = await getCategoriesWithProductCountCached({
    search: categoryTerm,
    page: PAGINATION_CATEGORIES_DEFAULTS.PAGE,
    limit: PAGINATION_CATEGORIES_DEFAULTS.LIMIT,
    locale,
  });

  const t = await getTranslations({ locale, namespace: "categories-page" });

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title")}
        count={categories.total}
        action={<AddCategoryButton />}
        storeType="categories"
      />
      <CategoriesList
        initialHasMore={categories.hasMore}
        initialCategories={categories.data}
      />
    </Container>
  );
}
