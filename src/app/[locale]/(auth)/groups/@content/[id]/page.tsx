import { getTranslations } from "next-intl/server";
import { getFilteredProductsShortCached } from "@/entities/product/lib/product-service-cached";
import { PAGINATION_PRODUCTS_DEFAULTS } from "@/shared/constants/pagination";
import { getSessionUserCached } from "@/features/auth/lib/auth-service-cached";
import { getParishByIdCached } from "@/entities/parish/lib/parish-service-cached";
import { GroupsRelations } from "@/widgets/groups-relations/ui/groups-relations";
import { AppLocale } from "@/shared/lib/i18n/config";
import { redirect } from "@/shared/lib/i18n/routing";
import { ROUTES } from "@/shared/constants/routes";
import { GroupsRelationsLabels } from "@/widgets/groups-relations/model/types";
import { headers } from "next/headers";
import { isMobileDevice } from "@/shared/lib/device/is-mobile-device";
import { SheetGroupsRelationsDynamic } from "@/widgets/groups-relations/ui/sheet-groups-relations-dynamic";

export default async function GroupDetailId({
  params,
}: {
  params: Promise<{ id: string, locale: AppLocale }>,
}) {
  const { id, locale } = await params;
  const headersList = await headers();
  const isMobile = isMobileDevice(headersList.get("user-agent") || "");

  const [user, parish, initialProducts] = await Promise.all([
    getSessionUserCached(),
    getParishByIdCached({ id }),
    getFilteredProductsShortCached({
      parishId: id,
      page: PAGINATION_PRODUCTS_DEFAULTS.PAGE,
      limit: PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
      locale,
    })
  ])

  if (!initialProducts) return redirect({ locale, href: ROUTES.GROUPS })

  const tGroupsRelations = await getTranslations({ locale, namespace: "groups-relations" });

  const isAdmin = user?.role === "ADMIN";
  const parishTitle = parish?.translations[0].title || "";

  const labelsGroupsRelations: GroupsRelationsLabels = {
    parishesError: tGroupsRelations("parishes-error"),
    productsNotFound: tGroupsRelations("products.not-found"),
  }

  if (isMobile) {
    return (
      <SheetGroupsRelationsDynamic
        labels={labelsGroupsRelations}
        isAdmin={isAdmin}
        initialHasMore={initialProducts?.hasMore}
        initialProducts={initialProducts?.data}
        initialParishesId={id}
        initialParishTitle={parishTitle}
      />
    );
  }

  return (
    <GroupsRelations
      labels={labelsGroupsRelations}
      isAdmin={isAdmin}
      initialHasMore={initialProducts?.hasMore}
      initialProducts={initialProducts?.data}
      initialParishesId={id}
      initialParishTitle={parishTitle}
      className="h-full pb-6 md:pb-16 min-w-full col-span-2"
    />
  );
}