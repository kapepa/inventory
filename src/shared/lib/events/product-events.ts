export const PRODUCT_EVENTS = {
  PRODUCT_ADDED: 'parish:product-added',
  PRODUCT_DELETED: 'parish:product-deleted',
} as const;

export interface ProductAddedEvent {
  parishId: string;
  productId?: string;
}

export interface ProductDeletedEvent {
  parishId: string;
  productId: string;
}

export const emitProductAdded = ({ parishId, productId }: ProductAddedEvent) => {
  window.dispatchEvent(new CustomEvent<ProductAddedEvent>(
    PRODUCT_EVENTS.PRODUCT_ADDED,
    { detail: { parishId, productId } }
  ));
};

export const emitProductDeleted = ({ parishId, productId }: ProductDeletedEvent) => {
  window.dispatchEvent(new CustomEvent<ProductDeletedEvent>(
    PRODUCT_EVENTS.PRODUCT_DELETED,
    { detail: { parishId, productId } }
  ));
};