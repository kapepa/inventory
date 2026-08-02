"use client";

import { QueryParamProvider } from "@/shared/lib/providers/query-param-provider";
import { ModalProvider } from "@/shared/ui/modal";
import { ToasterDynamic } from "@/shared/ui/sonner-dynamic";
import { AuthenticatedUser } from "@/features/auth/model/types";
import { AuthProvider } from "@/features/auth/lib/auth-provider";
import { TooltipProvider } from "@/shared/lib/providers/tooltip-provider";

export function ProvidersUIClient({ children }: { children: React.ReactNode }) {
  return (
    <QueryParamProvider>
      <TooltipProvider>
        <ModalProvider>
          {children}
          <ToasterDynamic />
        </ModalProvider>
      </TooltipProvider>
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