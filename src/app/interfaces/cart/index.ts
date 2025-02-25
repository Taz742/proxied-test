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
