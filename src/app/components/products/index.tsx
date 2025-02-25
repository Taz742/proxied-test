import { memo } from 'react';
import { useQuery } from '@apollo/client';

import { GET_PRODUCTS } from '@/app/graphql/queries/get-products';

import { ProductsList } from '../products-list';

export const Products = memo(() => {
  const { data, loading } = useQuery(GET_PRODUCTS);

  return (
    <>
      {loading ? (
        'Waiting products...'
      ) : (
        <ProductsList products={data?.getProducts.products || []} />
      )}
    </>
  );
});
