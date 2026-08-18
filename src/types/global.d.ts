import { ProductAddedEvent, ProductDeletedEvent } from '@/shared/lib/events/product-events';
import { Server } from 'socket.io';

declare global {
  var io: Server | undefined;
  interface WindowEventMap {
    'parish:product-added': CustomEvent<ProductAddedEvent>;
    'parish:product-deleted': CustomEvent<ProductDeletedEvent>;
  }
}

export { };