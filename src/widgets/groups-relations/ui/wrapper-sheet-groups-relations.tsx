"use client"

import { useActiveParishId, Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose, ModalCancelButton, useMediaQuery } from "@/shared";
import { GroupsRelations } from "./groups-relations";
import { ProductWithRelationsShort } from "@/entities/products";
import { memo } from "react";
import { useTranslations } from "next-intl";

interface WrapperSheetGroupsRelationsProps {
  initialHasMore?: boolean;
  initialProducts?: ProductWithRelationsShort[];
  initialParishesId: string | null;
  initialParishTitle: string;
}

export const WrapperSheetGroupsRelations = memo((props: WrapperSheetGroupsRelationsProps) => {
  const t = useTranslations('groups.wrapper-sheet-groups-relations');
  const [activeParishId, setActiveParishId] = useActiveParishId(props.initialParishesId);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) return null

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
            <ModalCancelButton>{t("close")}</ModalCancelButton>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
);

WrapperSheetGroupsRelations.displayName = "WrapperSheetGroupsRelations"