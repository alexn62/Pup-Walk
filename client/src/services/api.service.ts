import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});
export const getJob = gql`
  query getJob($getJobId: String!) {
    getJob(id: $getJobId) {
      id
      title
      details
      hourlyPay
      duration
      city
      locality
      startTime
      user {
        id
        firstName
        middleName
        lastName
      }
      dog {
        name
        breed
        age
      }
    }
  }
`;
