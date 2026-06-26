"use client";

import { Button, cn } from "@/shared";
import { Search } from "lucide-react";
import { ProductsInput } from "./products-input";
import { memo } from "react";
import { useProductsSearch } from "../hooks";

interface ProductsSearchProps {
  className?: string
}

export const ProductsSearch = memo(
  (props: ProductsSearchProps) => {
    const { openProductsSearch } = useProductsSearch()

    return (
      <>
        <div className={cn("hidden lg:flex items-center grow", props.className)}>
          <ProductsInput
            className="w-xs"
          />
        </div>
        <div className="flex lg:hidden items-center justify-end md:justify-center grow">
          <Button variant="link" className="rounded-s-sm cursor-pointer" onClick={openProductsSearch}>
            <Search className="size-7 sm:size-9 text-accent" />
          </Button>
        </div>
      </>
    );
  }
)

ProductsSearch.displayName = "ProductsSearch"