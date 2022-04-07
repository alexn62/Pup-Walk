import { IDog } from '../../interfaces/dog-interface';
import { Types } from 'mongoose';

const mockDog: IDog = {
  id: new Types.ObjectId(),
  name: 'Frankie',
  breed: 'Coonhound',
  age: 2,
  owner: new Types.ObjectId(),
  sex: 'Female',
  description: 'Extremely good dog',
};

const mockDog2: IDog = {
  id: new Types.ObjectId(),
  name: 'Stoney',
  breed: 'Corgie',
  age: 2,
  owner: new Types.ObjectId(),
  sex: 'Male',
  description: 'Very good dog',
};

export { mockDog, mockDog2 };
