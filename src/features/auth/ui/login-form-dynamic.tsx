"use client"

import { LoaderSpin } from "@/shared";
import dynamic from "next/dynamic";

export const LoginFormDynamic = dynamic(
  () => import('./login-form').then(mod => mod.LoginForm),
  {
    loading: () => (
      <div className="p-6 flex items-center justify-center min-h-75">
        <LoaderSpin className="size-10" />
      </div>
    ),
    ssr: false,
  }
);