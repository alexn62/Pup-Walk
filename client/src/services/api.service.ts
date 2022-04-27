import { ApolloClient, InMemoryCache } from '@apollo/client';
import * as userQueries from './queries/UserQueries';
export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export const getUserByEmailAddress = async (email: string) => {
  try {
    const response = await client.query({ query: userQueries.getUserByEmail, variables: { email } });
    return response.data.getUserByEmail;
  } catch (e) {
    return null;
  }
};
