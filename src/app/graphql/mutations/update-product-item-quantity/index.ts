import { gql } from '@apollo/client';

export const UPDATE_ITEM_QUANTITY = gql`
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
