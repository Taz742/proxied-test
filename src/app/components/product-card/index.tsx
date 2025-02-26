import React, { memo, useMemo, useState } from 'react';
import { format } from 'date-fns';

import { IProduct } from '@/app/interfaces/product';

import { useCart } from '@/app/context/cart';

import { useMutation } from '@apollo/client';
import {
  ADD_ITEM_TO_CART,
  UPDATE_CART_ITEM_QUANTITY,
} from '@/app/graphql/mutations/cart';
import {
  cartAddItemSchema,
  cartUpdateItemQuantitySchema,
} from '@/app/utils/validators/product';
import { z } from 'zod';

interface IProps {
  product: IProduct;
}

const ProductCard: React.FC<IProps> = ({ product }) => {
  const { cart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
  const [updateItemToCart] = useMutation(UPDATE_CART_ITEM_QUANTITY);

  const productCartItem = useMemo(() => {
    return cart!.items.find((cartItem) => cartItem.product._id === product._id);
  }, [cart?.items, product._id]);

  const handleAddToCart = async () => {
    const dataToSend = {
      productId: product._id,
      quantity,
    };
    try {
      cartAddItemSchema.parse(dataToSend);

      await addItemToCart({
        variables: {
          input: dataToSend,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation Error:', error.errors);
      } else {
        console.error('Error adding product to cart', error);
      }
    }
  };

  const handleUpdateProductQuantity = async () => {
    const dataToSend = {
      cartItemId: productCartItem!._id,
      quantity,
    };
    try {
      await cartUpdateItemQuantitySchema.parseAsync(dataToSend);
      await updateItemToCart({
        variables: {
          input: dataToSend,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation Error:', error.errors);
      } else {
        console.error('Error adding product to cart', error);
      }
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= product.availableQuantity) {
      setQuantity(value);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
      <p className="text-sm text-gray-600">Price: ${product.cost.toFixed(2)}</p>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <p>Available: {product.availableQuantity}</p>
        <p>
          {`Created at: ${format(new Date(Number(product.createdAt)), 'dd-MM-yyyy HH:mm:ss')}`}
        </p>
      </div>

      <div className="flex space-x-2">
        <div className="mt-4 flex items-center space-x-2">
          <label className="text-sm text-gray-600">Quantity:</label>
          <input
            type="number"
            value={quantity}
            min={1}
            max={product.availableQuantity}
            onChange={handleQuantityChange}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <button
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          disabled={quantity < 1 || quantity > product.availableQuantity}
          onClick={
            productCartItem ? handleUpdateProductQuantity : handleAddToCart
          }
        >
          {productCartItem ? 'Update quantity' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default memo(ProductCard);
