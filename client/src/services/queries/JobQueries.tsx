import { gql } from '@apollo/client';

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
        id
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
      candidates {
        id
      }
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

export const applyForJob = gql`
  mutation applyForJob($applicantId: ID!, $jobId: ID!) {
    applyForJob(applicantId: $applicantId, jobId: $jobId) {
      candidates {
        id
      }
    }
  }
`;
