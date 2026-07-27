"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslations } from "next-intl";

export const WarehouseMap = function () {
  const t = useTranslations('house-map');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapInstanceRef.current || !mapRef.current) return;

    const odessaPosition: [number, number] = [46.4825, 30.7233];
    const map = L.map(mapRef.current).setView(odessaPosition, 13);
    mapInstanceRef.current = map;

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

    // Add alt attributes to all map images
    const addAltToImages = () => {
      if (!mapRef.current) return;

      const tiles = mapRef.current.querySelectorAll('img.leaflet-tile:not([alt])');
      tiles.forEach((tile) => tile.setAttribute('alt', ''));

      const markerIcon = mapRef.current.querySelector('img.leaflet-marker-icon:not([alt])');
      if (markerIcon) markerIcon.setAttribute('alt', t("marker"));

      const markerShadow = mapRef.current.querySelector('img.leaflet-marker-shadow:not([alt])');
      if (markerShadow) markerShadow.setAttribute('alt', '');
    };

    // Run immediately and observe changes
    setTimeout(addAltToImages, 100);
    const observer = new MutationObserver(addAltToImages);
    observer.observe(mapRef.current, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [t]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg overflow-hidden border border-border shadow-sm min-h-75"
      style={{ zIndex: 10 }}
      role="img"
      aria-label={t("marker")}
    />
  );
};

WarehouseMap.displayName = "WarehouseMap";
