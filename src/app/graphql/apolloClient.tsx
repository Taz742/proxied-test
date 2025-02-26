import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: 'https://take-home-be.onrender.com/api',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://take-home-be.onrender.com/api',
    connectionParams: () => {
      const token = localStorage.getItem('token');

      return {
        authToken: token,
      };
    },
  }),
);

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
