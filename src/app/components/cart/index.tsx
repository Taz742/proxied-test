import { useMemo } from 'react';

import { useCart } from '@/app/context/cart';

import CartList from '../carts-list';
import CartSubscription from '../cart-subscription';

export const Cart = () => {
  const { cart } = useCart();

  const totalPrice = useMemo(() => {
    return cart!.items
      .map((cartItem) => cartItem.product.cost * cartItem.quantity)
      .reduce((cur, next) => cur + next, 0);
  }, [cart?.items]);

  return (
    <div className="p-4 mx-4 my-8 bg-white rounded-lg shadow-md">
      <CartList />
      {cart!.items.length > 0 && (
        <p className="text-black mt-2">Total Price: ${totalPrice.toFixed(2)}</p>
      )}
      <CartSubscription />
    </div>
  );
};
