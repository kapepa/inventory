"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AuthenticatedUser } from "@/features/auth/model/types";
import { DeleteAccountDynamic } from "@/features/delete-resource/model/hooks/delete-dynamic";

interface DeleteAccountContextValue {
  confirmAccountDelete: (user: AuthenticatedUser, onSuccess: () => void) => void;
}

const DeleteAccountContext = createContext<DeleteAccountContextValue | null>(null);

export const DeleteAccountProvider = ({ children }: { children: ReactNode }) => {
  const [deleteTarget, setDeleteTarget] = useState<{
    user: AuthenticatedUser;
    onSuccess: () => void;
  } | null>(null);

  const confirmAccountDelete = useCallback((user: AuthenticatedUser, onSuccess: () => void) => {
    setDeleteTarget({ user, onSuccess });
  }, []);

  return (
    <DeleteAccountContext.Provider value={{ confirmAccountDelete }}>
      {children}

      {/* Dynamically Loaded Removal Component */}
      {deleteTarget && (
        <DeleteAccountDynamic
          user={deleteTarget.user}
          onSuccess={() => {
            deleteTarget.onSuccess();
            setDeleteTarget(null);
          }}
        />
      )}
    </DeleteAccountContext.Provider>
  );
};

export const useDeleteAccountContext = () => {
  const context = useContext(DeleteAccountContext);
  if (!context) {
    throw new Error("useDeleteParishContext must be used within DeleteParishProvider");
  }
  return context;
};
