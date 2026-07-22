"use client"

import dynamic from "next/dynamic";

export const AddParishModalDynamic = dynamic(() =>
  import("./add-parish-modal").then(mod => mod.AddParishModal)
);