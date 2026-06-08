export interface GetConditionDisplay {
  labelKey: string
  colorClass: string
  bgClass: string
}

type ProductCondition = "OLD" | "NEW"

export const PRODUCT_CONDITION_DISPLAY: Record<ProductCondition, GetConditionDisplay> = {
  OLD: {
    labelKey: "old",
    colorClass: "text-warning",
    bgClass: "bg-warning"
  },
  NEW: {
    labelKey: "new",
    colorClass: "text-accent",
    bgClass: "bg-accent"
  },
}