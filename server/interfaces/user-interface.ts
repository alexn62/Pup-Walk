import { Types } from 'mongoose';
export interface IUser {
  id: Types.ObjectId;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  sex?: string;
  profilePhoto?: string;
  accountCreated?: Date;
  dogs?: Types.ObjectId[];
  jobs?: Types.ObjectId[];
  appliedTo?: Types.ObjectId[];
  ratings?: number[];
}
