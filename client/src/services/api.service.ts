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

export const addJob = gql`
  mutation addJob(
    $user: ID!
    $dog: ID!
    $title: String!
    $details: String!
    $latitude: Float!
    $longitude: Float!
    $duration: Int!
    $hourlyPay: Int!
    $startTime: String!
    $status: String!
  ) {
    addJob(
      user: $user
      dog: $dog
      title: $title
      details: $details
      latitude: $latitude
      longitude: $longitude
      duration: $duration
      hourlyPay: $hourlyPay
      startTime: $startTime
      status: $status
    ) {
      id
    }
  }
`;
