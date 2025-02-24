import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://take-home-be.onrender.com/api', // Your GraphQL API endpoint
  cache: new InMemoryCache(),
});

export default client;
