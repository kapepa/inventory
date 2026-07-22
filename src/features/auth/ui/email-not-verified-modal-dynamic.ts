"use client"

import dynamic from "next/dynamic";

export const EmailNotVerifiedModalDynamic = dynamic(() =>
  import("./email-not-verified-modal").then(mod => mod.EmailNotVerifiedModal)
);