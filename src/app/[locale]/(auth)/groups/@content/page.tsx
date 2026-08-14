import { getTranslations } from "next-intl/server";
import { AppLocale } from "@/shared/lib/i18n/config";
import { StateMessage } from "@/shared/ui/state-message";
import { headers } from "next/headers";
import { isMobileDevice } from "@/shared/lib/device/is-mobile-device";

export default async function GroupContent({
  params,
}: {
  params: Promise<{ locale: AppLocale }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params;
  const headersList = await headers();
  const isMobile = isMobileDevice(headersList.get("user-agent") || "");

  if (isMobile) return null

  const t = await getTranslations({ locale, namespace: "groups-page" });

  return (
    <div className="min-w-full col-span-1 lg:col-span-2">
      <StateMessage className="flex flex-col">
        {t("errors.parishes-not-selected")}
      </StateMessage>
    </div>
  );
}