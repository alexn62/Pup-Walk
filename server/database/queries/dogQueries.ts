import { Dog } from '../schemas/dogSchema';
import { addDogToUser } from './userQueries';
import { Types, HydratedDocument } from 'mongoose';
import { IDog } from '../../interfaces/dog-interface';

const addDog = async (
  owner: Types.ObjectId,
  name: string,
  age: number,
  sex: string,
  breed: string,
  description: string,
  dateAdded?: Date
): Promise<HydratedDocument<IDog> | null> => {
  try {
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
    await addDogToUser(owner, response._id);
    return response;
  } catch (e) {
    return null;
  }
};

const getDog = async (id: Types.ObjectId): Promise<HydratedDocument<IDog> | null> => {
  const response = await Dog.findOne({ _id: id }).exec();
  return response;
};

export { addDog, getDog };
