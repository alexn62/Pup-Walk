import { Dog } from '../schemas/dogSchema';
import { addDogToUser } from './userQueries';

const addDog = async (
  owner: string,
  name: string,
  age: number,
  sex: string,
  breed: string,
  description: string,
  dateAdded?: Date
) => {
  const dog = new Dog({
    owner: owner,
    name: name,
    age: age,
    sex: sex,
    dateAdded: dateAdded,
    breed: breed,
    description: description,
  });
  const response = await dog.save();
  await addDogToUser(owner, response._id.toString());
  return response;
};

const getAllDogs = async () => {
  const response = await Dog.find();
  return response;
};
const getDog = async (id: String) => {
  const response = await Dog.findOne({ _id: id }).exec();
  return response;
};

export { addDog, getAllDogs, getDog };
