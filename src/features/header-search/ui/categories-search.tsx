"use client";

import { QUERY_PARAMS_KEYS } from "@/shared";
import { memo } from "react";
import { GenericSearchInput, GenericSearchResponsive } from "./generic-search";
import { useGenericSearch } from "../hooks";
import { useTranslations } from "next-intl";

interface CategoriesSearchProps {
  className?: string
}

export const CategoriesSearch = memo(({ className }: CategoriesSearchProps) => {
  const t = useTranslations('header-search.categories-search');
  const tPlaceholder = t("placeholder")
  const { openGenericSearch } = useGenericSearch({
    modalName: QUERY_PARAMS_KEYS.CATEGORIES_SEARCH,
    placeholder: tPlaceholder
  })

  return (
    <GenericSearchResponsive
      className={className}
      openSearch={openGenericSearch}
    >
      <GenericSearchInput
        queryKey={QUERY_PARAMS_KEYS.CATEGORIES_SEARCH}
        className="w-xs"
        placeholder={tPlaceholder}
      />
    </GenericSearchResponsive>
  );
}
)

CategoriesSearch.displayName = "CategoriesSearch"