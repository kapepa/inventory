import { StoreType } from "../../lib/types/types";
import { ContTotalCategoriesDynamic, ContTotalParishDynamic, ContTotalProductsDynamic, ContTotalUsersDynamic } from "./count-store/count-total-dynamic";

interface CountTotalSwitchProps {
  storeType: StoreType,
  fallbackCount: number;
  className?: string
}

export const CountTotalSwitch = ({ storeType, fallbackCount, className }: CountTotalSwitchProps) => {
  switch (storeType) {
    case 'parishes':
      return <ContTotalParishDynamic fallbackCount={fallbackCount} className={className} />;
    case 'products':
      return <ContTotalProductsDynamic fallbackCount={fallbackCount} className={className} />;
    case 'categories':
      return <ContTotalCategoriesDynamic fallbackCount={fallbackCount} className={className} />;
    case 'users':
      return <ContTotalUsersDynamic fallbackCount={fallbackCount} className={className} />
    default:
      return null;
  }
}

CountTotalSwitch.displayName = CountTotalSwitch