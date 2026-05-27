import { AddParishButton } from "@/features";
import { Container, LocalesLanguages, PAGINATION_PARISHES_DEFAULTS } from "@/shared";
import { PageHeader, ParishesList } from "@/widgets";
import { getParishes } from "@/entities";
import { getTranslations } from "next-intl/server";

export default async function Parishes({ params }: { params: { locale: string } }) {
  const locale = (await params).locale as LocalesLanguages;
  const initialData = await getParishes({
    page: PAGINATION_PARISHES_DEFAULTS.PAGE,
    limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
    locale
  });
  const t = await getTranslations('parishe');

  return (
    <Container className="py-16">
      <PageHeader
        title={t("header-title")}
        count={initialData.total}
        action={<AddParishButton />}
      />
      <ParishesList initialParishes={initialData.data} initialHasMore={initialData.hasMore} />
    </Container>
  );
}