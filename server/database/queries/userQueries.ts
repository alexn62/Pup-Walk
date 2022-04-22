import { User } from '../schemas/userSchema';
import { Types, HydratedDocument } from 'mongoose';
import { IUser } from '../../interfaces/user-interface';
const addUser = async (email: string, firstName: string, lastName: string, middleName?: string, sex?: string) => {
  const user = new User({ email: email, firstName: firstName, lastName: lastName, middleName: middleName, sex: sex });
  const response = await user.save();
  return response;
};

// const getAllUsers = async () => {
//   const response = await User.find();
//   return response;
// };

const getUser = async (id: Types.ObjectId): Promise<HydratedDocument<IUser> | null> => {
  const response = await User.findOne({ _id: id }).exec();
  return response;
};

const addDogToUser = async (userId: Types.ObjectId, dogId: Types.ObjectId): Promise<HydratedDocument<IUser> | null> => {
  const user = await getUser(userId);
  if (user) {
    user.dogs?.push(dogId);
    return await user.save();
  }
  return null;
};

const deleteJob = async (userId: Types.ObjectId, jobId: Types.ObjectId): Promise<Types.ObjectId | null> => {
  const user = await getUser(userId);
  if (user) {
    user.jobs = user.jobs?.filter((job: Types.ObjectId) => job.toString() !== jobId.toString());
    await user.save();
    return jobId;
  }
  return null;
};

const applyForJob = async (
  applicantId: Types.ObjectId,
  jobId: Types.ObjectId
): Promise<HydratedDocument<IUser> | null> => {
  const user = await getUser(applicantId);
  if (user) {
    if (!user.appliedTo?.includes(jobId)) {
      user.appliedTo?.push(jobId);
      return await user.save();
    }
  }
  return null;
};

const getUserByEmail = async (email: string): Promise<HydratedDocument<IUser> | null> => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (_) {
    return null;
  }
};

export { addUser, getUser, addDogToUser, deleteJob, applyForJob, getUserByEmail };
