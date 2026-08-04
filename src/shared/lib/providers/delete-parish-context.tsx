"use client"
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { ParishWithRelationsTotals } from "@/entities/parish/model/types";
import { DeleteParishDynamic } from "@/features/delete-resource/model/hooks/delete-dynamic";

interface DeleteParishContextValue {
  confirmDelete: (parish: ParishWithRelationsTotals, onSuccess: () => void) => void;
}

const DeleteParishContext = createContext<DeleteParishContextValue | null>(null);

export const DeleteParishProvider = ({ children }: { children: ReactNode }) => {
  const [deleteTarget, setDeleteTarget] = useState<{
    parish: ParishWithRelationsTotals;
    onSuccess: () => void;
  } | null>(null);

  const confirmDelete = useCallback((parish: ParishWithRelationsTotals, onSuccess: () => void) => {
    setDeleteTarget({ parish, onSuccess });
  }, []);

  return (
    <DeleteParishContext.Provider value={{ confirmDelete }}>
      {children}

      {/* Dynamically Loaded Removal Component */}
      {deleteTarget && (
        <DeleteParishDynamic
          parish={deleteTarget.parish}
          onSuccess={() => {
            deleteTarget.onSuccess();
            setDeleteTarget(null);
          }}
        />
      )}
    </DeleteParishContext.Provider>
  );
};

export const useDeleteParishContext = () => {
  const context = useContext(DeleteParishContext);
  if (!context) {
    throw new Error("useDeleteParishContext must be used within DeleteParishProvider");
  }
  return context;
};
