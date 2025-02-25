import { GET_PRODUCTS } from '@/app/graphql/queries/get-products';
import { ProductsList } from '../products-list';

import { useQuery } from '@apollo/client';
import { memo } from 'react';

export const Products = memo(() => {
  const { data, loading } = useQuery(GET_PRODUCTS);

  if (loading) {
    return <>Waiting products...</>;
  }

  const products = data?.getProducts.products || [];

  return (
    <>
      <ProductsList products={products} />
    </>
  );
});
