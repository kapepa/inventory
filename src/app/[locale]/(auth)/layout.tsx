import { ProvidersAuthClient } from "../providers-client";
import { ROUTES } from "@/shared/constants/routes";
import { redirect } from "@/shared/lib/i18n/routing";
import { AppLocale } from "@/shared/lib/i18n/config";
import { getSessionUserCached } from "@/features/auth/lib/auth-service-cached";

export default async function AuthLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  const user = await getSessionUserCached()

  if (!user) return redirect({ href: ROUTES.LOGIN, locale: locale as AppLocale })

  return (
    <ProvidersAuthClient initialUser={user}>
      {children}
    </ProvidersAuthClient>
  );
}
