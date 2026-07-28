import { Container, AppLocale, ScrollArea } from "@/shared";
import { PageHeader, SettingsPanel } from "@/widgets";
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
    title: t('settings.title'),
    description: t('settings.description'),
  };
}

export default async function Settings({
  params,
}: {
  params: Promise<{ locale: string }>,
}) {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "settings-page" });

  return (
    <ScrollArea className="flex-1 min-h-0">
      <Container className="pt-6 md:pt-16 flex-1 flex flex-col min-h-0">
        <PageHeader
          title={t("header-title")}
        />
        <SettingsPanel />
      </Container>
    </ScrollArea>
  );
}