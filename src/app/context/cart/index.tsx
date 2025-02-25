'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { GET_CART } from '@/app/graphql/queries/get-cart';
import { ICart } from '@/app/interfaces/cart';

const CartContext = createContext<{
  cart: ICart | null;
  refetchCart: () => void;
}>({
  cart: null,
  refetchCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, loading, refetch } = useQuery(GET_CART);

  const value = useMemo(() => {
    return {
      cart: data?.getCart || null,
      refetchCart: refetch,
    };
  }, [data?.getCart, refetch]);

  return (
    <CartContext.Provider value={value}>
      {loading ? 'Wating cart response...' : children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
