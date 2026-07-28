"use client";

import React from "react";
import { ModalProvider, TooltipProvider, QueryParamProvider, ToasterDynamic } from "@/shared";
import { AuthProvider, AuthenticatedUser } from "@/features";

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