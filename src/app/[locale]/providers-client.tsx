"use client";

import React from "react";
import { QueryParamProvider } from "@/shared/lib/providers/query-param-provider";
import { ModalProvider } from "@/shared/ui/modal";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { ToasterDynamic } from "@/shared/ui/sonner-dynamic";
import { AuthenticatedUser } from "@/features/auth/model/types";
import { AuthProvider } from "@/features/auth/lib/auth-provider";

export function ProvidersUIClient({ children }: { children: React.ReactNode }) {
  return (
    <QueryParamProvider>
      <ModalProvider>
        <TooltipProvider>
          {children}
          <ToasterDynamic />
        </TooltipProvider>
      </ModalProvider>
    </QueryParamProvider >
  );
}

export function ProvidersAuthClient({ children, initialUser }: { children: React.ReactNode; initialUser: AuthenticatedUser | null }) {
  return (
    <AuthProvider initialUser={initialUser}>
      {children}
    </AuthProvider>
  );
}