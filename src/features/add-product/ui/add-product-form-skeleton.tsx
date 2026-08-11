import { TranslationFieldsSkeleton } from "./bricks/translation-fields-skeleton"
import { SerialNumberFieldSkeleton } from "./bricks/serial-number-field-skeleton"
import { OrderFieldSkeleton } from "./bricks/order-field-skeleton"
import { StatusFieldSkeleton } from "./bricks/status-field-skeleton"
import { ConditionFieldSkeleton } from "./bricks/condition-field-skeleton"
import { CategoryFieldSkeleton } from "./bricks/category-field-skeleton"
import { PhotoFieldSkeleton } from "./bricks/photo-field-skeleton"
import { PriceFieldsSkeleton } from "./bricks/price-fields-skeleton"
import { OverlayBody } from "@/shared/ui/overlay-body"
import { Skeleton } from "@/shared/ui/skeleton"
import { FooterBar } from "@/shared/ui/footer-bar"

export const AddProductFormSkeleton = () => {
  return (
    <>
      <div className="h-full flex-1 min-h-0 overflow-hidden">
        <OverlayBody>
          <div className="flex flex-col gap-y-6 pb-5">
            <Skeleton className="h-8 w-full" />
            <div className="flex flex-col w-full mt-2 mb-8.5 gap-6 md:gap-7">
              <TranslationFieldsSkeleton />
              <SerialNumberFieldSkeleton />
              <OrderFieldSkeleton />
              <div className='grid grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-5'>
                <StatusFieldSkeleton />
                <ConditionFieldSkeleton />
                <CategoryFieldSkeleton />
              </div>
              <PhotoFieldSkeleton />
              <PriceFieldsSkeleton />
            </div>
          </div>
        </OverlayBody>
      </div>
      <FooterBar>
        <Skeleton className="h-11 w-full rounded-full" />
        <Skeleton className="h-11 w-full rounded-full" />
      </FooterBar>
    </>
  )
}

AddProductFormSkeleton.displayName = "AddProductFormSkeleton"