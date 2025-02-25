import { format } from 'date-fns';

import { ICartItem } from '@/app/interfaces/cart';
import { useMutation } from '@apollo/client';
import {
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM_QUANTITY,
} from '@/app/graphql/mutations/cart';

interface IProps {
  cartItem: ICartItem;
}

export const CartCard: React.FC<IProps> = ({ cartItem }) => {
  const [removeItem] = useMutation(REMOVE_CART_ITEM);
  const [updateItemToCart] = useMutation(UPDATE_CART_ITEM_QUANTITY);

  const handleRemoveItem = async () => {
    try {
      await removeItem({
        variables: { input: { cartItemId: cartItem._id } },
      });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleUpdateProductQuantity = async (quantity: number) => {
    try {
      await updateItemToCart({
        variables: {
          input: {
            cartItemId: cartItem!._id,
            quantity,
          },
        },
      });
    } catch (error) {
      console.error('Error updating product to cart', error);
    }
  };

  return (
    <div
      key={cartItem._id}
      className="border-b border-gray-200 py-4 flex justify-between items-center"
    >
      <div>
        <h3 className="text-lg font-medium text-black">{`${cartItem.product.title} - $${(cartItem.product.cost * cartItem.quantity).toFixed(2)}`}</h3>
        <p className="text-sm text-gray-600">
          Price: ${cartItem.product.cost.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">Quantity: {cartItem.quantity}</p>
        <p className="text-xs text-gray-500">
          {`Added: ${format(new Date(Number(cartItem.addedAt)), 'dd-MM-yyyy HH:mm:ss')}`}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={cartItem.quantity}
          min={1}
          max={cartItem.product.availableQuantity}
          onChange={(e) => handleUpdateProductQuantity(Number(e.target.value))}
          className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={handleRemoveItem}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
