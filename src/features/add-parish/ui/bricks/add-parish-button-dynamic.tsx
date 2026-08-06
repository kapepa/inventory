"use client"

import dynamic from "next/dynamic";
import { CirclePlusButton } from "@/shared/ui";

export const AddParishButtonDynamic = dynamic(
  () => import("./add-parish-button-content").then(mod => mod.AddParishButtonContent),
  {
    loading: () => <CirclePlusButton className="size-10" />,
    ssr: false,
  }
);