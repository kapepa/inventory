import { validateVerificationToken } from "@/entities/server";
import { AppLocale, Container, ExpiredError, NotFoundError, QUERY_PARAMS_KEYS, redirect, ROUTES } from "@/shared";
import { PageHeader, StatusVerifyEmail, VerifyEmailStatus } from "@/widgets";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type TokenStatusType = {
  status: StatusVerifyEmail;
  email?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('verify.title'),
    description: t('verify.description'),
  };
}

export default async function Verify({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const locale = (await params).locale as AppLocale;
  const resolvedSearchParams = await searchParams;
  const token = (resolvedSearchParams[QUERY_PARAMS_KEYS.VERIFY_TOKEN] as string) || "";
  if (!token) redirect({ href: ROUTES.AUTH, locale });

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
          token={token}
          status={tokenStatus.status}
          email={tokenStatus.email}
        />
      </div>
    </Container>
  );
}