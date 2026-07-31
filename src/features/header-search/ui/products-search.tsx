"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { QUERY_PARAMS_KEYS } from "@/shared/constants";
import { GenericSearchInput, GenericSearchResponsive } from "./generic-search";
import { useGenericSearch } from "../hooks/use-generic-search";

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