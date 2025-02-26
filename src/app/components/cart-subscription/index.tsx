import React from 'react';
import { useSubscription } from '@apollo/client';

import { CART_ITEM_UPDATE } from '@/app/graphql/subscriptions/cart';

import { useModal } from '@/app/hooks/useModal';
import Modal from '../modal';
import { ICartSubscriptionResponse, IUpdatedCart } from '@/app/interfaces/cart';
import { CartSubscriptionModalContent } from './inform-content';
import client from '@/app/graphql/apolloClient';

interface IUpdatedCartModal {
  itemsOutOfStock: IUpdatedCart[];
  itemsWithUpdatedQuantity: IUpdatedCart[];
}

const updateCartModalDefaultState = {
  itemsOutOfStock: [],
  itemsWithUpdatedQuantity: [],
};

const CartSubscription = () => {
  const { isOpen, item, openModal, closeModal } = useModal<IUpdatedCartModal>(
    false,
    updateCartModalDefaultState,
  );

  useSubscription<ICartSubscriptionResponse>(CART_ITEM_UPDATE, {
    onData: ({ data }) => {
      if (!data?.data) return;

      const { event, payload } = data.data.cartItemUpdate;

      if (event === 'ITEM_QUANTITY_UPDATED') {
        openModal({
          itemsOutOfStock: item?.itemsOutOfStock || [],
          itemsWithUpdatedQuantity: [
            ...(item!.itemsWithUpdatedQuantity || []),
            payload,
          ],
        });
      } else if (event === 'ITEM_OUT_OF_STOCK') {
        openModal({
          itemsOutOfStock: [...(item!.itemsOutOfStock || []), payload],
          itemsWithUpdatedQuantity: item!.itemsWithUpdatedQuantity || [],
        });

        client.cache.modify({
          id: client.cache.identify(payload as any),
          fields: {
            cart(existingCartItems = [], { readField }) {
              console.log({ existingCartItems });
              return existingCartItems.filter(
                (cartItem: any) => readField('_id', cartItem) !== payload._id,
              );
            },
          },
        });
      }
    },
  });

  const handleCloseModal = () => closeModal(updateCartModalDefaultState);

  return (
    <>
      {isOpen && (
        <Modal onClose={handleCloseModal}>
          <CartSubscriptionModalContent
            itemsOutOfStock={item?.itemsOutOfStock || []}
            itemsWithUpdatedQuantity={item?.itemsWithUpdatedQuantity || []}
            onConfirm={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

export default CartSubscription;
