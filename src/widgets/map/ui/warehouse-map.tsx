import { AppLocale } from "@/shared/lib/i18n/config";
import { cn } from "@/shared/lib/utils";
import { getTranslations } from "next-intl/server";

interface WarehouseMapProps {
  locale: AppLocale
  className?: string,
}

export const WarehouseMap = async ({ locale, className }: WarehouseMapProps) => {
  const t = await getTranslations({ locale, namespace: "house-map" });

  const lat = 46.4825;
  const lon = 30.7233;

  return (
    <div
      className={cn("w-full h-full rounded-lg overflow-hidden border border-border shadow-sm min-h-75", className)}
      role="img"
      aria-label={t("marker")}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.02},${lat - 0.02},${lon + 0.02},${lat + 0.02}&layer=mapnik&marker=${lat},${lon}`}
        style={{ border: 0 }}
        title={t("marker")}
      />
    </div>
  );
};

WarehouseMap.displayName = "WarehouseMap";
