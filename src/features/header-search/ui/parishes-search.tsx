"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { QUERY_PARAMS_KEYS } from "@/shared/constants";
import { GenericSearchInput, GenericSearchResponsive } from "./generic-search";
import { useGenericSearch } from "../hooks/use-generic-search";

interface ParishesSearchProps {
  className?: string
}

export const ParishesSearch = memo(({ className }: ParishesSearchProps) => {
  const t = useTranslations('header-search.parishes-search');
  const tPlaceholder = t("placeholder")
  const { openGenericSearch } = useGenericSearch({
    modalName: QUERY_PARAMS_KEYS.PARISHES_SEARCH,
    placeholder: tPlaceholder
  })

  return (
    <GenericSearchResponsive
      className={className}
      openSearch={openGenericSearch}
    >
      <GenericSearchInput
        queryKey={QUERY_PARAMS_KEYS.PARISHES_SEARCH}
        className="w-xs"
        placeholder={tPlaceholder}
      />
    </GenericSearchResponsive>
  );
}
)

ParishesSearch.displayName = "ParishesSearch"