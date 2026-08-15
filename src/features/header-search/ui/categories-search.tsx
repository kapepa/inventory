"use client";

import { useTranslations } from "next-intl";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { GenericSearchInput, GenericSearchResponsive } from "./generic-search";
import { useGenericSearch } from "../hooks/use-generic-search";

interface CategoriesSearchProps {
  className?: string
}

export const CategoriesSearch = ({ className }: CategoriesSearchProps) => {
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
      searchLabel={tPlaceholder}
    >
      <GenericSearchInput
        queryKey={QUERY_PARAMS_KEYS.CATEGORIES_SEARCH}
        className="w-xs"
        placeholder={tPlaceholder}
      />
    </GenericSearchResponsive>
  );
}

CategoriesSearch.displayName = "CategoriesSearch"