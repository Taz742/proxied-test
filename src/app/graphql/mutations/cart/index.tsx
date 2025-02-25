import { gql } from '@apollo/client';

export const REMOVE_CART_ITEM = gql`
  mutation RemoveItem($input: RemoveItemArgs!) {
    removeItem(input: $input) {
      _id
      items {
        _id
        quantity
        product {
          _id
          title
          cost
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateItemQuantity($input: UpdateItemQuantityArgs!) {
    updateItemQuantity(input: $input) {
      _id
      hash
      items {
        _id
        product {
          _id
          title
          cost
        }
        quantity
      }
      createdAt
      updatedAt
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($input: AddItemArgs!) {
    addItem(input: $input) {
      _id
      hash
      items {
        _id
        product {
          _id
          title
          cost
        }
        quantity
      }
      createdAt
      updatedAt
    }
  }
`;
