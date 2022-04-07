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
      jobs {
        id
      }
      appliedTo {
        id
      }
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
const getUserWithJobs = gql`
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      firstName
      middleName
      lastName
      email
      sex
      jobs {
        id
        title
      }
      appliedTo {
        id
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
      details
      title
      jobLocation {
        coordinates
      }
      hourlyPay
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

const getJob = gql`
  query GetJob($getJobId: String!) {
    getJob(id: $getJobId) {
      id
      candidates {
        id
      }
      jobLocation {
        coordinates
      }
    }
  }
`;

const getJobsCloseBy = gql`
  query getJobsCloseBy($maxDistance: Float!, $startingPoint: [Float!]) {
    getJobsCloseBy(maxDistance: $maxDistance, startingPoint: $startingPoint) {
      title
      jobLocation {
        coordinates
      }
    }
  }
`;

const deleteJob = gql`
  mutation deleteJob($userId: ID!, $jobId: ID!) {
    deleteJob(userId: $userId, jobId: $jobId)
  }
`;
const applyForJob = gql`
  mutation ApplyForJob($applicantId: ID!, $jobId: ID!) {
    applyForJob(applicantId: $applicantId, jobId: $jobId) {
      candidates {
        id
      }
    }
  }
`;
module.exports = {
  addUser,
  getUser,
  addDog,
  getDog,
  getUserWithDogs,
  getDogWithOwner,
  addJob,
  getUserWithJobs,
  deleteJob,
  getJob,
  getJobsCloseBy,
  applyForJob,
};
