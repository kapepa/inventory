"use client"

import { Skeleton } from "@/shared/ui";
import dynamic from "next/dynamic";

export const RegisterFormDynamic = dynamic(() =>
  import("./register-form").then(mod => mod.RegisterForm),
  {
    loading: () => (
      <div className="space-y-6">
        <div className="flex flex-col gap-y-8 pb-3 px-6">
          <div className="flex flex-col gap-y-2">
            <Skeleton className="w-24 h-4.5" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Skeleton className="w-24 h-4.5" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Skeleton className="w-24 h-4.5" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Skeleton className="w-24 h-4.5" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>
        <div className="bg-accent px-6 pt-3.5 pb-3 flex justify-end gap-x-2">
          <Skeleton className="rounded-full h-10 w-28" />
          <Skeleton className="rounded-full h-10 w-28" />
        </div>
      </div>
    ),
    ssr: false,
  }
);