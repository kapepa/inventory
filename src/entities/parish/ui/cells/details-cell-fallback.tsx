import { MenuButton, MobileCellLabel } from "@/shared/ui"
import { DetailsCellProps } from "../../model/types/types";

export const DetailsCellFallback = ({ label, className, description }: DetailsCellProps) => {
  return (
    <div className={className} >
      {label && <MobileCellLabel className="block md:hidden">{label}</MobileCellLabel>}
      <MenuButton
        aria-label={description?.slice(0, 50) || "Details"}
      />
    </div>
  )
}

DetailsCellFallback.displayName = "DetailsCellFallback";