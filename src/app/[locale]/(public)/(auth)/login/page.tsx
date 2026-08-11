import { LoginFormLabels } from "@/features/auth/model/types/types";
import { LoginForm } from "@/features/auth/ui/login-form";
import { ROUTES } from "@/shared/constants/routes";
import { AppLocale } from "@/shared/lib/i18n/config";
import { Container } from "@/shared/ui/container";
import { AuthGate } from "@/widgets/auth-gate/ui/auth-gate";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('login.title'),
    description: t('login.description'),
  };
}

export default async function Login({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const tForm = await getTranslations({ locale, namespace: 'auth.form' });

  const labels: LoginFormLabels = {
    emailLabel: tForm('labels.email'),
    emailPlaceholder: tForm('placeholders.email'),
    passwordLabel: tForm('labels.password'),
    passwordPlaceholder: tForm('placeholders.password'),
    resetButton: tForm('buttons.reset'),
    signInButton: tForm('buttons.sign-in'),
  };

  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col justify-center items-center">
      <AuthGate locale={locale} activeTab={ROUTES.LOGIN}>
        <LoginForm locale={locale} labels={labels} />
      </AuthGate>
    </Container>
  );
}