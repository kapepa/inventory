import { getProductStatusCounts } from "@/entities/server";
import { Container, AppLocale, BackButton, ScrollArea } from "@/shared";
import { CategoryChart, PageHeader, WarehouseMapDynamic } from "@/widgets";
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
  const statusCounts = await getProductStatusCounts();

  const t = await getTranslations({ locale, namespace: "about-us" });

  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title")}
        action={<BackButton />}
      />
      <ScrollArea className="flex-1 min-h-0">
        <p className="text-sm md:text-base text-muted-foreground mt-3 mb-6 text-center">
          {t("header-description")}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <CategoryChart statusCounts={statusCounts} className="h-full" />
          <WarehouseMapDynamic />
        </div>
      </ScrollArea>
    </Container>
  );
}
