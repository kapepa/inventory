import { QueryParamProvider } from "@/shared/lib/providers/query-param-provider";
import { ModalProvider } from "@/shared/ui/modal/modal-context";
import { AuthenticatedUser } from "@/features/auth/model/types";
import { AuthProvider } from "@/features/auth/lib/auth-provider";
import { TooltipProvider } from "@/shared/lib/providers/tooltip-provider";
import { ToasterDynamic } from "@/shared/ui-dynamic/sonner-dynamic";

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