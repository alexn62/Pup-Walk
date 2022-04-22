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

export const getUser = gql`
  query getUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      firstName
      lastName
      profilePhoto
      dogs {
        id
        name
        breed
        dogPhoto
        age
      }
      jobs {
        title
      }
    }
  }
`;

export const getUserByEmail = gql`
  query getUser($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      profilePhoto
      firstName
      lastName
      dogs {
        id
        name
        dogPhoto
        breed
      }
      jobs {
        id
        title
      }
    }
  }
`;

export const getJobsNearby = gql`
  query getJobsCloseBy($maxDistance: Float!, $startingPoint: [Float!]) {
    getJobsCloseBy(maxDistance: $maxDistance, startingPoint: $startingPoint) {
      id
      title
      details
      hourlyPay
      duration
      startTime
      locality
      city
      jobLocation {
        coordinates
      }
      user {
        id
        firstName
        lastName
        profilePhoto
      }
      dog {
        id
        name
        breed
        age
        dogPhoto
      }
    }
  }
`;

export const getUserByEmailAddress = async (email: string) => {
  const response = await client.query({ query: getUserByEmail, variables: { email: email } });

  return response.data.getUserByEmail;
};
