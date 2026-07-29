import { getSessionUserCached } from "@/features/server";
import { ProvidersAuthClient, ProvidersUIClient } from "../providers-client";
import { AppLocale, redirect, ROUTES } from "@/shared";

export default async function AuthLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  const user = await getSessionUserCached()

  if (!user) return redirect({ href: ROUTES.AUTH, locale: locale as AppLocale })

  return (
    <ProvidersUIClient>
      <ProvidersAuthClient initialUser={user}>
        {children}
      </ProvidersAuthClient>
    </ProvidersUIClient>
  );
}
