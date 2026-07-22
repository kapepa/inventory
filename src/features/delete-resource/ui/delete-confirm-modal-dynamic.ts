"use client"

import dynamic from "next/dynamic";

export const DeleteConfirmModalDynamic = dynamic(() =>
  import("./delete-confirm-modal").then(mod => mod.DeleteConfirmModal)
);