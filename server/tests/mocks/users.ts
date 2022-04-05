import { User } from '../../interfaces/user-interface';

const mockUser: User = {
  id: '',
  email: 'test@gmail.com',
  firstName: 'John',
  middleName: 'Jeff',
  lastName: 'Doe',
  sex: 'Male',
  jobs: [],
};

const mockUser2: User = {
  id: '',
  email: 'secondTest@gmail.com',
  firstName: 'Alisha',
  middleName: 'Maria',
  lastName: 'Doa',
  sex: 'Female',
  jobs: [],
};

export { mockUser, mockUser2 };
