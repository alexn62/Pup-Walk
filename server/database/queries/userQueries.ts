import { User } from '../schemas/userSchema';

const addUser = async (email: string, firstName: string, lastName: string, middleName?: string, sex?: string) => {
  const user = new User({ email: email, firstName: firstName, lastName: lastName, middleName: middleName, sex: sex });
  const response = await user.save();
  return response;
};

// const getAllUsers = async () => {
//   const response = await User.find();
//   return response;
// };

const getUser = async (id: string) => {
  const response = await User.findOne({ _id: id }).exec();
  return response;
};

const addDogToUser = async (userId: string, dogId: string) => {
  const user = await getUser(userId);
  user.dogs.push(dogId);
  await user.save();
};

const deleteJob = async (userId: string, jobId: string) => {
  const user = await getUser(userId);
  user.jobs = user.jobs.filter((job: any) => job !== jobId);
  await user.save();
};

const applyForJob = async (applicantId: string, jobId: string) => {
  const user = await getUser(applicantId);
  if (!user.appliedTo.includes(jobId)) {
    user.appliedTo.push(jobId);
    await user.save();
  }
};

export { addUser, getUser, addDogToUser, deleteJob, applyForJob };
