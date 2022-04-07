import { IUser } from '../../interfaces/user-interface';
import { Types } from 'mongoose';
const mockUser: IUser = {
  id: new Types.ObjectId(),
  email: 'test@gmail.com',
  firstName: 'John',
  middleName: 'Jeff',
  lastName: 'Doe',
  sex: 'Male',
  jobs: [],
};

const mockUser2: IUser = {
  id: new Types.ObjectId(),
  email: 'secondTest@gmail.com',
  firstName: 'Alisha',
  middleName: 'Maria',
  lastName: 'Doa',
  sex: 'Female',
  jobs: [],
};

export { mockUser, mockUser2 };
