"use client"

import { GroupsRelations } from "./groups-relations";
import { useTranslations } from "next-intl";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/shared/ui/sheet";
import { ProductWithRelationsShort } from "@/entities/product/model/types";
import { CancelButton } from "@/shared/ui/action-buttons";
import { useRouter } from "@/shared/lib/i18n/routing";
import { useCallback } from "react";
import { ROUTES } from "@/shared/constants/routes";

interface WrapperSheetGroupsRelationsProps {
  isAdmin: boolean,
  initialHasMore?: boolean;
  initialProducts?: ProductWithRelationsShort[];
  initialParishesId: string | null;
  initialParishTitle: string;
}

export const WrapperSheetGroupsRelations = (props: WrapperSheetGroupsRelationsProps) => {
  const t = useTranslations('groups.wrapper-sheet-groups-relations');
  const router = useRouter()

  const handleClose = useCallback(() => {
    router.push(ROUTES.GROUPS)
  }, [router])

  return (
    <Sheet
      open={true}
      onOpenChange={handleClose}
    >
      <SheetHeader className="sr-only">
        <SheetTitle>{props.initialParishTitle}</SheetTitle>
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


WrapperSheetGroupsRelations.displayName = "WrapperSheetGroupsRelations"