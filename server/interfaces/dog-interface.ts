import { Types } from 'mongoose';

export interface IDog {
  id: Types.ObjectId;
  name: string;
  breed: string;
  sex: string;
  age: number;
  dogPhoto?: string;
  owner: Types.ObjectId;
  description: string;
}
