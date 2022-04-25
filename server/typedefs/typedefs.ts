import { gql } from 'apollo-server';
const typedefinitions = gql`
  type Query {
    getUser(id: String!): User
    getDog(id: String!): Dog
    getJob(id: String!): Job
    getJobsCloseBy(startingPoint: [Float!], maxDistance: Float!): [Job]
    getUserByEmail(email: String!): User
  }

  type Mutation {
    addUser(email: String!, firstName: String!, lastName: String!, middleName: String, sex: String): User

    addDog(
      owner: ID
      name: String!
      dogPhoto: String
      sex: String!
      age: Int!
      dateAdded: String
      breed: String!
      description: String!
    ): Dog

    addJob(
      user: ID!
      dog: ID!
      title: String!
      details: String!
      latitude: Float!
      longitude: Float!
      duration: Int!
      hourlyPay: Int!
      startTime: String!
      status: String!
    ): Job

    deleteJob(userId: ID!, jobId: ID!): ID

    applyForJob(applicantId: ID!, jobId: ID!): Job

    acceptApplication(applicantId: ID!, jobId: ID!): Job

    markJobAsFinished(jobId: ID!): Job

    confirmJob(jobId: ID!): Job
  }

  type User {
    id: ID!
    email: String!
    profilePhoto: String
    accountCreated: String
    firstName: String!
    middleName: String
    lastName: String!
    sex: String
    dogs: [Dog]
    jobs: [Job]
    appliedTo: [Job]
    rating: Float!
  }

  type Dog {
    id: ID!
    name: String!
    breed: String!
    dateAdded: String!
    dogPhoto: String
    sex: String!
    age: Int!
    description: String!
    owner: User
  }

  type Job {
    id: ID!
    user: User!
    dog: Dog!
    title: String!
    details: String
    jobLocation: JobLocation!
    duration: Int!
    hourlyPay: Int!
    timePosted: String!
    startTime: String!
    status: String!
    candidates: [User]
    acceptedUser: User
    city: String
    locality: String
  }

  type JobLocation {
    type: String
    coordinates: [Float]
  }
`;

export = typedefinitions;
