'use client';

import { memo } from 'react';

import { gql, useMutation } from '@apollo/client';
import { IRegisterResponse } from '@/app/interfaces/visitor';

const REGISTER_MUTATION = gql`
  mutation Register {
    register {
      _id
      token
      cartId
      isActive
      createdAt
      updatedAt
    }
  }
`;

interface IProps {
  onRegistered: (data: any) => void;
}

export const StartApp: React.FC<IProps> = memo(({ onRegistered }) => {
  const [register, { loading }] = useMutation<IRegisterResponse>(REGISTER_MUTATION);

  const handleRegister = async () => {
    const response = await register();
    onRegistered(response.data!.register);
  };

  return (
    <div>
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
});
