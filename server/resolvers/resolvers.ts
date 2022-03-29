import { addUser, getAllUsers } from '../database/queries';

const res = {
  Query: {
    getAllUsers: async (_: any, {}: {}, context: any, info: any) => {
      const users = await getAllUsers();
      return users;
    },
  },
  Mutation: {
    addUser: async (
      _: any,
      {
        email,
        firstName,
        lastName,
        middleName,
      }: { email: String; firstName: String; lastName: String; middleName: String },
      context: any,
      info: any
    ) => {
      console.log(email);
      const response = await addUser(email, firstName, lastName, middleName);
      return response;
    },
  },
};

export = res;
