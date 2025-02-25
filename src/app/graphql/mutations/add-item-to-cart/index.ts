import { gql } from '@apollo/client';

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
