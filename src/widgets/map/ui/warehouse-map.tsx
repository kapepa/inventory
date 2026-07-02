"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslations } from "next-intl";

export const WarehouseMap = function () {
  const t = useTranslations('house-map');
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !mapRef.current) return;
    initialized.current = true;

    const odessaPosition: [number, number] = [46.4825, 30.7233];
    const map = L.map(mapRef.current).setView(odessaPosition, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const DefaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    L.marker(odessaPosition, { icon: DefaultIcon })
      .addTo(map)
      .bindPopup(
        `<div class="p-1">
          <h3 class="font-semibold text-sm">${t("marker")}</h3>
          <p class="text-xs">${t("address")}</p>
        </div>`
      );

    return () => {
      map.remove();
      initialized.current = false;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg overflow-hidden border border-border shadow-sm min-h-75"
      style={{ zIndex: 10 }}
    />
  );
};

WarehouseMap.displayName = "WarehouseMap";