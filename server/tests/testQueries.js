const { gql } = require('apollo-server');

const addUser = gql`
  mutation Mutation($email: String!, $firstName: String!, $lastName: String!, $middleName: String, $sex: String) {
    addUser(email: $email, firstName: $firstName, lastName: $lastName, middleName: $middleName, sex: $sex) {
      id
      email
      lastName
      firstName
      middleName
      sex
    }
  }
`;

const getUser = gql`
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      firstName
      middleName
      lastName
      email
      sex
    }
  }
`;
const getUserWithDogs = gql`
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      firstName
      middleName
      lastName
      email
      sex
      dogs {
        name
      }
    }
  }
`;

const addDog = gql`
  mutation Mutation($owner: ID!, $name: String!, $sex: String!, $age: Int!, $breed: String!, $description: String!) {
    addDog(owner: $owner, name: $name, sex: $sex, age: $age, breed: $breed, description: $description) {
      id
      name
      breed
      age
      sex
      description
    }
  }
`;

const getDog = gql`
  query GetDog($getDogId: String!) {
    getDog(id: $getDogId) {
      id
      name
      breed
      description
      age
      sex
    }
  }
`;

const getDogWithOwner = gql`
  query GetDog($getDogId: String!) {
    getDog(id: $getDogId) {
      id
      name
      breed
      description
      age
      sex
      owner {
        firstName
      }
    }
  }
`;

const addJob = gql`
  mutation Mutation(
    $user: String!
    $dog: String!
    $details: String!
    $latitude: Int!
    $longitude: Int!
    $duration: Int!
    $hourlyPay: Int!
    $startTime: String!
    $status: String!
  ) {
    addJob(
      user: $user
      dog: $dog
      details: $details
      latitude: $latitude
      longitude: $longitude
      duration: $duration
      hourlyPay: $hourlyPay
      startTime: $startTime
      status: $status
    ) {
      id
      details
      latitude
      longitude
      location {
        longitude
        latitude
      }
      duration
      hourlyPay
      startTime
      status
      user {
        firstName
      }
      dog {
        name
      }
    }
  }
`;
module.exports = { addUser, getUser, addDog, getDog, getUserWithDogs, getDogWithOwner, addJob };
