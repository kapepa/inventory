import { ProductStatus } from "@prisma/client"

export interface StatusDisplay {
  labelKey: string
  colorClass: string
  bgClass: string
}

export const STATUS_DISPLAY_CONFIG: Record<ProductStatus, StatusDisplay> = {
  BUSY: {
    labelKey: "status-busy",
    colorClass: "text-chart-2",
    bgClass: "bg-chart-2"
  },
  REPAIR: {
    labelKey: "status-repair",
    colorClass: "text-warning",
    bgClass: "bg-warning"
  },
  FREE: {
    labelKey: "status-free",
    colorClass: "text-accent",
    bgClass: "bg-accent"
  },
}