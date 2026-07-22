"use client";

import { QUERY_PARAMS_KEYS } from "@/shared";
import { memo } from "react";
import { GenericSearchInput, GenericSearchResponsive } from "./generic-search";
import { useGenericSearch } from "../hooks";
import { useTranslations } from "next-intl";

interface UsersSearchProps {
  className?: string
}

export const UsersSearch = memo(({ className }: UsersSearchProps) => {
  const t = useTranslations('header-search.users-search');
  const tPlaceholder = t("placeholder")
  const { openGenericSearch } = useGenericSearch({
    modalName: QUERY_PARAMS_KEYS.USERS_SEARCH,
    placeholder: tPlaceholder
  })

  return (
    <GenericSearchResponsive
      className={className}
      openSearch={openGenericSearch}
    >
      <GenericSearchInput
        queryKey={QUERY_PARAMS_KEYS.USERS_SEARCH}
        className="w-xs"
        placeholder={tPlaceholder}
      />
    </GenericSearchResponsive>
  );
}
)

UsersSearch.displayName = "UsersSearch"