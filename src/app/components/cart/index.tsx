import { useCart } from '@/app/context/cart';
import CartList from '../carts-list';
import { useMemo } from 'react';

export const Cart = () => {
  const { cart } = useCart();

  const totalPrice = useMemo(() => {
    return cart!.items
      .map((cartItem) => cartItem.product.cost * cartItem.quantity)
      .reduce((cur, next) => cur + next, 0);
  }, [cart?.items]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <CartList />
      {cart!.items.length > 0 && (
        <p className="text-black mt-2">Total Price: ${totalPrice.toFixed(2)}</p>
      )}
    </div>
  );
};
