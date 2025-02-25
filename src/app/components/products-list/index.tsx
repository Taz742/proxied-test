import { IProduct } from '@/app/interfaces/product';

import ProductCard from '../product-card';
import { memo } from 'react';

interface IProps {
  products: IProduct[];
}

export const ProductsList: React.FC<IProps> = memo(({ products }) => {
  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
});
