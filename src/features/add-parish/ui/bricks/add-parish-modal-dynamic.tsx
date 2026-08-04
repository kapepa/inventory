"use client"

import dynamic from "next/dynamic";
import { AddParishModalSkeleton } from "./add-parish-modal-skeleton";

export const AddParishModalDynamic = dynamic(() =>
  import("./add-parish-modal").then(mod => mod.AddParishModal),
  {
    loading: () => <AddParishModalSkeleton />,
    ssr: false,
  }
);