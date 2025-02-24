export interface IVisitor {
  _id: string;
  cartId: string;
  isActive: true;
  token: string;
  updatedAt: string;
  createdAt: string;
}

export interface IRegisterResponse {
  register: IVisitor;
}
