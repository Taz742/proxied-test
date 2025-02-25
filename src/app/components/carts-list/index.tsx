import React from 'react';

import { useCart } from '@/app/context/cart';
import { CartCard } from '../cart-card';

const CartList = () => {
  const { cart } = useCart();

  const cartItems = cart!.items;

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-black">Your Cart</h2>
      {cartItems.length ? (
        cartItems.map((item) => <CartCard key={item._id} cartItem={item} />)
      ) : (
        <p className='text-center text-lg text-black'>Your cart is empty.</p>
      )}
    </>
  );
};

export default CartList;
