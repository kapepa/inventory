"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { ProductWithRelations } from "@/entities/product/model/types";
import { DeleteProductDynamic } from "@/features/delete-resource/model/hooks/delete-dynamic";

interface DeleteProductContextValue {
  confirmProductDelete: (parish: ProductWithRelations, onSuccess: () => void) => void;
}

const DeleteProductContext = createContext<DeleteProductContextValue | null>(null);

export const DeleteProductProvider = ({ children }: { children: ReactNode }) => {
  const [deleteTarget, setDeleteTarget] = useState<{
    product: ProductWithRelations;
    onSuccess: () => void;
  } | null>(null);

  const confirmProductDelete = useCallback((product: ProductWithRelations, onSuccess: () => void) => {
    setDeleteTarget({ product, onSuccess });
  }, []);

  return (
    <DeleteProductContext.Provider value={{ confirmProductDelete }}>
      {children}

      {/* Dynamically Loaded Removal Component */}
      {deleteTarget && (
        <DeleteProductDynamic
          product={deleteTarget.product}
          onSuccess={() => {
            deleteTarget.onSuccess();
            setDeleteTarget(null);
          }}
        />
      )}
    </DeleteProductContext.Provider>
  );
};

export const useDeleteProductContext = () => {
  const context = useContext(DeleteProductContext);
  if (!context) {
    throw new Error("useDeleteProductContext must be used within DeleteProductProvider");
  }
  return context;
};