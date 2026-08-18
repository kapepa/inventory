import { getTranslations } from "next-intl/server";
import { getCategoriesWithProductCountCached } from "@/entities/category/lib/category-service-cached";
import { AddCategoryButton } from "@/features/add-category/ui/add-category-button";
import { PAGINATION_CATEGORIES_DEFAULTS } from "@/shared/constants/pagination";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Container } from "@/shared/ui/container";
import { CategoriesList } from "@/widgets/categories-list/ui/categories-list";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { Metadata } from "next";
import { getSessionUserCached } from "@/features/auth/lib/auth-service-cached";
import { CategoryHeader } from "@/entities/category/ui/category-header";
import { generatePageMetadata } from "@/shared/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({ locale, key: "categories" })
}

export default async function Categories({
  params,
  searchParams,
}: {
  params: Promise<{ locale: AppLocale }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const locale = (await params).locale;
  const resolvedSearchParams = await searchParams;
  const categoryTerm = (resolvedSearchParams[QUERY_PARAMS_KEYS.CATEGORIES_SEARCH] as string) || "";

  const [user, categories, t] = await Promise.all([
    getSessionUserCached(),
    getCategoriesWithProductCountCached({
      search: categoryTerm,
      page: PAGINATION_CATEGORIES_DEFAULTS.PAGE,
      limit: PAGINATION_CATEGORIES_DEFAULTS.LIMIT,
      locale,
    }),
    getTranslations({ locale, namespace: "categories-page" })
  ]);

  const isAdmin = user?.role === "ADMIN";

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title")}
        count={categories.total}
        action={isAdmin && <AddCategoryButton locale={locale} />}
        storeType="categories"
      />
      <div className="flex-1 min-h-0 flex flex-col">
        <CategoryHeader className="hidden lg:grid" />
        <CategoriesList
          initialHasMore={categories.hasMore}
          initialCategories={categories.data}
        />
      </div>
    </Container>
  );
}
