"use client";

import { useTranslations } from "next-intl";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { GenericSearchInput, GenericSearchResponsive } from "./generic-search";
import { useGenericSearch } from "../hooks/use-generic-search";

const SEARCH_QUERY_KEYS = {
  parishes: QUERY_PARAMS_KEYS.PARISHES_SEARCH,
  groups: QUERY_PARAMS_KEYS.PARISHES_GROUPS_SEARCH,
} as const;

interface ParishesSearchProps {
  className?: string,
  searchType?: keyof typeof SEARCH_QUERY_KEYS;
}

export const ParishesSearch = ({ searchType = "parishes", className }: ParishesSearchProps) => {
  const t = useTranslations('header-search.parishes-search');
  const tPlaceholder = t("placeholder")
  const { openGenericSearch } = useGenericSearch({
    modalName: SEARCH_QUERY_KEYS[searchType],
    placeholder: tPlaceholder
  })

  return (
    <GenericSearchResponsive
      className={className}
      openSearch={openGenericSearch}
    >
      <GenericSearchInput
        queryKey={SEARCH_QUERY_KEYS[searchType]}
        className="w-xs"
        placeholder={tPlaceholder}
      />
    </GenericSearchResponsive>
  );
}


ParishesSearch.displayName = "ParishesSearch"