"use client";

import { useTranslations } from "next-intl";

export const WarehouseMap = function () {
  const t = useTranslations('house-map');

  const lat = 46.4825;
  const lon = 30.7233;
  const zoom = 13;

  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden border border-border shadow-sm min-h-75"
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
