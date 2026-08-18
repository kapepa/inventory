export type StoreType = 'parishes' | 'products' | 'categories' | 'users';

export interface CountTotalStore {
  fallbackCount: number;
  className?: string
}