"use client"

import { CancelButton } from "@/shared/ui";
import { GroupsRelations } from "./groups-relations";
import { memo } from "react";
import { useTranslations } from "next-intl";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/shared/ui/sheet";
import { useActiveParishId } from "@/shared/lib/hooks/use-active-parish-id";
import { useMediaQuery } from "@/shared/lib/hooks";
import { ProductWithRelationsShort } from "@/entities/product/model/types";

interface WrapperSheetGroupsRelationsProps {
  isAdmin: boolean,
  initialHasMore?: boolean;
  initialProducts?: ProductWithRelationsShort[];
  initialParishesId: string | null;
  initialParishTitle: string;
}

export const WrapperSheetGroupsRelations = memo((props: WrapperSheetGroupsRelationsProps) => {
  const t = useTranslations('groups.wrapper-sheet-groups-relations');
  const [activeParishId, setActiveParishId] = useActiveParishId(props.initialParishesId);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop || isDesktop === undefined) return null

  return (
    <Sheet
      open={!!activeParishId}
      onOpenChange={(open) => !open && setActiveParishId("")}
    >
      <SheetHeader className="sr-only">
        <SheetTitle>{activeParishId}</SheetTitle>
      </SheetHeader>
      <SheetContent
        side="right"
        className="w-[90%] sm:max-w-135 p-0 border-none"
        showCloseButton={false}
      >
        <GroupsRelations {...props} className="h-full" />
        <SheetFooter className="bg-accent">
          <SheetClose asChild>
            <CancelButton>{t("close")}</CancelButton>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
);

WrapperSheetGroupsRelations.displayName = "WrapperSheetGroupsRelations"