const { gql } = require('apollo-server');

const typedefinitions = gql`
  type Query {
    getAllUsers: [User!]!
  }
  type Mutation {
    addUser(email: String!, firstName: String!, lastName: String!, middleName: String): User
  }

  type User {
    id: ID!
    email: String!
    profilePhoto: String
    accountCreated: String!
    firstName: String!
    middleName: String
    lastName: String!
    sex: String
    dogs: [Dog]
  }

  type Dog {
    id: ID!
    name: String!
    breed: String!
    age: Int!
    description: String!
    owner: User!
  }

  type NewPost {
    id: ID!
    user: User!
    dog: Dog!
    details: String
    location: Location!
    duration: Int!
    hourlyPay: Int!
  }

  type Location {
    longitude: Float!
    latitude: Float!
    primaryLabel: String!
    secondaryLabel: String
  }
`;
export = typedefinitions;
