import { validateVerificationToken } from "@/entities/verify/lib/create-verification-code";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { ROUTES } from "@/shared/constants/routes";
import { ExpiredError, NotFoundError } from "@/shared/lib/errors";
import { AppLocale } from "@/shared/lib/i18n/config";
import { redirect } from "@/shared/lib/i18n/routing";
import { Container } from "@/shared/ui/container";
import { PageHeader } from "@/widgets/page-header/ui/page-header";
import { StatusVerifyEmail } from "@/widgets/verify-email-status/model/types";
import { VerifyEmailStatus } from "@/widgets/verify-email-status/ui/verify-email-status";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type TokenStatusType = {
  status: StatusVerifyEmail;
  email?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadataByLocale: Record<AppLocale, Metadata> = {
    ru: {
      title: "Подтверждение почты — Inventory",
      description: "Подтверждение адреса электронной почты для завершения регистрации."
    },
    en: {
      title: "Email Address Verification — Inventory",
      description: "Email Address Confirmation to Complete Registration."
    }
  }

  return metadataByLocale[locale]
}

export default async function Verify({
  params,
  searchParams,
}: {
  params: Promise<{ locale: AppLocale }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const token = (resolvedSearchParams[QUERY_PARAMS_KEYS.VERIFY_TOKEN] as string) || "";
  if (!token) redirect({ href: ROUTES.LOGIN, locale });

  const t = await getTranslations({ locale, namespace: "verify-page" });

  const tokenStatus: TokenStatusType = { status: 'invalid' };
  try {
    const { email } = await validateVerificationToken(token);
    tokenStatus.status = 'valid';
    tokenStatus.email = email;
  } catch (error) {
    if (error instanceof ExpiredError) {
      tokenStatus.status = 'expired';
      tokenStatus.email = error.email;
    } else if (error instanceof NotFoundError) {
      tokenStatus.status = 'invalid';
    } else {
      throw error;
    }
  }

  return (
    <Container className="py-6 md:py-16 flex-1 flex flex-col min-h-0">
      <PageHeader
        title={t("header-title")}
      />
      <div className="flex justify-center pt-8">
        <VerifyEmailStatus
          locale={locale}
          token={token}
          status={tokenStatus.status}
          email={tokenStatus.email}
        />
      </div>
    </Container>
  );
}