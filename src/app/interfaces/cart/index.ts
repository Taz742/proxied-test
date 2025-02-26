import { IProduct } from '../product';

export interface ICartItem {
  _id: string;
  cartId: string;
  product: IProduct;
  quantity: number;
  updatedAt: string;
  addedAt: string;
}

export interface ICart {
  _id: string;
  hash: string;
  items: ICartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface IUpdatedCart {
  _id: string;
  quantity: number;
  product: {
    _id: string;
    title: string;
  };
}

export interface ICartSubscriptionResponse {
  cartItemUpdate: {
    event: 'ITEM_QUANTITY_UPDATED' | 'ITEM_OUT_OF_STOCK';
    payload: IUpdatedCart;
  };
}
