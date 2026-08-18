import { ParishWithRelations } from "@/entities/parish/model/types";
import { PRODUCT_EVENTS, ProductAddedEvent, ProductDeletedEvent } from "@/shared/lib/events/product-events";
import { useEffect } from "react";

interface UseParishProductEventsProps {
  setParishes: React.Dispatch<React.SetStateAction<ParishWithRelations[]>>;
}

export const useParishProductEvents = ({ setParishes }: UseParishProductEventsProps) => {
  useEffect(() => {
    const handleProductAdded = (e: CustomEvent<ProductAddedEvent>) => {
      const parishId = e.detail.parishId;

      setParishes(prev => {
        const index = prev.findIndex(p => p.id === parishId);
        if (index === -1) return prev;
        const newParishes = [...prev];
        const parish = newParishes[index];

        newParishes[index] = {
          ...parish,
          _count: {
            ...parish._count,
            products: parish._count.products + 1
          }
        };

        return newParishes;
      });
    };

    const handleProductDeleted = (e: CustomEvent<ProductDeletedEvent>) => {
      const parishId = e.detail.parishId;

      setParishes(prev => {
        const index = prev.findIndex(p => p.id === parishId);
        if (index === -1) return prev;
        const newParishes = [...prev];
        const parish = newParishes[index];

        newParishes[index] = {
          ...parish,
          _count: {
            products: parish._count.products - 1
          }
        };

        return newParishes;
      });
    };

    window.addEventListener(PRODUCT_EVENTS.PRODUCT_ADDED, handleProductAdded)
    window.addEventListener(PRODUCT_EVENTS.PRODUCT_DELETED, handleProductDeleted)

    return () => {
      window.removeEventListener(PRODUCT_EVENTS.PRODUCT_ADDED, handleProductAdded)
      window.removeEventListener(PRODUCT_EVENTS.PRODUCT_DELETED, handleProductDeleted)
    }
  }, [setParishes])

};