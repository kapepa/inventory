import { ParishesSearch } from "@/features/header-search/ui/parishes-search";
import { Container } from "@/shared/ui/container";
import { Header } from "@/widgets/header/ui/Header";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";
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
    title: t('groups.title'),
    description: t('groups.description'),
  };
}

export default function ParishesLayout({ children, content }: { children: React.ReactNode, content: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Sidebar />
      <Header
        className="shrink-0"
        headerActions={<ParishesSearch />}
      />
      <main className="flex-1 min-h-0 flex flex-col">
        <Container className="pt-6 md:pt-16 min-h-0 grid grid-cols-1 lg:grid-cols-3 grid-template-rows gap-4">
          {children}
          {content}
        </Container>
      </main>
    </div>
  );
}

