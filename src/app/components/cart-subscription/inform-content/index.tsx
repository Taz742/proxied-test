import { IUpdatedCart } from '@/app/interfaces/cart';
import React from 'react';

interface IProps {
  itemsOutOfStock: IUpdatedCart[];
  itemsWithUpdatedQuantity: IUpdatedCart[];
  onConfirm: () => void;
}

export const CartSubscriptionModalContent: React.FC<IProps> = ({
  itemsWithUpdatedQuantity,
  itemsOutOfStock,
  onConfirm,
}) => {
  return (
    <>
      {!!itemsWithUpdatedQuantity.length && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-blue-600 mb-2">
            Updated Quantities
          </h3>
          <ul className="space-y-2">
            {itemsWithUpdatedQuantity.map((cartItem) => (
              <li
                key={cartItem._id}
                className="p-3 bg-blue-50 rounded-lg flex justify-between items-center"
              >
                <span className="text-gray-700">{cartItem.product.title}</span>
                <span className="font-medium text-blue-600">
                  New Qty: {cartItem.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!!itemsOutOfStock?.length && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-red-600 mb-2">
            Out of Stock
          </h3>
          <ul className="space-y-2">
            {itemsOutOfStock.map((cartItem) => (
              <li
                key={cartItem._id}
                className="p-3 bg-red-50 rounded-lg flex justify-between items-center"
              >
                <span className="text-gray-700">{cartItem.product.title}</span>
                <span className="font-medium text-red-600">Unavailable</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onConfirm}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        OK
      </button>
    </>
  );
};
