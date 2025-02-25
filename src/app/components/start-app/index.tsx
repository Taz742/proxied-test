'use client';

import { memo } from 'react';

import { useMutation } from '@apollo/client';

import { IRegisterResponse } from '@/app/interfaces/visitor';

import { REGISTER_MUTATION } from '@/app/graphql/mutations/register/gql';

interface IProps {
  onRegistered: (data: any) => void;
}

export const StartApp: React.FC<IProps> = memo(({ onRegistered }) => {
  const [register, { loading }] =
    useMutation<IRegisterResponse>(REGISTER_MUTATION);

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
