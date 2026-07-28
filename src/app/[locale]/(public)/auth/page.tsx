import { Container } from "@/shared";
import { AuthGate } from "@/widgets";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('auth.title'),
    description: t('auth.description'),
  };
}

export default async function Auth() {
  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col justify-center items-center">
      <AuthGate />
    </Container>
  );
}