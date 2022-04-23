import { gql } from '@apollo/client';

export const addUser = gql`
  mutation addUser($email: String!, $firstName: String!, $lastName: String!, $sex: String, $middleName: String) {
    addUser(email: $email, firstName: $firstName, lastName: $lastName, sex: $sex, middleName: $middleName) {
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
