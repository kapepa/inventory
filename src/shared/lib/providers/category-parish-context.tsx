"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CategoryWithProductCount } from "@/entities/category/model/types";
import { DeleteCategoryDynamic } from "@/features/delete-resource/model/hooks/delete-dynamic";

interface DeleteCategoryContextValue {
  confirmCategoryDelete: (category: CategoryWithProductCount, onSuccess: () => void) => void;
}

const DeleteCategoryContext = createContext<DeleteCategoryContextValue | null>(null);

export const DeleteCategoryProvider = ({ children }: { children: ReactNode }) => {
  const [deleteTarget, setDeleteTarget] = useState<{
    category: CategoryWithProductCount;
    onSuccess: () => void;
  } | null>(null);

  const confirmCategoryDelete = useCallback((category: CategoryWithProductCount, onSuccess: () => void) => {
    setDeleteTarget({ category, onSuccess });
  }, []);

  return (
    <DeleteCategoryContext.Provider value={{ confirmCategoryDelete }}>
      {children}

      {/* Dynamically Loaded Removal Component */}
      {deleteTarget && (
        <DeleteCategoryDynamic
          category={deleteTarget.category}
          onSuccess={() => {
            deleteTarget.onSuccess();
            setDeleteTarget(null);
          }}
        />
      )}
    </DeleteCategoryContext.Provider>
  );
};

export const useDeleteCategoryContext = () => {
  const context = useContext(DeleteCategoryContext);
  if (!context) {
    throw new Error("useDeleteCategoryContext must be used within DeleteCategoryProvider");
  }
  return context;
};
