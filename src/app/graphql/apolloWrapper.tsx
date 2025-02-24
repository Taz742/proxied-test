'use client'; // This makes it a Client Component

import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
