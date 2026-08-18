import { RegisterForm } from "@/features/auth/ui/register-form";
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
      title: "Регистрация — Inventory",
      description: "Создание нового аккаунта."
    },
    en: {
      title: "Registration — Inventory",
      description: "Create a new account."
    }
  }

  return metadataByLocale[locale]
}

export default async function Register({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;

  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col justify-center items-center">
      <AuthGate locale={locale} activeTab={ROUTES.REGISTER}>
        <RegisterForm />
      </AuthGate>
    </Container>
  );
}