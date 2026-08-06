"use client"

import dynamic from "next/dynamic";
import { GroupsRelationsSkeleton } from "./groups-relations-skeleton";

export const GroupsRelationsDynamic = dynamic(
  () => import("./groups-relations").then(mod => mod.GroupsRelations),
  {
    loading: () => <GroupsRelationsSkeleton className="h-full pb-6 md:pb-16" />,
    ssr: false,
  }
);