"use client"

import dynamic from "next/dynamic";

export const SheetGroupsRelationsDynamic = dynamic(() =>
  import("./wrapper-sheet-groups-relations").then(mod => mod.WrapperSheetGroupsRelations),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);