import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { BackButton, Container, ScrollArea } from "@/shared/ui";
import { AppLocale } from "@/shared/lib/i18n/config";
import { getProductStatusCountsCached } from "@/entities/product/lib/product-service-cached";
import { CategoryChartDynamic } from "@/widgets/category-chart/ui/category-chart-dynamic";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { WarehouseMap } from "@/widgets/map/ui/warehouse-map";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('about-us.title'),
    description: t('about-us.description'),
  };
}

export default async function AboutUs({
  params,
}: {
  params: Promise<{ locale: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const locale = (await params).locale as AppLocale;
  const statusCounts = await getProductStatusCountsCached();

  const t = await getTranslations({ locale, namespace: "about-us" });

  return (
    <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title")}
        action={<BackButton />}
      />
      <ScrollArea className="flex-1 min-h-0">
        <div className="pb-6 md:pb-16">
          <p className="text-sm md:text-base text-muted-foreground mt-3 mb-6 text-center">
            {t("header-description")}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <WarehouseMap locale={locale} className="w-full m-auto min-h-75" />
            <CategoryChartDynamic statusCounts={statusCounts} className="w-full m-auto min-h-75" />
          </div>
        </div>
      </ScrollArea>
    </Container>
  );
}
