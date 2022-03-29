import { User } from './schemas/userSchema';

const addUser = async (email: String, firstName: String, lastName: String, middleName?: String) => {
  const user = new User({ email: email, firstName: firstName, lastName: lastName, middleName: middleName });
  const response = await user.save();
  return response;
};

const getAllUsers = async () => {
  const response = await User.find();
  return response;
};

export { addUser, getAllUsers };
