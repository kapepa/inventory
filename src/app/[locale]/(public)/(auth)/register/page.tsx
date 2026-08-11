import { RegisterFormLabels } from "@/features/auth/model/types/types";
import { RegisterForm } from "@/features/auth/ui/register-form";
import { ROUTES } from "@/shared/constants/routes";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Container } from "@/shared/ui/container";
import { AuthGate } from "@/widgets/auth-gate/ui/auth-gate";
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
    title: t('register.title'),
    description: t('register.description'),
  };
}

export default async function Register({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const tForm = await getTranslations({ locale, namespace: 'auth.form' });

  const labels: RegisterFormLabels = {
    nameLabel: tForm('labels.name'),
    namePlaceholder: tForm('placeholders.name'),
    emailLabel: tForm('labels.email'),
    emailPlaceholder: tForm('placeholders.email'),
    passwordLabel: tForm('labels.password'),
    passwordPlaceholder: tForm('placeholders.password'),
    confirmPasswordLabel: tForm('labels.confirm-password'),
    confirmPasswordPlaceholder: tForm('placeholders.confirm-password'),
    resetButton: tForm('buttons.reset'),
    signUpButton: tForm('buttons.sign-up'),
  };

  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col justify-center items-center">
      <AuthGate locale={locale} activeTab={ROUTES.REGISTER}>
        <RegisterForm labels={labels} />
      </AuthGate>
    </Container>
  );
}