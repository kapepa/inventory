"use client"

import dynamic from "next/dynamic";

export const RegisterFormDynamic = dynamic(() =>
  import("./register-form").then(mod => mod.RegisterForm),
  { ssr: false, }
);