"use client"

import dynamic from "next/dynamic";

export const SheetGroupsRelationsDynamic = dynamic(() =>
  import("./wrapper-sheet-groups-relations").then(mod => mod.WrapperSheetGroupsRelations),
  {
    loading: () => (
      <div className="z-40 bg-black/50 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed top-0 left-0 right-0 bottom-0" />
    ),
    ssr: false,
  }
);