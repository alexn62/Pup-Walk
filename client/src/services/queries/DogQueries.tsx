import { gql } from '@apollo/client';

export const addDog = gql`
  mutation addDog($name: String!, $sex: String!, $age: Int!, $breed: String!, $description: String!, $owner: ID) {
    addDog(name: $name, sex: $sex, age: $age, breed: $breed, description: $description, owner: $owner) {
      id
      name
      age
      sex
      breed
      description
    }
  }
`;
