"use client";

import { QUERY_PARAMS_KEYS } from "@/shared";
import { memo } from "react";
import { GenericSearchInput, GenericSearchResponsive } from "./generic-search";
import { useGenericSearch } from "../hooks";
import { useTranslations } from "next-intl";

interface ProductsSearchProps {
  className?: string
}

export const ProductsSearch = memo(({ className }: ProductsSearchProps) => {
  const t = useTranslations('header-search.products-search');
  const tPlaceholder = t("placeholder")
  const { openGenericSearch } = useGenericSearch({
    modalName: QUERY_PARAMS_KEYS.PRODUCTS_SEARCH,
    placeholder: tPlaceholder
  })

  return (
    <GenericSearchResponsive
      className={className}
      openSearch={openGenericSearch}
    >
      <GenericSearchInput
        queryKey={QUERY_PARAMS_KEYS.PRODUCTS_SEARCH}
        className="w-xs"
        placeholder={tPlaceholder}
      />
    </GenericSearchResponsive>
  );
}
)

ProductsSearch.displayName = "ProductsSearch"