import { LoginForm } from "@/features/auth/ui/login-form";
import { ROUTES } from "@/shared/constants/routes";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Container } from "@/shared/ui/container";
import { AuthGate } from "@/widgets/auth-gate/ui/auth-gate";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadataByLocale: Record<AppLocale, Metadata> = {
    ru: {
      title: "Вход пользователя — Inventory",
      description: "Вход пользователя."
    },
    en: {
      title: "Login — Inventory",
      description: "User Login."
    }
  }

  return metadataByLocale[locale]
}

export default async function Login({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;

  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col justify-center items-center">
      <AuthGate locale={locale} activeTab={ROUTES.LOGIN}>
        <LoginForm locale={locale} />
      </AuthGate>
    </Container>
  );
}